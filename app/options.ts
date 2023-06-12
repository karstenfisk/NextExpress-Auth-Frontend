import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";

interface CustomSession extends Session {
  token: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        const data = {
          username: credentials?.username,
          password: credentials?.password,
        };
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        // If there's an error property in user, the login failed
        if (res.ok && user) {
          return { name: user.username, email: user.email, id: user.id };
        }

        // If there's no error, return the user
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      if (token) {
        const newToken = jwt.sign(
          { id: token.id },
          process.env.NEXTAUTH_SECRET as string
        );
        customSession.token = newToken;
        return customSession;
      }
      return session;
    },
  },
};
