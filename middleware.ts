
import { withAuth } from "next-auth/middleware";
export type { NextRequestWithAuth } from "next-auth/middleware";
export default withAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: (param) => {
      if (param.token) return true;
      return false;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
  ]
};

