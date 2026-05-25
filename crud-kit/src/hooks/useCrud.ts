"use client"

import { useState } from "react"
import { CrudMode, CrudState } from "../types/CrudHookTypes"

// Hook CRUD generique
export function useCrud<T>(){

    // Etat CRUD global
    const [state, setState] = useState<CrudState<T>>({
        open: false,
        mode: "create",
        selectedItem: null,
    })

    function openModal(
        mode: CrudMode,
        item?: T
    ){
        setState({
            open: true,
            mode,
            selectedItem: item || null,
        })
    }

    function closeModal(){
        setState((prev) => ({
            ...prev,
            open: false,
            selectedItem: null,
        }))
    }

    // Reset entire CRUD worflow state
    function resetCrudState(){
        setState({
            open: false,
            mode: "create",
            selectedItem: null,
        })
    }

    return {

        // Etat
        open: state.open,
        mode: state.mode,
        selectedItem: state.selectedItem,
        openModal,
        closeModal,
        resetCrudState
    }
}