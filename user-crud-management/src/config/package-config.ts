import type { PrismaClient } from "@prisma/client"

export type UserCrudAuthConfig = {
    loginPath?: string
    afterLoginRedirect?: string
    protectedPaths?: string[]
}

export const defaultLoginPath = "/login"
export const defaultLoginRedirect = "/dashboard"
export const defaultProtectedPaths = ["/dashboard"] as const

type PackageConfig = {
    prisma: PrismaClient
    auth?: UserCrudAuthConfig
}

// Use globalThis so config is shared across all module instances
// (dist bundle vs transpiled source both access the same variable)
declare global {
    // eslint-disable-next-line no-var
    var __userCrudPackageConfig: PackageConfig | undefined
}

export function configureUserCrudManagement(config: PackageConfig){
    globalThis.__userCrudPackageConfig = config
}

export function getPackageConfig(){
    if(!globalThis.__userCrudPackageConfig){
        throw new Error("UserCrudManagement is not configured.")
    }

    return globalThis.__userCrudPackageConfig
}