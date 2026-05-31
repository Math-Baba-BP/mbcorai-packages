import { NextResponse } from "next/server";
import type { NextMiddleware } from "next/server";
import { authMiddlewareAuth as auth } from "./auth";
import { defaultLoginPath, defaultProtectedPaths } from "../config/package-config";

type AuthMiddlewareOptions = {
  loginPath?: string;
  protectedPaths?: string[];
};

export function createAuthMiddleware(
  options?: AuthMiddlewareOptions,
): NextMiddleware {
  const loginPath =
    options?.loginPath ?? defaultLoginPath;

  const protectedPaths =
    options?.protectedPaths ?? [...defaultProtectedPaths];

  return auth((request) => {
    const isAuthenticated =
      !!request.auth;

    const pathname =
      request.nextUrl.pathname;

    const isProtectedRoute =
      protectedPaths.some((path) =>
        pathname.startsWith(path),
      );

    // Redirect unauthenticated users
    if (
      isProtectedRoute &&
      !isAuthenticated
    ) {
      return NextResponse.redirect(
        new URL(
          loginPath,
          request.url,
        ),
      );
    }

    return NextResponse.next();
  }) as unknown as NextMiddleware;
}