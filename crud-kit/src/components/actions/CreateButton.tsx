"use client"

import { useCrudContext } from "../../context/CrudContext"

// Create button component
export function CreateButton({
    label = "create",
    onClick,
}: {
    label?: string
    onClick?: () => void
}){

    // Access CRUD context
    const crud = useCrudContext()

    return (
        <button
            type="button"
            onClick={() => {
                if (onClick) {
                    onClick()
                    return
                }
                crud.openModal("create")
            }}
            className="px-4 py-2 rounded-md border"
        >
            {label}
        </button>
    )
}