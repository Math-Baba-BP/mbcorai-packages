# @mbcorai/language-switcher

A simple and reusable package for managing language and translations in a React/Next.js application.

## Features

- Comprehensive language management
- Reusable components: `LanguageProvider`, `LanguageSwitcher`, `Translate`
- Integration with i18next and react-i18next
- Compatible with Next.js App Router
- Lightweight and easy-to-use API

## Technologies

- React
- TypeScript
- i18next
- react-i18next

## Installation

```bash
npm install @mbcorai/language-switcher
```

## Configuration

### 1 — Create your translation files

#### `fr.json`

```json
{
  "home": {
    "title": "Bienvenue",
    "description": "Ceci est un site traduit"
  },
  "login": {
    "button": "Se connecter"
  }
}
```

#### `en.json`

```json
{
  "home": {
    "title": "Welcome",
    "description": "This is a translated website"
  },
  "login": {
    "button": "Login"
  }
}
```

### 2 — Wrap your application with `LanguageProvider`

#### `app/layout.tsx`

```tsx
import "./globals.css"
import fr from "@/constants/fr.json"
import en from "@/constants/en.json"
import { LanguageProvider } from "@mbcorai/language-switcher"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <LanguageProvider
          translations={{
            fr: { translation: fr },
            en: { translation: en },
          }}
          defaultLanguage="fr"
        >
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
```

> Important: `LanguageProvider` must enclose components that use `useLanguage()` or `Translate`.

### 3 — Use the components

#### `app/page.tsx`

```tsx
"use client"

import { LanguageSwitcher, Translate } from "@mbcorai/language-switcher"

export default function HomePage() {
  return (
    <div className="p-10 space-y-6">
      <LanguageSwitcher />
      <h1 className="text-4xl font-bold">
        <Translate id="home.title" />
      </h1>
      <p className="text-lg">
        <Translate id="home.description" />
      </p>
    </div>
  )
}
```

## API

### `LanguageProvider`

Props :

- `translations`: translation resource object
- `defaultLanguage`: default language

### `LanguageSwitcher`

Displays a language selector.

```tsx
<LanguageSwitcher />
```

### `Translate`

Displays translated text for a given ID.

```tsx
<Translate id="home.title" />
```

### `useLanguage()`

Allows access to the language context and the ability to change the language.

```tsx
const { language, changeLanguage } = useLanguage()
```

## Local Development

To test the package locally in another project:

```bash
npm install ../language-switcher
```

## Build

```bash
npm run build
```

## Publication

```bash
npm publish --access public
```

## Important Notes

- `react` must be installed as a peer dependency
- `LanguageProvider` must wrap client-side components
- `LanguageSwitcher` uses the internal `useLanguage()` hook

## Auteur

Mathieu Baba

## Licence

MIT