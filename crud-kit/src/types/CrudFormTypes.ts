import { ReactNode } from "react"
import {
    DefaultValues,
    FieldValues,
    SubmitHandler,
} from "react-hook-form"
import { ZodType } from "zod"

// Props formulaire generique
export interface CrudFormProps<T extends FieldValues> {
    schema: ZodType<T, any, any> // Validation schema
    defaultValues?: DefaultValues<T> // Valeurs par defaut
    onSubmit: SubmitHandler<T> // Soumission formulaire
    children: ReactNode // Contenu injecte
}

export interface InputFieldProps{
    name: string
    label: string
    type?: string
}

export interface FormActionsProps{
    submitLabel?: string
}