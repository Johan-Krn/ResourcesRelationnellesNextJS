import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				username: {
					label: "Adresse email",
					type: "text",
					placeholder: "john.doe@exemple.fr",
				},
				password: { label: "Mot de passe", type: "password" },
			},

			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied

				let id = "";
				if (
					credentials?.username !== "romain@gmail.com" &&
					credentials?.password !== "Fabric29"
				) {
					return null;
				} else {
					id = "1";
				}

				if (
					credentials?.username !== "johan@gmail.com" &&
					credentials?.password !== "Fabric29"
				) {
					return null;
				} else {
					id = "2";
				}

				const user = {
					id: id,
					name: credentials?.username,
					email: credentials?.username,
				};

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
});

export { handler as GET, handler as POST };
