import { UserForm } from "./user-form";

export function CreateUserDialog() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Create user
        </h2>

        <p className="text-sm text-gray-500">
          Add a new platform user.
        </p>
      </div>

      <UserForm mode="create" />
    </div>
  );
}