// Crud Resource Configuration
export interface CrudResourceConfig<T>{
    getMany: () => Promise<T[]>
    create: (data: Partial<T>) => Promise<T>
    update:(
        id: string,
        data: Partial<T>
    ) => Promise<T>
    remove:(id: string) => Promise<void>
    onSuccess?: () => void                         // Called after successful mutation
    onError?: (error: Error) => void               // Called when mutation fails
}

// CRUD resource return type
export interface CrudResourceReturn<T>{
    data: T[]
    loading: boolean
    error: string | null
    refresh: () => Promise<void>
    createItem: (data: Partial<T>) => Promise<void>
    updateItem: (
        id: string,
        data: Partial<T>
    ) => Promise<void>
    removeItem: (id: string) => Promise<void>
}