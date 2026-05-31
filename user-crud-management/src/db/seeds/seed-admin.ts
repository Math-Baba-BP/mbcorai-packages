import { prisma } from "../client/prisma"
import { hashPassword } from "../../utils/hash"

// Seed script for development

// Creates a default admin user
async function main(){

    const existingAdmin = await prisma.uCR_User.findUnique({
        where: {
            email: "admin@test.com",
        },
    });

    if(existingAdmin){
        console.log("Admin already exists");
        return;
    }

    // Hash password before storing it.
    const password = await hashPassword("admin123");

    await prisma.uCR_User.create({
        data: {
            name: "Admin",
            email: "admin@test.com",
            password,
            role: "ADMIN",
        }
    })
    console.log("Admin user created")
}

main().catch(console.error).finally(async () => {await prisma.$disconnect()})