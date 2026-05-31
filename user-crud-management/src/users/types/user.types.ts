export type UserEntity = {
    id: string
    name?: string
    email: string
    role: "ADMIN" | "USER"
    createdAt: Date
    updatedAt: Date
}

export type CreateUserInput = {
    name?: string
    email: string
    password: string
    role: "ADMIN" | "USER"
    createdAt: Date
    updatedAt: Date
}