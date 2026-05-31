import type { UserEntity } from "../../users/types/user.types";
import { EmptyState } from "../../dashboard/components/empty-state";
import { UserActions } from "../../users/components/user-actions";

type UsersTableProps = {
  users: UserEntity[];
};

export function UsersTable({
  users,
}: UsersTableProps) {
  if (users.length === 0) {
    return (
      <EmptyState
        title="No users found"
        description="Create your first user."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium">
              Role
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-100"
            >
              <td className="px-6 py-4 text-sm">
                {user.name ?? "-"}
              </td>

              <td className="px-6 py-4 text-sm">
                {user.email}
              </td>

              <td className="px-6 py-4 text-sm">
                {user.role}
              </td>

              <td className="px-6 py-4 text-sm">
                <UserActions user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}