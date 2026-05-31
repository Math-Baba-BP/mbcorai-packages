import { getAuthSession } from "../auth"

// Ensure current user has admin permission
export async function requireAdmin(){
    const session = await getAuthSession()

    if(!session?.user){
        throw new Error("Unauthorized")
    }

    if(session.user.role !== "ADMIN"){
        throw new Error("Forbidden")
    }

    return session
}