# @mbcorai/language-switcher

Un package simple et réutilisable pour gérer la langue et les traductions dans une application React / Next.js.

## Fonctionnalités

- Gestion globale de la langue
- Composants réutilisables : `LanguageProvider`, `LanguageSwitcher`, `Translate`
- Intégration avec i18next et react-i18next
- Compatible avec Next.js App Router
- API légère et facile à prendre en main

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

### 1 — Créez vos fichiers de traduction

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

### 2 — Enveloppez votre application avec `LanguageProvider`

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

> Important : `LanguageProvider` doit entourer les composants qui utilisent `useLanguage()` ou `Translate`.

### 3 — Utilisez les composants

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

- `translations`: objet de ressources de traduction
- `defaultLanguage`: langue par défaut

### `LanguageSwitcher`

Affiche un sélecteur de langue.

```tsx
<LanguageSwitcher />
```

### `Translate`

Affiche du texte traduit pour un identifiant donné.

```tsx
<Translate id="home.title" />
```

### `useLanguage()`

Permet d'accéder au contexte de langue et de changer la langue.

```tsx
const { language, changeLanguage } = useLanguage()
```

## Développement local

Pour tester le package localement dans un autre projet :

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

## Notes importantes

- `react` doit être installé en peer dependency
- `LanguageProvider` doit envelopper les composants côté client
- `LanguageSwitcher` utilise le hook `useLanguage()` interne

## Auteur

Mathieu Baba

## Licence

MIT