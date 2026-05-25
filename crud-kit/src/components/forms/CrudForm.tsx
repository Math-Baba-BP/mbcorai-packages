"use client"

import {
    FieldValues,
    FormProvider,
    useForm,
    Resolver,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CrudFormProps } from "../../types/CrudFormTypes"

// Formulaire CRUD generique
export function CrudForm<T extends FieldValues>({
    schema,
    defaultValues,
    onSubmit,
    children,
}: CrudFormProps<T>) {

    // Initialisation React hook form
    const methods = useForm<T>({
        resolver: zodResolver(schema) as Resolver<T>,
        defaultValues,
    })

    return(
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                {children}
            </form>
        </FormProvider>
    )
}