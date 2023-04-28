// [...nextauth].js
//

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			async authorize(credentials, req) {
				const payload = {
					email: credentials.email,
					password: credentials.password,
				};
				try {
					const url = process.env.NEXTAUTH_URL;

					const res = await fetch(url + "/api/login", {
						method: "POST",
						body: JSON.stringify(payload),
						headers: {
							"Content-Type": "application/json",
							"Accept-Language": "en-US",
						},
					});

					const user = await res.json();
					if (!res.ok) {
						// throw new Error(user.exception);
					}
					// If no error and we have user data, return it
					if (res.ok && user) {
						return user;
					}

					// Return null if user data could not be retrieved
					return null;
				} catch (e) {
					return null;
				}
			},
		}),
	],

	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) {
				//console.log(session.user)
				session.user.id = token.uid;
				(session.user.fname = token.fname),
					(session.user.lname = token.lname),
					(session.user.role = token.role);
			}
			// session.basePath = "/mirror";
			return session;
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.uid = user.id;
				(token.fname = user.fname), (token.lname = user.lname);
				token.role = user.role;
			}
			return token;
		},
	},

	// openssl rand -base64 32
	secret: "3567LZkUcpWtaNOYUh5OdDiRckn2n7pbViPR1coOc3s=",
});
