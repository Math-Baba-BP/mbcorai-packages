import { DashboardHeaderProps } from "../types/DashboardPageTypes"

export function DashboardHeader({
    title,
    description,
}: DashboardHeaderProps){
    return (
        <div className="space-y-1">
            <h1 className="text-2xl font-semibold">
                {title}
            </h1>

            {description && (
                <p className="text-sm text-gray-500">
                {description}
                </p>
            )}
        </div>
    )
}