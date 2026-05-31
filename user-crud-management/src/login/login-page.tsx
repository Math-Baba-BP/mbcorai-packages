import { LoginCard } from "./components/login-card"
import { LoginForm } from "./components/login-form"
import { LoginHeader } from "./components/login-header"

type LoginPageProps = {
  redirectTo?: string
}

export function LoginPage({ redirectTo }: LoginPageProps){
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <LoginCard>
                <div className="space-y-6">
                <LoginHeader />

                <LoginForm redirectTo={redirectTo} />
                </div>
            </LoginCard>
        </div>
    )
}