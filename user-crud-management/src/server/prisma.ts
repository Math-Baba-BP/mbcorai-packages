import { getPackageConfig } from "../config/package-config"

// Retrieve host Prisma instance safely
export function getPrisma(){
    return getPackageConfig().prisma
}