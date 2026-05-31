"use client";

import { useState } from "react"
import type { UserEntity } from "../types/user.types"
import { EditUserCard } from "./edit-user-card"
import { DeleteUserButton } from "./delete-user-button"

type UserActionsProps = {
  user: UserEntity;
};

export function UserActions({
  user,
}: UserActionsProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-4">
        <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={() =>
                setIsEditing((prev) => !prev)
                }
                className="text-sm font-medium text-blue-600"
            >
                {isEditing
                ? "Close"
                : "Edit"}
            </button>

            <DeleteUserButton
                userId={user.id}
            />
        </div>
        
      {isEditing && (
        <EditUserCard user={user} />
      )}
    </div>
  );
}