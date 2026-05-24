"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CrudActionsProps } from "../types/CrudActionsTypes"

// Creation colonne actions CRUD
export function CreateCrudActions<T>(
    actions: CrudActionsProps<T>
): ColumnDef<T>{

    return{
        id: "actions",
        header: "Actions",
        cell: ({row}) => {

            // Donnee complete de la ligne
            const originalRow = row.original

            return(
                <div className="flex gap-2">

                    {actions.onEdit && (
                        <button onClick={() => actions.onEdit?.(originalRow)} className="border px-2 py-1">
                            Edit
                        </button>
                    )}

                    {actions.onDelete && (
                        <button onClick={() => actions.onDelete?.(originalRow)} className="border px-2 py-1">
                            Delete
                        </button>
                    )}
                </div>
            )
        }
    }
}