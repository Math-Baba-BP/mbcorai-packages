import { EmptyState } from "./empty-state"
import { UsersTableRow } from "./users-table-row"
import { UsersTableProps } from "../types/DashboardPageTypes"
import { UserActions } from "../../users/components/user-actions";


export function UsersTable({
    users,
}: UsersTableProps){
    if(users.length === 0){
        return (
            <EmptyState
                title="No users found"
                description="Users will appear here once created."
            />
        )
    }

    return (
         <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="w-full border-collapse">
                <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="px-4 py-3 text-sm font-medium">
                    Name
                    </th>

                    <th className="px-4 py-3 text-sm font-medium">
                    Email
                    </th>

                    <th className="px-4 py-3 text-sm font-medium">
                    Role
                    </th>

                    <th className="px-4 py-3 text-right text-sm font-medium">
                    Actions
                    </th>
                </tr>
                </thead>

                <tbody>
                {users.map((user) => (
                    <UsersTableRow
                    key={user.id}
                    user={user}
                    />
                ))}
                </tbody>
            </table>
        </div>
    )
}