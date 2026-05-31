import { z } from "zod"

export const updateUserSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(8).optional(),
    role: z.enum(["ADMIN", "USER"])
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>