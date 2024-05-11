import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Label } from "@radix-ui/react-dropdown-menu";
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import db from "./db";
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions ={
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET, 
    session: {
      strategy: "jwt"
      
    },

    pages: {signIn: "/auth/login"},

    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            userName: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            console.log(credentials)
           if (!credentials?.userName || !credentials?.password) {
            return null
           }
            
           const existData=await db.user.findUnique({
            where: {
              userName: credentials?.userName
            }
           })
          //  console.log(existData)

           if (!existData) {
            return null
           }

           const pass=await compare(credentials.password, existData.password)
           if (!pass) {
            return null
           }
      
          //  console.log(existData)
            // Return null if user data could not be retrieved
            return {
              id: `${existData.id}`,
              name: `${existData.fullName}`,
              userName: `${existData.userName}`,
              phoneNumber: `${existData.phoneNumber}`

            }
          }
        })
      ],
      callbacks: {
        async jwt({token, user}) {
          if (user) {
            return{
              ...token,
              pnoneNumber: user.phoneNumber,

            }
          }
          return token
        },
async session({session, token}){
  return{...session,
    phoneNumber: token.phoneNumber
  }
}

        
      },


}

