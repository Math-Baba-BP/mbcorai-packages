// Modes CRUD disponibles
export type CrudMode = 
    | "create"
    | "edit"
    | "delete"

// Etat hook CRUD
export interface CrudState<T>{
    open: boolean                       // Modal ouvert ?
    mode: CrudMode                      // Mode actuel
    selectedItem: T | null              // Element selectionne
}