import type { UserCrudClassNames } from "./class-names"

// Centralized default package styles
export const defaultClassNames: Required<UserCrudClassNames> = {
    dashboard: 
        "space-y-6",

    table:
      "overflow-hidden rounded-xl border border-gray-200 bg-white",

    tableHeader:
      "border-b border-gray-200 bg-gray-50",

    tableRow:
      "border-b border-gray-100",

    input:
      "h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm",

    button:
      "inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white",

    card:
      "rounded-xl border border-gray-200 bg-white p-6",

    form: "space-y-4",
} 