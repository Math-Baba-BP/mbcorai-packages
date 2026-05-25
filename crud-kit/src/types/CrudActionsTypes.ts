export interface CrudActionsProps<T>{

    // Callback Modification
    onEdit?: (row: T) => void

    // Callback suppression
    onDelete?: (row: T) => void
}

export interface EditButtonProps<T>{
    item: T
    label?: string
}

export interface DeleteButtonProps<T>{
    item: T
    label?:string
}