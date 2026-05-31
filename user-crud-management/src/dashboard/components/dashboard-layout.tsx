import * as React from "react"
import { DashboardLayoutProps } from "../types/DashboardPageTypes"

export function DashboardLayout({
    children,
}: DashboardLayoutProps){
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl p-6">
                {children}
            </div>
        </div>
    )
}