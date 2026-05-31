"use server"

import { requireAdmin } from "../../auth"
import { UserRepository } from "../../db/repositories/user.repository"

const userRepository = new UserRepository()

// Delete user securely with RBAC protection
export async function deleteUser(userId: string){
    await requireAdmin()

    return userRepository.deleteUser(userId)
}