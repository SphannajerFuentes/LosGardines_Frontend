# Estructura del Frontend (React + Vite + TypeScript + React Compiler)

```text
logistica-frontend/
└── src/
    ├── config/
    │   └── api.ts                 # Instancia de Axios configurada con el interceptor JWT
    ├── context/
    │   └── AuthContext.tsx        # Estado global de sesión y rol del usuario (REQ-015)
    ├── components/                # UI Transversal e Inmutable (Liskov Substitution - L)
    │   ├── Layout.tsx             # Esqueleto principal de la app (REQ-015)
    │   ├── Navbar.tsx             # Barra superior con datos de usuario y rol (REQ-015)
    │   └── Sidebar.tsx            # Menú lateral con control de accesos por rol (REQ-015)
    ├── helpers/
    │   └── semaforoFecha.ts       # REQ-012: Función pura utilitaria de semaforización
    ├── shared/
    │   └── types.ts               # Contratos y tipos globales compartidos (Medicamento, Usuario)
    └── features/                  # MÓDULOS DE NEGOCIO AISLADOS (Open/Closed - O)
        ├── dashboard/             # Módulo de la pantalla principal
        │   ├── components/
        │   │   └── PanelNotificaciones.tsx # REQ-016: Renderiza las alertas de stock
        │   ├── hooks/
        │   │   └── useNotificaciones.ts    # Lógica de fetch y estado de alertas (REQ-016)
        │   ├── services/
        │   │   └── dashboardService.ts     # Petición a /api/notificaciones
        │   └── pages/
        │       └── DashboardPage.tsx       # Vista que une el panel con la página principal
        └── simulador/             # Módulo del "Simulador de Kardex" (REQ-017 y REQ-018)
            ├── components/
            │   ├── FormularioIngreso.tsx   # REQ-017: Formulario de entradas / lote
            │   └── FormularioSalida.tsx    # REQ-018: Formulario de salidas / FIFO
            ├── hooks/
            │   ├── useSimuladorIngreso.ts  # Lógica de envío, validación y errores del REQ-011
            │   └── useSimuladorSalida.ts   # Lógica de envío, validación y errores del REQ-013
            ├── services/
            │   └── simuladorService.ts     # Peticiones POST a /api/ingresos y /api/salidas
            ├── types/
            │   └── index.ts                # Interfaces TypeScript exclusivas del simulador
            └── pages/
                └── SimuladorKardexPage.tsx # Vista principal que agrupa ambos paneles interactivos
```
