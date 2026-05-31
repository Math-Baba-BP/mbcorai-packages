import type { UserEntity } from "../types/user.types";

import { UserForm } from "./user-form";

type EditUserCardProps = {
  user: UserEntity;
};

export function EditUserCard({
  user,
}: EditUserCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Edit user
        </h2>

        <p className="text-sm text-gray-500">
          Update user information.
        </p>
      </div>

      <UserForm
        mode="edit"
        defaultValues={user}
      />
    </div>
  );
}