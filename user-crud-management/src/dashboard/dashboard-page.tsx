import { DashboardHeader } from "./components/dashboard-header"
import { DashboardLayout } from "./components/dashboard-layout"
import { UsersTable } from "./components/users-table"
import { CreateUserDialog } from "../users/components/create-user-dialog"
import type { UserCrudClassNames } from "../styles/class-names";
import { UserCrudStyleProvider } from "../styles/style-context";
import type { UsersTableProps } from "./types/DashboardPageTypes";

type UserCrudDashboardProps = {
  users: UsersTableProps["users"];
  classNames?: UserCrudClassNames;
};

export function UserCrudDashboard({
    users,
    classNames,
}: UserCrudDashboardProps){

    return (
        <UserCrudStyleProvider
            classNames={classNames}
        >
            <DashboardLayout>
                <div className="space-y-6">
                    <DashboardHeader
                    title="User Management"
                    description="Manage platform users and roles."
                    />

                        <CreateUserDialog />

                    <UsersTable users={users} />
                </div>
            </DashboardLayout>
        </UserCrudStyleProvider>
    )
}