# Gestión de Casos - Frontend (Next.js)

Frontend de la prueba técnica NXT: aplicación de gestión de expedientes legales con autenticación JWT mediante httpOnly cookies.

## 🚀 Tecnologías

- **Next.js 16** (App Router + React 19)
- **TypeScript** (type-safe)
- **TailwindCSS 4** (estilos)
- **Axios** (cliente HTTP con interceptors)
- **React Hook Form + Zod** (validación de formularios)
- **TanStack Table** (tablas avanzadas)
- **Sonner** (notificaciones toast)
- **Lucide React** (iconos)

## 📋 Requisitos Previos

- Node.js 20+
- npm 10+
- Backend corriendo en `http://localhost:4000`

## 🔧 Instalación

```bash
npm install
```

## ⚙️ Variables de Entorno

El archivo `.env.local` ya está configurado con:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 🏃 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Modo Producción

```bash
npm run build
npm run start
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Página de login
│   │   └── register/page.tsx       # Página de registro
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Layout con Header
│   │   └── casos/page.tsx          # Página principal de casos
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Estilos globales + variables NXT
│   └── page.tsx                    # Redirect automático
├── components/
│   ├── ui/                         # Componentes base reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Label.tsx
│   │   ├── Dialog.tsx
│   │   └── Loader.tsx              # Loader legal-tech premium
│   ├── auth/
│   │   ├── LoginForm.tsx           # Formulario de login
│   │   └── RegisterForm.tsx        # Formulario de registro
│   ├── casos/
│   │   ├── CasosPageClient.tsx     # Lógica principal de casos
│   │   ├── CasosTable.tsx          # Tabla con TanStack Table
│   │   ├── CasosFilters.tsx        # Filtros de búsqueda
│   │   ├── CasoModal.tsx           # Modal crear/editar
│   │   ├── DeleteCasoDialog.tsx    # Confirmación de eliminación
│   │   └── Pagination.tsx          # Paginación
│   └── layout/
│       └── Header.tsx              # Header con logo y logout
├── lib/
│   ├── api/
│   │   ├── client.ts               # Axios instance
│   │   └── repositories/
│   │       ├── auth.repository.ts  # API de autenticación
│   │       └── casos.repository.ts # API de casos
│   ├── hooks/                      # Custom hooks (futuro)
│   ├── types/
│   │   ├── user.ts                 # Tipos de usuario
│   │   ├── caso.ts                 # Tipos de casos
│   │   └── api.ts                  # Tipos de respuestas API
│   ├── validations/
│   │   ├── auth.schema.ts          # Schemas Zod de auth
│   │   └── caso.schema.ts          # Schemas Zod de casos
│   └── utils/
│       ├── cn.ts                   # Utilidad para clases CSS
│       └── debounce.ts             # Debounce para búsquedas
├── middleware.ts                   # Protección de rutas
└── public/
    └── nxt-logo.svg                # Logo NXT

```

## 🎨 Diseño y UX

### Paleta de Colores NXT

```css
--color-nxt-cyan: #00C2FF
--color-nxt-blue: #4B4DFF
--color-nxt-purple: #9D4DFF
--color-nxt-magenta: #D400FF
--color-nxt-dark-bg: #1A0B2E
--color-nxt-card-bg: #2A1B3D
```

### Características de UI

- ✅ **Loader Legal-Tech Premium**: Gradiente NXT pulsante con ícono de maletín
- ✅ **Diseño Dark Mode**: Fondo oscuro profesional
- ✅ **Gradientes**: Cyan → Purple → Magenta en títulos y botones
- ✅ **Animaciones suaves**: Transiciones en hover y focus
- ✅ **Responsive**: Mobile-first design
- ✅ **Accesibilidad**: ARIA labels, roles y navegación por teclado

## 🔐 Autenticación

### Flujo de Autenticación

1. Usuario accede a `/casos` sin autenticación
2. Middleware detecta ausencia de cookie `access_token`
3. Redirige a `/login`
4. Usuario ingresa credenciales
5. Backend setea httpOnly cookie
6. Redirige a `/casos`

### Seguridad

- **httpOnly cookies**: El JWT nunca está expuesto a JavaScript
- **SameSite: lax**: Protección contra CSRF
- **Secure en producción**: Cookie solo en HTTPS
- **Interceptor 401**: Logout automático si el token expira

## 📊 Gestión de Casos (CRUD)

### Funcionalidades

