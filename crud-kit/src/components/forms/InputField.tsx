"use client"

import { useFormContext } from "react-hook-form"
import { InputFieldProps } from "../../types/CrudFormTypes"


//Champ formulaire generique
export function InputField({
    name,
    label,
    type="text",
}: InputFieldProps){

    // Recuperation contexte form
    const {register, formState:{errors}} = useFormContext()

    return (
        <div className="flex flex-col gap-1">

            <label>
                {label}
            </label>

            <input
                type={type}
                {...register(name, {
                    valueAsNumber: type === "number",
                })}
                className="border p-2 rounded"
            />

            {errors[name] && (
                <p className="text-red-500 text-sm">
                    {String(errors[name]?.message)}
                </p>            
            )}
        </div>
    )
}