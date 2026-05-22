"use client"

import { useTranslation } from "react-i18next"
import { TranslateProps } from "../types/LanguageSwitcherType"

export function Translate({
    id, 
}: TranslateProps){

    const { t } = useTranslation()

    return(
        <>
            {t(id)}
        </>
    )
}
