import * as React from "react"
import { cn } from "../../utils/cn"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({
    className,
    ...props
}: InputProps){
    return (
        <input
            className={cn(
                "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors",
                "focus:border-black",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}
        /> 
    )
}