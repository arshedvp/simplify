import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Phone Number',
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
      },
      async authorize(credentials) {
        if (credentials?.phoneNumber) {
          return { id: '1', phoneNumber: credentials.phoneNumber };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.phoneNumber = token.phoneNumber;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };