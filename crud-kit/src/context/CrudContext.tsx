"use client"

import React, { createContext, useContext } from "react"
import { useCrud } from "../hooks/useCrud"
import { CrudContextType } from "../types/CrudContextTypes"

// CRUD context
const CrudContext = createContext<CrudContextType<any> | null>(null)

// Global CRUD provider
export function CrudProvider<T>({
    children,
}:{
    children: React.ReactNode
}){

    // Hook central CRUD
    const crud = useCrud<T>()

    return(
        <CrudContext.Provider value={crud}>
            {children}
        </CrudContext.Provider>
    )
}

// Hook CRUD context access
export function useCrudContext<T>(){

    const context = useContext(CrudContext)

    if(!context){
        throw new Error(
            "useCrudContext must be used inside CrudProvider"
        )
    }

    return context as CrudContextType<T>
}