"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"

export function useLogin(){

    const router = useRouter()

    // Loading state during login request
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState<string | null>(null)

    async function handleLogin(
        email: string,
        password: string,
        redirectPath: string = "/dashboard",
    ){
        try{
            setIsLoading(true)
            setError(null)

            const result: any = await signIn("credentials", {
                redirect: false,
                email,
                password,
            } as any)

            if(result?.error){
                setError("Invalid email or password")
                return
            }

            // Refresh session after login
            router.refresh()

            // Redirect authenticated user
            router.push(redirectPath)

        } finally{
            setIsLoading(false)
        }
    }

    return {
        error,
        isLoading,
        handleLogin
    }
}