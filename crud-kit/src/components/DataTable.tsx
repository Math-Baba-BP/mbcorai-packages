"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { DataTableProps } from "../types/DataTableTypes"

export function DataTable<T>({
    data,
    columns,
}: DataTableProps<T>){

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return(
        <table className="w-full border-collapse border">
            <thead>
                {table.getHeaderGroups().map((headerGroup) =>(
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) =>(
                            <th key={header.id} className="border p-2 text-left">
                                {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())
                            }
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody>
                {table.getRowModel().rows.map((row) =>(
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="border p-2">
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}