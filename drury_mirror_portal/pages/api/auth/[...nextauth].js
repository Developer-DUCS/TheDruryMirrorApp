// ----------------------------------------------------------------
//
// [...nextauth].js
// - Uses NextAuth npm module to authorize user on login, then stores user data in sessions
//
// ----------------------------------------------------------------
//
//

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req) {

                // Retrieve auth credentials
                let userData = {
                    username: credentials.username,
                    password: credentials.password,
                };

                let payload = JSON.stringify(userData);
                console.log("Payload: \n" + payload)

                // Set options...
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept-Language": "en-US",
                    },
                    body: payload,
                };
                
                const endpoint = "http://localhost:3000/api/contentful/LoginUser";
                //const endpoint = "/api/GetClasses";

                // 1. Fetch to backend, see if user exists and matches
                let res = await fetch(endpoint, options);

                // 2. Capture response data (should be .payload)
                let data = await res.json();

                // 3. If response is okay, return user data
                if (data.message === "Success") {
                    let user = data;
                    return user;
                }
                else{
                    return null;
                }

            }
        }),

    ],
    secret: "secret",
    pages: {
        signIn: "/Login",
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.payload = user;
            }

            return token;
        },

        async session({ session, token }) {
            session.user.payload = token.payload;

            return session;
        },
    },
});
