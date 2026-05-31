import { z } from "zod"

// Validate and type login credentials safely
export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
})

export type LoginInput = z.infer<typeof loginSchema>