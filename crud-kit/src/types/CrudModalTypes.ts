import { ReactNode } from "react"

// Props du modal
export interface CrudModalProps{
    open: boolean                   // Etat d'ouvreture
    onClose: () => void             // Fermeture du modal
    title: string                   // Titre affiche
    children: ReactNode             // Contenu injecte
}