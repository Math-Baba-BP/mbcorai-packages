import { FormActionsProps } from "../../types/CrudFormTypes"
// Bouton formulaire
export function FormActions({
    submitLabel="Save",
}: FormActionsProps){

    return(
        <div className="flex justify-end">
            <button type="submit" className="border px-4 py-2">
                {submitLabel}
            </button>
        </div>
    )
}