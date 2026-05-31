"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useLogin } from "../hooks/use-login"
import type { LoginFormValues } from "../types/login.types"
import { loginSchema } from "@/validators/login.validators";

type LoginFormProps = {
  redirectTo?: string
}

export function LoginForm({ redirectTo }: LoginFormProps){
    const { error, isLoading, handleLogin } = useLogin()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({resolver: zodResolver(loginSchema)})

    async function onSubmit(data: LoginFormValues){
        await handleLogin(data.email, data.password, redirectTo)
    }

    return(
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
         >
            <div className="space-y-2">
                <Label htmlFor="email">
                Email
                </Label>

                <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                />

                {errors.email && (
                <p className="text-sm text-red-500">
                    {errors.email.message}
                </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">
                Password
                </Label>

                <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
                />

                {errors.password && (
                <p className="text-sm text-red-500">
                    {errors.password.message}
                </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
            >
                {isLoading
                ? "Signing in..."
                : "Sign in"}
            </Button>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </form>
    )
}