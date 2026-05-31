import { getPrisma } from "../../server/prisma"
// Repository Layer
export class UserRepository{
    
    // Find user by email
    async findByEmail(email: string){
        return getPrisma().uCR_User.findUnique({
            where: {
                email,
            },
        });
    }

    // Find user by Id
    findById(id: string){
        return getPrisma().uCR_User.findUnique({
            where: {
                id,
            },
        });
    }

    // Create a new user
    async create(data: {
        name?: string,
        email: string,
        password: string,
        role?: "ADMIN" | "USER";
    }) {
        return getPrisma().uCR_User.create({data});
    }

    // Retrieve all users ordered by creation date
    async getAllUsers(){
        return getPrisma().uCR_User.findMany({
            orderBy: {
                createdAt: "desc",
            }
        })
    }

    // Delete user by ID
    async deleteUser(id: string){
        return getPrisma().uCR_User.delete({
            where: {
                id,
            }
        })
    }

    // Count platform admins
        async countAdmins() {
        return getPrisma().uCR_User.count({
            where: {
            role: "ADMIN",
            },
        });
    }

    // Update existing user
    async updateUser(
        id: string,
        data: {
            name?: string
            email?: string
            password?: string
            role?: "ADMIN" | "USER"
        }
    ){
        return getPrisma().uCR_User.update({
            where: {
                id,
            },
            data,
        })
    }
}