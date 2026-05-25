"use client"

import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react"
import {
    CrudResourceConfig,
    CrudResourceReturn
} from "../../types/CrudResourceTypes"

// Generic CRUD resource hook
export function useCrudResource<T extends { id: string}>(
    config: CrudResourceConfig<T>
): CrudResourceReturn<T>{
    const configRef = useRef(config)
    configRef.current = config

    // Resource data
    const [data, setData] = useState<T[]>([])

    // Loading state
    const [loading, setLoading] = useState(false)

    // Error state
    const [error, setError] = useState<string | null>(null)

    // Fetch all resources
    const refresh = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await configRef.current.getMany()
            setData(result)
        } catch(error){
            setError(
                error instanceof Error ? error.message : "Unknown error"
            )
        } finally{
            setLoading(false)
        }
    }, [])

    // Create resource
    async function createItem(
        values: Partial<T>
    ){
        try{
            setLoading(true)
            await configRef.current.create(values)
            await refresh()
            configRef.current.onSuccess?.()
        } catch(error){
            if(error instanceof Error){
                configRef.current.onError?.(error)
                setError(error.message)
            }
        } finally{
            setLoading(false)
        }
    }

    // Update resource
    async function updateItem(
        id: string,
        values: Partial<T>
    ){
        try{
            setLoading(true)
            await configRef.current.update(id, values)
            await refresh()
            configRef.current.onSuccess?.()
        } catch (error){
            if(error instanceof Error){
                configRef.current.onError?.(error)
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    // Delete resource
    async function removeItem(
        id: string
    ){
        try{
            setLoading(true)
            await configRef.current.remove(id)
            await refresh()
            configRef.current.onSuccess?.()
        } catch (error){
            if(error instanceof Error){
                configRef.current.onError?.(error)
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    // intial fetch
    useEffect(() => {
        refresh()
    }, [refresh])

    return {
        data,
        loading,
        error,
        refresh,
        createItem,
        updateItem,
        removeItem
    }
}