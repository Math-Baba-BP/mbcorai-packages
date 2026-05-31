import { getAuthSession } from "../auth"

// Retrieve authenticated session safely
export async function getSession(){
    return getAuthSession()
}