"use client"

// Error state component
export function CrudError({
    message,
}: {
    message: string
}){
    return(
        <div className="p-6 text-sm text-red-500">
            {message}
        </div>
    )
}