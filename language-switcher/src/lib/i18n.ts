import i18n from "i18next";
import { initReactI18next, } from "react-i18next";

/**
* Initializes i18next with the default translations and language.
* This function allows you to configure the entire translation system of the package.
*/
export function initializeI18n(
    translations: Record<string, any>,          // Object containing all translations
    defaultlanguage: string                     // Application default language
){
     // Connect i18next to React
    i18n.use(
        initReactI18next
    )

    // Complete initialization of i18next
    i18n.init({
        resources: translations,                // All translation resources
        lng: defaultlanguage,                   // Current active language
        fallbackLng: defaultlanguage,           // Backup language used if a translation is missing
        interpolation: { 
            escapeValue: false,                 // Disable automatic HTML escaping
        },
    })

    return i18n
}
