"use client"

// Empty state component
export function CrudEmpty({
    message = "No data found",
}: {
    message?: string
}){
    return(
        <div className="p-6 text-sm">
            {message}
        </div>
    )
}