"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type { UserEntity } from "../types/user.types";

import {
  updateUserSchema,
  type UpdateUserSchema,
} from "../validators/update-user.validator";

import { updateUser } from "../actions/update-user";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type EditUserFormProps = {
  user: UserEntity;
};

export function EditUserForm({
  user,
}: EditUserFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver:
      zodResolver(updateUserSchema),

    defaultValues: {
      id: user.id,
      name: user.name ?? "",
      email: user.email,
      password: "",
      role: user.role,
    },
  });

  async function onSubmit(
    data: UpdateUserSchema,
  ) {
    try {
      setIsLoading(true);

      setError(null);

      // Remove empty password safely
      const payload = {
        ...data,

        password:
          data.password || undefined,
      };

      await updateUser(payload);
    } catch {
      setError(
        "Failed to update user",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <input
        type="hidden"
        {...register("id")}
      />

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
          New password
        </Label>

        <Input
          id="password"
          type="password"
          {...register("password")}
        />

        <p className="text-xs text-gray-500">
          Leave empty to keep current
          password.
        </p>

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

        {errors.role && (
          <p className="text-sm text-red-500">
            {errors.role.message}
          </p>
        )}
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
          ? "Saving..."
          : "Save changes"}
      </Button>
    </form>
  );
}