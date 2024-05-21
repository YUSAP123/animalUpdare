import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter"


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages:{
    signIn: "/auth/login"
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
     
      credentials: {
        userName: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // console.log(credentials?.userName)
        const user = await db.user.findUnique({
          where: {
            userName: credentials?.userName
          }
        })
        if (!user) {
          console.log("not found")
          return null
        }
        // console.log(user)
        const password = await  compare(credentials?.password , user.password)
        if (!password) {
          // console.log("password not match")
          return null
        }
        return {
          id: `${user?.id}`,
          name: `${user.fullName}`,
          username: `${user.userName}`,
          phoneNumber: `${user.phoneNumber}`

        }
        
      }
    })
  ],
  callbacks: {
    // async signIn({user, account, profile}) {
    //   return true
    // },
    // async redirect({url, baseUrl}) {
    //   // console.log(baseUrl)
    //   return baseUrl
    // },
   
    async jwt({token, user, account, profile, isNewUser}) {
      // console.log(user)
      // console.log(token)
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user?.username,
          phoneNumber: user?.phoneNumber
        }
      }
      return token
    },
    async session({session, token}) {
      // console.log(token)
      return {
        ...session, 
        name: token.name,
        username: token.username,
        phoneNumber: token.PhoneNumber,
        id: token.id
      }
    },
}
}