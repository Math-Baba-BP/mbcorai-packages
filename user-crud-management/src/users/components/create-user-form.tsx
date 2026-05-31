"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUser } from "../actions/create-user"
import {
  createUserSchema,
  type CreateUserSchema,
} from "../validators/create-user.validator"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export function CreateUserForm(){
    
    const[isLoading, setIsLoading] = useState(false)

    const[error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateUserSchema>({
        resolver: zodResolver(createUserSchema),
    })

    async function onSubmit(data: CreateUserSchema){
        try{
            setIsLoading(true)
            setError(null)

            await createUser(data)

            reset()
        } catch{
            setError(
                "failed to create user",
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            >
            <div className="space-y-2">
                <Label htmlFor="name">
                Name
                </Label>

                <Input
                id="name"
                {...register("name")}
                />

                {errors.name && (
                <p className="text-sm text-red-500">
                    {errors.name.message}
                </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">
                Email
                </Label>

                <Input
                id="email"
                type="email"
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
                {...register("password")}
                />

                {errors.password && (
                <p className="text-sm text-red-500">
                    {errors.password.message}
                </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">
                Role
                </Label>

                <select
                id="role"
                {...register("role")}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                >
                <option value="USER">
                    USER
                </option>

                <option value="ADMIN">
                    ADMIN
                </option>
                </select>
            </div>

            {error && (
                <p className="text-sm text-red-500">
                {error}
                </p>
            )}

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
            >
                {isLoading
                ? "Creating..."
                : "Create user"}
            </Button>
        </form>
    )
}