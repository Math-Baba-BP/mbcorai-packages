"use client";

import { useState } from "react"
import { deleteUser } from "../actions/delete-user"

type DeleteUserButtonProps = {
  userId: string;
};

export function DeleteUserButton({
  userId,
}: DeleteUserButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this user?",
      );

    if (!confirmed) {
      return;
    }

    try {
      setIsLoading(true);

      setError(null);

      await deleteUser(userId);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);

        return;
      }

      setError(
        "Failed to delete user",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isLoading}
        className="text-sm font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading
          ? "Deleting..."
          : "Delete"}
      </button>

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}