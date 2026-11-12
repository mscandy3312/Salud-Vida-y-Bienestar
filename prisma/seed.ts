import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../src/generated/prisma/client";
import { RoleName } from "../src/generated/prisma/enums";
import { products } from "../src/data/products";
import { productCategories } from "../src/data/types";

/**
 * Seed de demostración.
 *
 * Idempotente: puede ejecutarse varias veces sin duplicar datos.
 * El usuario administrador SOLO se crea si se proporcionan ADMIN_EMAIL y
 * ADMIN_PASSWORD en el entorno. Nunca se publican credenciales por defecto.
 */

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error(
    "DATABASE_URL no está configurada. Define la cadena de conexión de PostgreSQL antes de ejecutar el seed.",
  );
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seedRoles() {
  const roles: Array<{ name: RoleName; description: string }> = [
    { name: RoleName.ADMIN, description: "Acceso total a la administración." },
    { name: RoleName.STAFF, description: "Operación de pedidos, citas e inscripciones." },
    { name: RoleName.CUSTOMER, description: "Cliente de la tienda." },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
  }
}

async function seedCatalog() {
  for (const [index, name] of productCategories.entries()) {
    await prisma.productCategory.upsert({
      where: { slug: slugify(name) },
      update: { name, sortOrder: index },
      create: { slug: slugify(name), name, sortOrder: index },
    });
  }

  for (const [index, product] of products.entries()) {
    const category = await prisma.productCategory.findUnique({
      where: { slug: slugify(product.category) },
    });

    const record = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        characteristics: product.characteristics ?? null,
        features: product.features as unknown as Prisma.InputJsonValue,
        priceCents: Math.round(product.price * 100),
        categoryId: category?.id ?? null,
        isVegan: Boolean(product.isVegan),
        isFeatured: Boolean(product.isFeatured),
        sortOrder: index,
      },
      create: {
        slug: product.slug,
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        characteristics: product.characteristics ?? null,
        features: product.features as unknown as Prisma.InputJsonValue,
        priceCents: Math.round(product.price * 100),
        categoryId: category?.id ?? null,
        isVegan: Boolean(product.isVegan),
        isFeatured: Boolean(product.isFeatured),
        sortOrder: index,
      },
    });

    await prisma.productImage.deleteMany({ where: { productId: record.id } });
    if (product.image) {
      await prisma.productImage.create({
        data: {
          productId: record.id,
          url: product.image,
          alt: product.imageAlt ?? product.name,
          sortOrder: 0,
        },
      });
    }
  }
}

async function seedSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "Salud Vida y Bienestar",
      currency: "MXN",
      whatsappCheckoutEnabled: true,
      mercadoPagoEnabled: false,
    },
  });
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log(
      "· Sin ADMIN_EMAIL/ADMIN_PASSWORD: no se creó administrador. Consulta el README para el procedimiento seguro.",
    );
    return;
  }

  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD debe tener al menos 12 caracteres.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { isActive: true },
    create: { email, name: "Administrador", passwordHash, isActive: true },
  });

  const adminRole = await prisma.role.findUnique({
    where: { name: RoleName.ADMIN },
  });

  if (adminRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: admin.id, roleId: adminRole.id } },
      update: {},
      create: { userId: admin.id, roleId: adminRole.id },
    });
  }

  console.log(`· Administrador asegurado: ${email}`);
}

async function main() {
  await seedRoles();
  await seedCatalog();
  await seedSettings();
  await seedAdmin();
  console.log("Seed completado.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
