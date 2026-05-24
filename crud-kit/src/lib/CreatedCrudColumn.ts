import { ColumnDef } from "@tanstack/react-table"

// Fonction helper generique (Creation des colonnes et des Titres associes)
export function CreateCrudColumn<T>(
    accessorKey: keyof T,               // Cle de l'objet
    header: string                      // Titre affiche dans la table
): ColumnDef<T> {
    return {
        accessorKey: accessorKey as string,
        header,

        // Cell par defaut
        cell: ({row}) => {
            const value = row.getValue(
                accessorKey as string
            )

            // Securite d'affichage
            return value ? String(value) : "-"
        }
    }
}