# Salud Vida y Bienestar

Plataforma digital para una marca de belleza, bienestar y formación: tienda, línea VEGAN, servicios (belleza, barbería, micropigmentación), academia, pedidos por WhatsApp, cotizador comercial y una base preparada para base de datos, administración y pagos.

> **Estado:** la capa visual (Next.js) está desarrollada y es funcional. La base de datos (PostgreSQL + Prisma), el cotizador comercial y la configuración de negocio están implementados. La autenticación, el panel administrativo, la creación de pedidos en base de datos y la integración de Mercado Pago están **preparadas pero pendientes** (ver *Funciones pendientes*). No se simula ningún pago real.

## Stack

- Next.js 16.4.6 (App Router, Cache Components, Partial Prefetching)
- React 19.3 y TypeScript 5
- Tailwind CSS 4.3
- Framer Motion 14 · Three.js + React Three Fiber + Drei (hero 3D)
- PostgreSQL + Prisma ORM 7 (driver adapter `@prisma/adapter-pg`)
- Zod para validación
- Vitest para pruebas unitarias
- Lucide React para iconografía

## Requisitos

- Node.js 22 o superior
- npm 10 o superior
- PostgreSQL 15 o superior (local o en la nube)

## Inicio rápido (sin base de datos)

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. La app funciona sin `DATABASE_URL`: la capa visual y el cotizador no dependen de la base de datos.

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores. Nunca subas `.env` al repositorio.

```bash
copy .env.example .env   # Windows
# cp .env.example .env    # macOS/Linux
```

| Variable | Uso | Obligatoria |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio público para SEO | No |
| `DATABASE_URL` | Conexión PostgreSQL | Para BD |
| `AUTH_SECRET` | Secreto de sesión (≥ 32 bytes) | Para auth |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Primer administrador (solo seed) | Para admin |
| `MERCADOPAGO_ACCESS_TOKEN` | Mercado Pago (servidor) | Para pagos |
| `MERCADOPAGO_WEBHOOK_SECRET` | Verificación de webhook | Para pagos |
| `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY` | Llave pública de Mercado Pago | Para pagos |
| `CLOUDINARY_*` | Imágenes (opcional) | No |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp | Recomendada |

## Base de datos (PostgreSQL + Prisma)

1. Define `DATABASE_URL` en `.env`.
2. Aplica el esquema y genera el cliente:

```bash
npm run db:generate     # prisma generate
npm run db:migrate      # prisma migrate dev --name init (crea la migración)
npm run db:seed         # prisma db seed (datos de demostración)
```

Para entornos gestionados o CI:

```bash
npm run db:deploy       # prisma migrate deploy
```

Otros comandos: `npm run db:push`, `npm run db:reset`, `npm run db:studio`.

### Modelos

`User`, `Role`, `UserRole`, `CustomerAddress`, `ProductCategory`, `Product`, `ProductImage`, `ProductVariant`, `InventoryMovement`, `Cart`, `CartItem`, `Order`, `OrderItem`, `Payment`, `Service`, `AppointmentRequest`, `Course`, `Enrollment`, `Testimonial`, `SiteSettings`, `AuditLog`.

Convenciones:
- Los importes se guardan en **centavos enteros** (`Int`) con su moneda. Nunca se usan flotantes para dinero.
- Todas las entidades tienen timestamps e índices en los campos de consulta.
- Integridad referencial con `onDelete` explícito.

### Primer administrador (procedimiento seguro)

No hay credenciales por defecto. El seed crea el administrador **solo** si defines `ADMIN_EMAIL` y `ADMIN_PASSWORD` (mínimo 12 caracteres). El hash se genera con `bcryptjs` (12 rondas); la contraseña nunca se guarda en texto plano.

```bash
ADMIN_EMAIL=tu-correo@dominio.com ADMIN_PASSWORD="una-contraseña-larga-y-única" npm run db:seed
```

## Scripts

```bash
npm run dev         # Servidor de desarrollo
npm run build       # Compilación de producción
npm run start       # Servidor de producción
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run test        # Vitest (unitarias)
npm run db:*        # Prisma (generate, migrate, seed, deploy, studio…)
```

## Rutas

