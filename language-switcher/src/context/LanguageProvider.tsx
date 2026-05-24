"use client"

import { createContext, useContext, useEffect, useState } from "react"
import i18n from "i18next"
import { initializeI18n } from "../lib/i18n"
import { LanguageContextType, ProviderProps } from "../types/LanguageSwitcherType"

// Création du contexte global de langue
const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ 
    children, 
    translations, 
    defaultLanguage, 
}: ProviderProps) {

    // Initialise i18n immédiatement si nécessaire pour éviter
    // que les composants affichent les clés de traduction.
    if (!i18n.isInitialized) {
        initializeI18n(translations, defaultLanguage)
    }

    const [language, setLanguage] = useState<string>(() => i18n.language || defaultLanguage)

    // Exécuté après le premier render React.
    // Sert à récupérer la langue sauvegardée.
    useEffect(() => {
        if (typeof window === "undefined") return

        const savedLanguage = localStorage.getItem("language")
        const currentLanguage = savedLanguage || defaultLanguage

        // Vérifie si la langue doit être changée.
        // Évite les appels inutiles.
        if (i18n.language !== currentLanguage) {
            i18n.changeLanguage(currentLanguage)
        }

        setLanguage(currentLanguage)
    }, [defaultLanguage])

    function changeLanguage(newLanguage: string) {
        if (i18n.language !== newLanguage) {
            i18n.changeLanguage(newLanguage)
        }

        if (typeof window !== "undefined") {
            localStorage.setItem("language", newLanguage)
        }

        setLanguage(newLanguage)
    }

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error("uselanguage must be inside Language Provider")
    }
    return context
}
