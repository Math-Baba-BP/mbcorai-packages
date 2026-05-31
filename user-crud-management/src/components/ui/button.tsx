import * as React from "react"
import { cn } from "../../utils/cn"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
    className,
    ...props
}: ButtonProps){
    return (
       <button
            className={cn(
                "inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-opacity",
                "hover:opacity-90",
                "disabled:pointer-events-none disabled:opacity-50",
                className,
            )}
            {...props}
        /> 
    )
}