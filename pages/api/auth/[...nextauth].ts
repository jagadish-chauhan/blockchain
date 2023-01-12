import NextAuth from 'next-auth';
import { MoralisNextAuthProvider } from '@moralisweb3/next';
import connectDB from '../../../lib/connectDB';
export default NextAuth({
    providers: [MoralisNextAuthProvider()],
    // adding user info to the user session object
    callbacks: {
        async jwt({ token, user }) {
            await connectDB();

            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            (session as { user: unknown }).user = token.user;
            return session;
        },
    },
});
