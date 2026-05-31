import { PrismaClient } from "@prisma/client"

// Global declaration for development hot reload support
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// Create Prisma client instance
export const prisma = globalThis.prisma ?? new PrismaClient({
    log:
        process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});

// Persist Prisma client during development hot reloads.
if(process.env.NODE_ENV !== "production"){
    globalThis.prisma == prisma;
}