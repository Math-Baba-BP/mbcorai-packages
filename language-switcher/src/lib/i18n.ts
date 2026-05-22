import i18n from "i18next";
import { initReactI18next, } from "react-i18next";

/**
 * Initialise i18next avec les traductions et la langue par défaut.
 * Cette fonction permet de configurer tout le système de traduction du package.
 */
export function initializeI18n(
    translations: Record<string, any>,          // Objet contenant toutes les traductions
    defaultlanguage: string                     // Langue par défaut de l'application
){
     // Connecte i18next à React
    i18n.use(
        initReactI18next
    )

    // Initialisation complète de i18next
    i18n.init({
        resources: translations,                // Toutes les ressources de traduction
        lng: defaultlanguage,                   // Langue active actuelle
        fallbackLng: defaultlanguage,           // Langue de secours utilisée si une traduction manque
        interpolation: { 
            escapeValue: false,                 // Désactive l'échappement HTML automatique
        },
    })

    return i18n
}
