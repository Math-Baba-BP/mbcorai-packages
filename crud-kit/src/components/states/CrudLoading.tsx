"use client"

// Loading state component
export function CrudLoading({
    message = "Loading...",
}: {
    message?: string
}){
    return(
        <div className="p-6 text-sm">
            {message}
        </div>
    )
}