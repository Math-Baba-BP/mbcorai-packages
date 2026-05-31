import bcrypt from "bcryptjs";

// Bcrypt cost factor
// Higher values increase CPU usage significantly

const SALT_ROUNDS = 12;

// Hash a plain password securely
export async function hashPassword(password: string){
    return bcrypt.hash(password, SALT_ROUNDS);
}

// Compare plain password against stored hash
export async function comparePassword(password: string, hashedPassword: string){
    return bcrypt.compare(password, hashedPassword);
}