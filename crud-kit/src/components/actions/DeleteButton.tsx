"use client"

import { useCrudContext } from "../../context/CrudContext"
import { DeleteButtonProps } from "../../types/CrudActionsTypes"

// Delete button component
export function DeleteButton<T>({
    item,
    label = "Delete",
}: DeleteButtonProps<T>){

    // Access CRUD context
    const crud = useCrudContext()

    return (
        <button
            type="button"
            onClick={() => crud.openModal("delete", item)}
            className="px-4 py-2 rounded-md border"
        >
            {label}
        </button>
    )
}