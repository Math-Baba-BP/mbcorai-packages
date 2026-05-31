import { z } from "zod"

// Centralized environment validation
const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development")
});

// Parse and validate process.env immediately
export const env = envSchema.parse(process.env);