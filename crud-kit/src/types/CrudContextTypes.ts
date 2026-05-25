import { CrudMode } from "./CrudHookTypes"

// Context CRUD value
export interface CrudContextType<T>{
    open: boolean                       // Modal state
    mode: CrudMode                      // Actual mode
    selectedItem: T | null              // Selected element
    openModal: (                        // Actions
        mode: CrudMode,
        item?: T
    ) => void
    closeModal: () => void
    resetCrudState: () => void
}