# Salud Vida y Bienestar

Experiencia digital demostrativa para una marca de belleza, bienestar y formación. Incluye tienda con carrito local, línea VEGAN, servicios, academia, contacto asistido por WhatsApp, hero 3D y un aviso comercial de “Versión Profesional”.

> **Estado:** demo comercial. No procesa pagos, no crea pedidos reales, no agenda citas, no envía correos ni guarda datos en un servidor. Los productos, precios, servicios, programas, testimonios, imágenes y datos de contacto son ilustrativos o marcadores de posición.

## Stack

- Next.js 16.4.6 con App Router, Cache Components y Partial Prefetching
- React 19.3
- TypeScript 5
- Tailwind CSS 4.3
- Framer Motion 14
- Three.js + React Three Fiber + Drei para el hero 3D
- Lucide React para iconografía

## Requisitos

- Node.js 22 o superior
- npm 10 o superior

## Inicio rápido

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

Para probar la compilación de producción:

```bash
npm run build
npm run start
```

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilación de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
npx tsc --noEmit # Verificación de TypeScript
```

## Rutas

- `/` — Home editorial con hero 3D, colección, manifiesto, categorías, VEGAN, servicios, academia, versión profesional, testimonios y CTA final.
- `/tienda` — Catálogo con búsqueda, filtros por categoría, filtro vegan y orden.
- `/tienda/[slug]` — Ficha de producto con galería de vistas generadas, compra demo, WhatsApp y productos relacionados.
- `/vegan` — Línea VEGAN demostrativa.
- `/servicios` — Belleza, barbería y micropigmentación.
- `/academia` — Programas de formación y perfil de instructor pendiente.
- `/contacto` — Canales, formulario que abre WhatsApp y preguntas frecuentes.
- `/legal` — Términos, privacidad, datos ilustrativos y propiedad intelectual.
- `robots.txt`, `sitemap.xml` y `opengraph-image` generados por convención de Next.js.

## Configuración principal

La mayor parte del contenido configurable vive en `src/lib/config.ts` y `src/data/`.

### Marca y contacto

Edita `siteConfig` en `src/lib/config.ts`:

- `name`, `tagline`, `description`, `url`
- `contact.whatsapp.number`, `display`, `isPlaceholder`
- `contact.email.value`
- `contact.address.value`
- `contact.hours.value`
- `social[]`
- `professional`
- `copyrightYear`

El número de WhatsApp actual (`5210000000000`) es un marcador de posición. Cámbialo por un número real antes de cualquier uso comercial. El formulario de contacto abre WhatsApp con un mensaje preparado; no envía datos a un backend.

Para cambiar el dominio de SEO:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

También puedes crear un archivo `.env.local` a partir de `.env.example`.

### Catálogo y contenido

- `src/data/products.ts` — 28 productos demo y helpers.
- `src/data/categories.ts` — categorías editoriales del home.
- `src/data/services.ts` — categorías y 18 servicios demo.
- `src/data/courses.ts` — 6 programas demo.
- `src/data/testimonials.ts` — testimonios explícitamente marcados como demo.
- `src/data/benefits.ts` — principios de la experiencia.
- `src/data/professional.ts` — copy y funciones de la versión Profesional.
- `src/data/navigation.ts` — navegación principal y footer.

Los precios se muestran en MXN y son ilustrativos. No representan una oferta final.

### Imágenes

Las fotografías editoriales están en `public/images/editorial/` y provienen de bancos de imágenes. Son referencias temporales: deben licenciarse o sustituirse antes de publicar. Las composiciones de producto y servicio se generan localmente como SVG/CSS y no representan envases o resultados reales.

### Carrito

El carrito usa `localStorage` con la clave configurada en `siteConfig.conversion.cartStorageKey`. No hay checkout real. El botón “Finalizar compra” cierra el carrito y abre el aviso de Versión Profesional.

### Aviso de Versión Profesional

- Se puede abrir manualmente desde navbar, footer, home, academia, contacto y checkout demo.
- Se abre automáticamente una vez tras `autoInviteDelayMs` (42 s), con control de sesión y cooldown de 7 días.
- No se envía información ni se inicia una contratación.
- Para desactivar la invitación automática, cambia `autoInviteEnabled` a `false` en `siteConfig.conversion`.

### Hero 3D

- `HeroCanvas` carga `HeroScene` solo en cliente.
- Respeta `prefers-reduced-motion` y muestra una composición CSS cuando la animación está reducida.
- Usa una calidad de render moderada para equilibrar estética y rendimiento.
- Si WebGL no está disponible, se mantiene el fallback visual.

## Estructura

```text
src/
  app/                 Rutas, layout, SEO y páginas
  components/
    animations/        Reveal y transición entre páginas
    brand/             Marca gráfica
    cart/              Contexto, drawer, toast, cantidades
    contact/           Formulario de contacto
    home/              Secciones del home y hero 3D
    layout/            Footer, PageHero, SiteNotice, WhatsApp
    navigation/        Navbar responsive
    pro/               Contexto, modal e invitación profesional
    products/          Catálogo, tarjetas, galería y compra
    providers/         Providers globales
    ui/                Botones, iconos, modal, visuales
  data/                Contenido y tipos
  lib/                 Configuración, SEO, WhatsApp y utilidades
public/images/editorial/ Fotografías editoriales temporales
```

## Antes de publicar

1. Sustituir todos los `isPlaceholder` por información verificada.
2. Configurar WhatsApp, correo, dirección, horarios y redes reales.
3. Licenciar o reemplazar las imágenes editoriales.
4. Reemplazar productos, precios, servicios, programas y testimonios.
5. Validar cualquier afirmación cosmética, técnica o académica.
6. Revisar legalmente términos, privacidad y protección de datos.
7. Implementar backend, pagos, inventario, pedidos, cuentas y agenda si se activa la Versión Profesional.
8. Definir analítica, cookies, consentimiento y políticas de retención.
9. Revisar accesibilidad con pruebas manuales y lectores de pantalla.
10. Añadir pruebas end-to-end y de integración para los flujos reales.

## Verificación

```bash
npx tsc --noEmit
npm run lint
npm run build
```

La compilación actual genera correctamente las rutas estáticas y las fichas de producto con `generateStaticParams`.

## Alcance de la demo

Esta experiencia no incluye:

- Pasarela de pagos ni checkout real
- Base de datos, autenticación o panel administrativo
- Inventario, envíos o seguimiento de pedidos
- Reservas o agenda de citas
- Certificaciones académicas
- Reseñas verificadas
- Analítica o cookies de marketing

La “Versión Profesional” es una presentación conceptual de lo que podría construirse, no una funcionalidad activa.
