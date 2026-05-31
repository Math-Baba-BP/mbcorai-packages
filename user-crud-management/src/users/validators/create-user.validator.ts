import { z } from "zod"

// Validate create user payload safely
export const createUserSchema = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(8),
    role: z.enum(["ADMIN", "USER"])

})

export type CreateUserSchema = z.infer<typeof createUserSchema>