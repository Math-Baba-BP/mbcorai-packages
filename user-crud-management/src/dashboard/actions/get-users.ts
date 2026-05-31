import { requireAdmin } from "../../auth"
import { UserRepository } from "../../db/repositories/user.repository"

const userRepository = new UserRepository()

// Retrieve dashboard users securely
export async function getUsers(){
    await requireAdmin()

    return userRepository.getAllUsers()
}