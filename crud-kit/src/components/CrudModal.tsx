"use client"

import { CrudModalProps } from "../types/CrudModalTypes"

export function CrudModal({
    open,
    onClose,
    title,
    children,
}: CrudModalProps){

    if(!open) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="bg-white p-^ rounded-lg w-full max-w-md">
                <div className="flex items-center justify-beetween mb-4">

                    <h2 className="text-xl font-bold">
                        {title}
                    </h2>

                    <button onClick={onClose} className="border px-2 py-1">
                        X
                    </button>
                </div>

                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}
