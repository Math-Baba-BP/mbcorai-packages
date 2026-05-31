import { EmptyStateProps } from "../types/DashboardPageTypes"

export function EmptyState({
    title,
    description
}: EmptyStateProps){
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-10 text-center">
      <h2 className="text-lg font-medium">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  )
}