Públicas: `/`, `/tienda`, `/tienda/[slug]`, `/vegan`, `/servicios`, `/academia`, `/contacto`, `/carrito`, `/checkout`, `/legal`.

Comercial (privada, fuera del menú y de los buscadores): `/presentacion`.

Pendientes (fases posteriores): `/mi-cuenta`, `/mi-cuenta/pedidos`, `/admin/*`.

## Cotizador comercial y módulo de precios

- **Fuente única de precios:** `src/data/pricing.ts` (paquetes, mantenimiento y plan de pagos). Los componentes no duplican importes.
- **Lógica de cálculo:** `src/lib/pricing.ts` (en centavos enteros, con ajuste de redondeo en la última etapa del plan de pagos).
- **Aritmética monetaria:** `src/lib/money.ts`.
- **UI:** `src/components/pricing/PricingCards.tsx` y `src/components/pricing/QuoteCalculator.tsx`.
- **Modales:** `src/components/modals/ProfessionalUnlockModal.tsx` (invitación con temporizador, control de frecuencia por `sessionStorage` y cierre accesible) y `src/components/modals/DevelopmentQuoteModal.tsx`.

Paquetes de desarrollo iniciales: Esencial $11,000 · Profesional $29,500 · Avanzado desde $39,500. Mantenimiento: Básico $799 · Profesional $1,499 · Crecimiento $2,499 (MXN/mes). Plan de pagos de la Plataforma Profesional: 50 % / 30 % / 20 %.

> Estos valores son parámetros comerciales de referencia para cotizar el desarrollo; **no** son precios del catálogo de productos del negocio.

## Validación y seguridad

- Esquemas Zod compartidos en `src/lib/validation.ts` (checkout, citas, inscripciones, cotización).
- El servidor **debe** volver a validar y recalcular importes; nunca confiar en precio, cantidad, rol o estado de pago del cliente (regla aplicada en las fases de pedidos/pagos).
- Contraseñas con `bcryptjs`. Secretos solo en variables de entorno del servidor.

## Estructura

```text
prisma/                Esquema, migraciones y seed
src/
  app/                 Rutas, layout, SEO y páginas
  components/
    cart/              Contexto, drawer, cantidades
    modals/            Modales comerciales (unlock, cotización)
    pricing/           Tarjetas, cotizador y experiencia de presentación
    pro/               Invitación profesional existente
    home/ layout/ navigation/ products/ providers/ ui/ animations/ brand/
  data/                Contenido y tipos (incluye pricing.ts)
  lib/                 Config, money, pricing, prisma, validation, SEO, WhatsApp
  generated/prisma/    Cliente Prisma generado (no se edita a mano)
```

## Pruebas

```bash
npm run test
```

Cubren aritmética monetaria (`money.test.ts`) y lógica de cotización (`pricing.test.ts`).

## Despliegue en Vercel

1. Importa el repositorio en Vercel.
2. Define las variables de entorno (`.env.example` como guía).
3. El `postinstall` ejecuta `prisma generate`. Ejecuta `npm run db:deploy` en el pipeline de migraciones.
4. Define el dominio y actualiza `NEXT_PUBLIC_SITE_URL`.

## Funciones pendientes

- **Autenticación y roles** (sesión, hashing, protección de rutas).
- **Panel administrativo** `/admin/*` (dashboard, productos, pedidos, clientes, servicios, citas, cursos, inscripciones, configuración, reportes).
- **Pedidos persistidos en base de datos** y recálculo de importes en servidor.
- **Inventario** con movimientos y transacciones concurrentes.
- **Mercado Pago Checkout Pro** (preferencias, webhook verificado, idempotencia) — requiere credenciales.
- **Citas e inscripciones** persistidas.
- **Mi cuenta** (`/mi-cuenta`, `/mi-cuenta/pedidos`).

## Antes de publicar

1. Sustituir todos los marcadores de posición (`isPlaceholder`) por datos reales.
2. Configurar WhatsApp, correo, dirección, horarios y redes.
3. Licenciar o reemplazar las imágenes editoriales.
4. Reemplazar productos, precios, servicios, programas y testimonios.
5. Validar cualquier afirmación cosmética, técnica o académica.
6. Revisar legalmente términos, privacidad y protección de datos.
7. Completar autenticación, pagos e inventario reales.
