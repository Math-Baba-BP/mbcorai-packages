"use server"

import { revalidatePath } from "next/cache"
import { requireAdmin } from "../../auth"
import { hashPassword } from "../../utils/hash"
import { UserRepository } from "../../db/repositories/user.repository"
import { updateUserSchema } from "../validators/update-user.validator"

const userRepository = new UserRepository()

// Update existing user securely
export async function updateUser(input: unknown){

    await requireAdmin()

    // Validate update payload safely
    const parsedInput = updateUserSchema.safeParse(input)

    if(!parsedInput.success){
        throw new Error("Invalid user payload")
    }

    const {
        id,
        password,
        ...data
    } = parsedInput.data

    const updatePayload: {
        name?: string
        email: string
        role: "ADMIN" | "USER"
        password?: string
    } = {
        ...data,
    }

    // hash password only when provided
    if(password){
        updatePayload.password = await hashPassword(password)
    }

    await userRepository.updateUser(id, updatePayload)

    // Refresh dashboard cache
    revalidatePath("/dashboard")
}