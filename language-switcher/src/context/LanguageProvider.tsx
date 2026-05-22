"use client"

import {
    createContext,             
    useContext,                 
    useEffect,                      
    useState,
    ReactNode,
} from "react"
import i18n from "i18next"
import { initializeI18n } from "../lib/i18n"
import { LanguageContextType, ProviderProps } from "../types/LanguageSwitcherType"

// Création du contexte global de langue
//
// Il contient :
// - la langue actuelle
// - la fonction de changement de langue
//
// Valeur par défaut : null
const LanguageContext = createContext< LanguageContextType | null > (null)

/**
 * Provider global de langue
 *
 * Ce composant englobe toute l'application et rend le système de traduction accessible partout dans React.
 */
export function LanguageProvider({
    children,                          
    translations,
    defaultLanguage,
}: ProviderProps){

    // State React qui contient la langue active
    const [language, setLanguage,] = useState(defaultLanguage)

    useEffect(() => {

        // Récupère la langue sauvegardée dans le navigateur
        const savedLanguage = localStorage.getItem("language")

        // Si aucune langue sauvegardée : utilise la langue par défaut
        const currentLanguage = savedLanguage || defaultLanguage

        initializeI18n(translations, currentLanguage)

        setLanguage(currentLanguage)
    }, [])

    /**
     * Change la langue globalement
     */
    function changeLanguage(newLanguage: string) {

        i18n.changeLanguage(newLanguage)                // Change la langue dans i18next

        localStorage.setItem("language", newLanguage)   // Sauvegarde la langue dans le navigateur

        setLanguage(newLanguage)
    }

    return(
        <LanguageContext.Provider
            value={{
                language,
                changeLanguage
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

/**
 * Hook personnalisé
 * Permet d'accéder facilement au contexte de langue.
 */
export function useLanguage(){

    const context = useContext(LanguageContext)

    if(!context) {
        throw new Error(
            "uselanguage must be inside Language Provider"
        )
    }

    return context
}
