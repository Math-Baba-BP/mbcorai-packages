import Credentials from "next-auth/providers/credentials"
import { comparePassword } from "../../utils/hash"
import { UserRepository } from "../../db/repositories/user.repository"
import { loginSchema } from "../../validators/login.validators"

const userRepository = new UserRepository()

export const credentialsProvider = Credentials({
    name: "credentials",

    credentials: {
        email: {
            label: "Email",
            type: "email",
        },
        password: {
            label: "Password",
            type: "password",
        },
    },

    async authorize(credentials){

        // Validate credentials structure safely
        const parsedCredentials = loginSchema.safeParse(credentials)

        // Check if email and password are provided
        if(!parsedCredentials.success){
            return null
        }

        const { email, password } = parsedCredentials.data;

        // Find user by email in database
        const user = await userRepository.findByEmail(email)

        if(!user){
            return null
        }

        // Compare hashed password securely
        const isValidPassword = await comparePassword(
            password,
            user.password,
        )

        if(!isValidPassword){
            return null
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        }
    }
})