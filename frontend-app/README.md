# VStay Mobile Frontend

React Native frontend for the VStay villa booking backend. The app uses Expo, TypeScript, NativeWind, and Tailwind CSS.

## Commands

```powershell
npm install
npm run start
npm run typecheck
npm run test
```

Set the backend URL in `.env`:

```text
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
```

For Android emulators, use `http://10.0.2.2:8080` instead of `localhost`.

## Production Folder Structure

```text
src/
|-- api/                  # Endpoint contracts, domain types, mappers, client
|-- app/                  # App composition and providers
|-- features/             # Business modules grouped by domain
|   |-- booking/
|   `-- villas/
|-- navigation/           # Navigation state and screen contracts
|-- shared/
|   |-- components/       # Reusable UI primitives
|   |-- config/           # Runtime configuration
|   |-- hooks/            # Shared hooks
|   |-- lib/              # Pure utilities
|   |-- theme/            # Design tokens
|   `-- types/            # Shared app types
`-- tests/                # Test helpers
```

Feature modules own their screens, services, types, and local components. Shared code is reserved for cross-feature concerns.

## Design And API Rules

Use [DESIGN.md](./DESIGN.md) before adding or changing screens. API calls belong in `src/api/*`; feature services may wrap those functions, but UI components should not call `fetch` directly or duplicate endpoint strings.
