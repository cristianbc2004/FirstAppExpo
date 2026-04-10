# App with API

Expo Router + TypeScript starter focused on scalable structure, NativeWind UI, React Hook Form + Zod validation, React Native Reanimated animations, and an OpenWeatherMap integration.

## Stack

- Expo + TypeScript
- Expo Router
- NativeWind
- React Hook Form
- Zod
- React Native Reanimated
- OpenWeatherMap API

## Install

```bash
npm install
```

## Environment variables

Create a `.env` file based on `.env.example`:

```env
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

Expo exposes `EXPO_PUBLIC_` variables to the client, which makes them the right choice for public API keys in Expo apps.

## Run

```bash
npm run start
npm run android
npm run ios
npm run web
```

## Setup notes

### Expo Router

- `main` in `package.json` points to `expo-router/entry`
- `app/` contains file-based routes
- `expo-router` is added to `app.json` plugins

### NativeWind

- `global.css` includes Tailwind directives
- `tailwind.config.js` uses `nativewind/preset`
- `babel.config.js` adds `jsxImportSource: 'nativewind'` and `nativewind/babel`
- `metro.config.js` wraps Expo Metro with `withNativeWind`
- `nativewind-env.d.ts` adds NativeWind types

### Reanimated

- `react-native-reanimated` is installed
- `react-native-reanimated/plugin` is the last Babel plugin
- Animated screen elements and loading placeholders use Reanimated APIs

## Project structure

```text
app/
  _layout.tsx
  index.tsx
  search.tsx
  weather/
    [city].tsx
src/
  components/
    ui/
      app-button.tsx
      app-input.tsx
      app-text.tsx
      screen-container.tsx
  config/
    env.ts
  constants/
    routes.ts
  features/
    weather/
      components/
        city-search-form.tsx
        weather-details-card.tsx
        weather-preview-card.tsx
        weather-state.tsx
      hooks/
        use-weather-query.ts
      schemas/
        city-schema.ts
      services/
        weather-service.ts
  utils/
    cn.ts
```

## Notes

- File names follow kebab-case.
- Shared UI stays in `src/components/ui`.
- Weather-specific logic is isolated under `src/features/weather`.
- The weather service throws friendly UI-ready errors.
- Search validation is handled with Zod through `zodResolver`.