export interface CrudActionsProps<T>{

    // Callback Modification
    onEdit?: (row: T) => void

    // Callback suppression
    onDelete?: (row: T) => void
}