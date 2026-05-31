"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  type CreateUserSchema,
} from "../validators/create-user.validator";
import {
  updateUserSchema,
  type UpdateUserSchema,
} from "../validators/update-user.validator";
import { createUser } from "../actions/create-user";
import { updateUser } from "../actions/update-user";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type UserFormProps = {
  mode: "create" | "edit";

  defaultValues?:
    | CreateUserSchema
    | UpdateUserSchema;
};

export function UserForm({
  mode,
  defaultValues,
}: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const isCreateMode = mode === "create";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<
    CreateUserSchema | UpdateUserSchema
  >({
    resolver: zodResolver(
      isCreateMode
        ? createUserSchema
        : updateUserSchema,
    ),

    defaultValues,
  });

  async function onSubmit(
    data:
      | CreateUserSchema
      | UpdateUserSchema,
  ) {
    try {
      setIsLoading(true);

      setError(null);

      if (isCreateMode) {
        await createUser(data);
      } else {
        await updateUser(data);
      }

      reset();
    } catch {
      setError(
        "Failed to save user",
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
      {!isCreateMode && (
        <input
          type="hidden"
          {...register("id")}
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="name">
          Name
        </Label>

        <Input
          id="name"
          {...register("name")}
        />
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
      </div>

      {!isCreateMode && (
        <div className="space-y-2">
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            placeholder="Leave blank to keep current password"
            {...register("password")}
          />
        </div>
      )}

      {isCreateMode && (
        <div className="space-y-2">
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            {...register("password")}
          />
        </div>
      )}

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
          ? "Saving..."
          : isCreateMode
            ? "Create user"
            : "Update user"}
      </Button>
    </form>
  );
}