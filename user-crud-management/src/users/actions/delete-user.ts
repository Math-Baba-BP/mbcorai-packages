"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../auth";
import { getAuthSession } from "../../auth/auth";
import { UserRepository } from "../../db/repositories/user.repository";

const userRepository =
  new UserRepository();

// Delete user securely.
export async function deleteUser(
  userId: string,
) {
  await requireAdmin();

  const session =
    await getAuthSession();

  // Prevent self deletion
  if (
    session?.user?.id === userId
  ) {
    throw new Error(
      "You cannot delete yourself",
    );
  }

  const user =
    await userRepository.findById(
      userId,
    );

  if (!user) {
    throw new Error(
      "User not found",
    );
  }

  // Prevent removing last admin
  if (user.role === "ADMIN") {
    const adminCount =
      await userRepository.countAdmins();

    if (adminCount <= 1) {
      throw new Error(
        "Cannot delete last admin",
      );
    }
  }

  await userRepository.deleteUser(
    userId,
  );

  // Refresh dashboard cache
  revalidatePath("/dashboard");
}