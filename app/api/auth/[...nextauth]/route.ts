import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Sync user to backend
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              googleId: user.id,
              profilePicture: user.image,
            }),
          });
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // On initial sign in, 'user' is available.
      // We generate the backendToken and attach it to the token object.
      if (user) {
        console.log('Generating backendToken for user:', user.email);
        token.id = user.id;
        token.email = user.email; // Ensure email is in token
        token.backendToken = jwt.sign(
          { email: user.email, id: user.id },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: '1d' }
        );
      }
      
      // Force persistence check
      if (!token.backendToken && token.email) {
         console.log('Regenerating missing backendToken for:', token.email);
         token.backendToken = jwt.sign(
          { email: token.email, id: token.id },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: '1d' }
        );
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
        (session.user as any).backendToken = token.backendToken;
        (session as any).backendToken = token.backendToken; // Also add to session root to match cart/page.tsx
        console.log('Session updated with backendToken');
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
