import NextAuth from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import { connectToDB } from '@utils/database';
import { UserSchema } from '@models/user';

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    secret: process.env.GITHUB_SECRET,
    callbacks: {


        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
                // check if user is already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.username.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
                return true
            } catch (err) {
                console.log("Error checking if user exists: ", err.message);
                return false
            }
        }
    }
})
export { handler as GET, handler as POST };