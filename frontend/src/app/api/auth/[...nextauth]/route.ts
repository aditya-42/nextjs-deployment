// app/api/auth/[...nextauth]/route.ts
import Axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/api/auth/login", 
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, profile }) {
      console.log("SignIn Callback:", { user, profile });
      
      try {
        // Prepare data for your backend API
        const userData = {
          fullName: user.name,
          email: user.email,
          role: "applicant", // Default role
          profile: user.image,
        };
        
        // Post to your create-users endpoint
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/create-users`,
          userData
        );
        
        console.log("Backend API response:", response.data);
        console.log("Response status:", response.status);
        
        // Store user email in localStorage via cookies
        // (NextAuth callbacks can't directly access localStorage)
        if (response.status === 201 || response.status === 409) {
          // 201 = Created, 409 = Already exists
          // Return true to continue the sign-in process
          return true;
        } else {
          // Something went wrong
          console.error("User creation failed:", response.data);
          return false;
        }
      } catch (error) {
        console.error("Error calling backend API:", error);
        // If user already exists, still allow sign-in
        if (error.response && error.response.status === 409) {
          return true;
        }
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      //console.log("JWT Callback:", { token, account, profile });
      if (account) {
        token.accessToken = account.access_token;

        token.user = {
          name: profile?.name,
          email: profile?.email,
          image: profile?.profile,
      }
    }
      return token;
    },

    async session({ session, token }) {
     // console.log("Session Callback:", { session, token, user });
      
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  }


};
 


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };