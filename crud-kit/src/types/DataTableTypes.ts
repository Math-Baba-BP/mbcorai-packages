import { ColumnDef } from "@tanstack/react-table"

export interface DataTableProps<T>{

    // Props generique du composant DataTable
    // T represente le type de donnees affichees
    data: T[]

    // Configuration des colonnes
    columns: ColumnDef<T>[]
}