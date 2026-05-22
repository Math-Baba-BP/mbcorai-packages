"use client"

import{ useLanguage } from "../hooks/useLanguage"

export function LanguageSwitcher(){

    const {language, changeLanguage} = useLanguage()

    return(
        <select
            value={language}
            onChange={(e) =>
                changeLanguage(
                    e.target.value
                )
            }
            className="border p-2 rounded"
        >
            <option value="fr">
                Français
            </option>

            <option value="en">
                English
            </option>

        </select>
    )
}