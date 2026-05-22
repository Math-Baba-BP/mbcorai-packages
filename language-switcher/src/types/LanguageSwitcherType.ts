import { ReactNode } from "react";

export type LanguageContextType = {
    language: string
    changeLanguage: (
        language: string
    ) => void
}

export type ProviderProps = {
    children: ReactNode
    translations: Record<string, any>
    defaultLanguage: string
}

export type TranslateProps = {
    id: string
}