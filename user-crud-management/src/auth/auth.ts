import NextAuth from "next-auth"
import { getAuthConfig } from "./config"

// Single shared Auth.js instance for the entire package
const authInstance = NextAuth(getAuthConfig())

export const handlers = authInstance.handlers
export const authMiddlewareAuth = authInstance.auth

const internalAuth = authInstance.auth
const internalSignIn = authInstance.signIn
const internalSignOut = authInstance.signOut

// Retrieve authenticated session safely
export async function getAuthSession(){
    return internalAuth()
}

// Trigger credentials sign in flow
export async function login(
    email: string,
    password: string
){
    return internalSignIn("credentials",{
        email,
        password,
        redirect: false
    })
}

// Trigger user sign out flow
export async function logout(){
    return internalSignOut({
        redirect: false,
    })
}