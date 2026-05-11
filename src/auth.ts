import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

// API routes
export { handler as GET, handler as POST };

// Server helper (THIS FIXES YOUR ERROR)
export const auth = () => getServerSession(authOptions);