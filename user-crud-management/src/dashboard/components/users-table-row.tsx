import { UsersTableRowProps } from "../types/DashboardPageTypes"
import { UserActions } from "../../users/components/user-actions"

export function UsersTableRow({
    user,
}: UsersTableRowProps){
     return (
        <tr className="border-b border-gray-100 last:border-0">
            <td className="px-4 py-3 text-sm">
                {user.name || "-"}
            </td>

            <td className="px-4 py-3 text-sm">
                {user.email}
            </td>

            <td className="px-4 py-3 text-sm">
                {user.role}
            </td>

            <td className="px-4 py-3 text-right">
                <UserActions user={user} />
            </td>
        </tr>
     )
}