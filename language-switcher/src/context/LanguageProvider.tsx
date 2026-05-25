"use client"

import { createContext, useContext, useEffect, useState } from "react"
import i18n from "i18next"
import { initializeI18n } from "../lib/i18n"
import { LanguageContextType, ProviderProps } from "../types/LanguageSwitcherType"

// Creation of the overall language context
const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ 
    children, 
    translations, 
    defaultLanguage, 
}: ProviderProps) {

    // Initialize i18n immediately if necessary to prevent
    // components from displaying translation keys.
    if (!i18n.isInitialized) {
        initializeI18n(translations, defaultLanguage)
    }

    const [language, setLanguage] = useState<string>(() => i18n.language || defaultLanguage)

    // Executed after the first React render.
    // Used to retrieve the saved language.
    useEffect(() => {
        if (typeof window === "undefined") return

        const savedLanguage = localStorage.getItem("language")
        const currentLanguage = savedLanguage || defaultLanguage

        // Checks if the language needs to be changed.
        // Avoids unnecessary calls.
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
