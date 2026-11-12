import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Cliente Prisma reutilizable.
 *
 * Prisma 7 requiere un *driver adapter*. Se crea una sola instancia por
 * proceso para no agotar el pool de conexiones, y la inicialización es
 * perezosa: importar este módulo no abre conexiones ni exige `DATABASE_URL`
 * (así el build no depende de una base de datos).
 */
const globalForPrisma = globalThis as unknown as {
  __svbPrisma?: PrismaClient;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL no está configurada. Copia .env.example a .env y define la cadena de conexión de PostgreSQL antes de usar la base de datos.",
    );
  }

  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.__svbPrisma) {
    globalForPrisma.__svbPrisma = createPrismaClient();
  }
  return globalForPrisma.__svbPrisma;
}

export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);