- ✅ **Crear caso**: Modal con formulario validado
- ✅ **Editar caso**: Modal pre-llenado con datos existentes
- ✅ **Eliminar caso**: Confirmación con dialog de alerta
- ✅ **Ver detalles**: Modal en modo lectura
- ✅ **Búsqueda**: Debounce de 300ms en nombre/descripción
- ✅ **Filtro por estado**: Abierto, En Proceso, Cerrado, Archivado
- ✅ **Paginación**: 10 casos por página
- ✅ **Ordenamiento**: Por fecha de creación (desc)

### Estados de Caso

| Estado | Color | Descripción |
|--------|-------|-------------|
| **ABIERTO** | Verde | Caso recién creado |
| **EN_PROCESO** | Amarillo | Caso en investigación |
| **CERRADO** | Rojo | Caso resuelto |
| **ARCHIVADO** | Gris | Caso archivado |

## 🏗️ Arquitectura y Patrones

### Patrones de Diseño Aplicados

1. **Repository Pattern**: Abstracción de llamadas API en `repositories/`
2. **Factory Pattern**: Creación de instancia Axios en `client.ts`
3. **Strategy Pattern**: Validaciones con Zod schemas
4. **Singleton Pattern**: Instancia única de Axios
1. **Repository Pattern**: Abstracción de llamadas API en `repositories/`
2. **Factory Pattern**: Creación de instancia Axios en `client.ts`
3. **Strategy Pattern**: Validaciones con Zod schemas
4. **Singleton Pattern**: Instancia única de Axios

### Principios SOLID

- **S** (Single Responsibility): Cada componente tiene una única responsabilidad
- **O** (Open/Closed): Componentes extensibles vía props
- **L** (Liskov Substitution): Interfaces consistentes
- **I** (Interface Segregation): Props específicos por componente
- **D** (Dependency Inversion): Inyección de dependencias vía props

### Optimizaciones

- ✅ **Server Components**: Pages son Server Components por defecto
- ✅ **Client Components**: Solo donde hay interactividad
- ✅ **Debounce**: Búsqueda optimizada (300ms)
- ✅ **Lazy Loading**: Modales se cargan solo cuando se abren
- ✅ **Memoización**: `useMemo` y `useCallback` en componentes pesados

## 🚀 Despliegue en AWS Amplify

### Preparación

1. Subir código a GitHub/GitLab
2. Conectar repositorio a Amplify Console
3. Configurar variables de entorno:
   - `NEXT_PUBLIC_API_URL`: URL del backend en producción

### Build Settings

Amplify detectará automáticamente Next.js. Si necesitas personalizar:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Consideraciones

- El backend debe estar desplegado primero (Railway, Render, AWS, etc.)
- Configurar CORS en el backend para el dominio de Amplify
- Habilitar HTTPS (Amplify lo hace automáticamente)
- Configurar `secure: true` en las cookies del backend

## 📝 Decisiones Técnicas

### ¿Por qué httpOnly cookies?

- **Seguridad**: Protege contra ataques XSS
- **Automático**: El navegador envía la cookie en cada request
- **Estándar**: Práctica recomendada para autenticación

### ¿Por qué TanStack Table?

- **Flexibilidad**: Headless UI, control total del diseño
- **Performance**: Virtualización para grandes datasets
- **TypeScript**: Type-safe por defecto

### ¿Por qué Zod?

- **Type Inference**: Genera tipos TypeScript automáticamente
- **Validación Runtime**: Valida datos en tiempo de ejecución
- **Mensajes personalizados**: Errores claros para el usuario

### ¿Por qué Sonner?

- **Ligero**: Solo 3KB
- **Accesible**: ARIA compliant
- **Hermoso**: Diseño moderno out-of-the-box

## 🐛 Troubleshooting

### Error: "Cannot connect to backend"

- Verifica que el backend esté corriendo en `http://localhost:4000`
- Revisa que CORS esté habilitado en el backend

### Error: "Unauthorized" en todas las requests

- Limpia las cookies del navegador
- Verifica que el JWT_SECRET sea el mismo en backend

### Estilos no se aplican

- Ejecuta `npm run dev` de nuevo
- Verifica que `globals.css` esté importado en `layout.tsx`

## 📚 Scripts Útiles

```bash
npm run dev       # Desarrollo con hot reload
npm run build     # Build de producción
npm run start     # Servidor de producción
npm run lint      # Linter ESLint
```
