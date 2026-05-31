import React from "react";

export type DashboardHeaderProps = {
    title: string
    description?: string
}

export type EmptyStateProps = {
    title: string
    description?: string
}

export type UsersTableRowProps = {
    user: {
        id: string
        name: string | null
        email: string
        role: "ADMIN" | "USER"
    }
}

export type UsersTableProps = {
    users: Array<{
        id: string
        name: string | null
        email: string
        role: "ADMIN" | "USER"
    }>
}

export type DashboardLayoutProps = {
    children: React.ReactNode
}