"use client"

import { useCrudContext } from "../../context/CrudContext"
import { EditButtonProps } from "../../types/CrudActionsTypes"

// Edit button component
export function EditButton<T>({
    item,
    label = "Edit",
}: EditButtonProps<T>){

    // Access CRUD context
    const crud = useCrudContext()

    return (
        <button
            type="button"
            onClick={() => crud.openModal("edit", item)}
            className="px-4 py-2 rounded-md border"
        >
            {label}
        </button>
    )
}