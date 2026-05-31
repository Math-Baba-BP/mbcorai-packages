import type { NextAuthConfig } from "next-auth"
import { credentialsProvider } from "./providers/credentials"
import { getPackageConfig, type UserCrudAuthConfig, defaultLoginPath, defaultLoginRedirect, defaultProtectedPaths } from "../config/package-config"

const defaultAuthConfig: Required<UserCrudAuthConfig> = {
    loginPath: defaultLoginPath,
    afterLoginRedirect: defaultLoginRedirect,
    protectedPaths: [...defaultProtectedPaths],
}

function getAuthSettings(): Required<UserCrudAuthConfig> {
    try {
        const packageConfig = getPackageConfig()

        return {
            ...defaultAuthConfig,
            ...packageConfig.auth,
        }
    } catch {
        return defaultAuthConfig
    }
}

export function getAuthConfig(): NextAuthConfig {
    const authSettings = getAuthSettings()

    return {
        secret: process.env.AUTH_SECRET,

        providers: [credentialsProvider],

        session: {
            strategy: "jwt",
        },

        pages: {
            signIn: authSettings.loginPath,
        },

        callbacks:{
            async jwt({ token, user}){
                // Persist custom user role inside JWT
                if(user){
                    token.role = user.role;
                }
                
                return token;
            },

            async session({ session, token}){
                // Expose custom fields to client session
                if(session.user){
                    session.user.id = token.sub!;
                    session.user.role = token.role as "ADMIN" | "USER"
                }

                return session
            }
        }
    }
}

export const authConfig = getAuthConfig()
