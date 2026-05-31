"use server"

import { revalidatePath } from "next/cache"
import { requireAdmin } from "../../auth"
import { hashPassword } from "../../utils/hash"
import { UserRepository } from "../../db/repositories/user.repository"
import { createUserSchema } from "../validators/create-user.validator"

const userRepository = new UserRepository()

// Create new platform user securely
export async function createUser(input: unknown){

    await requireAdmin()

    // Validate user payload safely
    const parsedInput = createUserSchema.safeParse(input)

    if(!parsedInput.success){
        throw new Error("Invalid user payload")
    }

    const data = parsedInput.data

    const existingUser = await userRepository.findByEmail(data.email)

    if(existingUser){
        throw new Error("User already exists")
    }

    // Hash password securely
    const hashedPassword = await hashPassword(data.password)

    await userRepository.create({
        ...data,
        password: hashedPassword
    })

    // Refresh dashboard cache
    revalidatePath("/dashboard")
}