import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        Email: { label: "email", type: "string" },
        Password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.Email || !credentials?.Password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.Email,
          },
        })

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials")
        }

        const isCorrectPass = await bcrypt.compare(
          credentials.Password,
          user.hashedPassword
        )

        if (!isCorrectPass) {
            throw new Error("Invalid credentials")
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
