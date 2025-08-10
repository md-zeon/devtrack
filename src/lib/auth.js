import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient(process.env.MONGODB_URI);

export const authOptions = {
	adapter: MongoDBAdapter(client),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				try {
					const usersCollection = client.db(process.env.DB_NAME).collection("users");
					
					const user = await usersCollection.findOne({
						email: credentials.email
					});

					if (!user) {
						return null;
					}

					const isValidPassword = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!isValidPassword) {
						return null;
					}

					return {
						id: user._id.toString(),
						email: user.email,
						name: user.name,
						image: user.image || null,
					};
				} catch (error) {
					console.error("Auth error:", error);
					return null;
				}
			}
		})
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
			}
			return session;
		},
		async signIn({ user, account, profile }) {
			if (account.provider === "google" || account.provider === "github") {
				try {
					const usersCollection = client.db(process.env.DB_NAME).collection("users");
					
					const existingUser = await usersCollection.findOne({
						email: user.email
					});

					if (!existingUser) {
						await usersCollection.insertOne({
							email: user.email,
							name: user.name,
							image: user.image,
							provider: account.provider,
							createdAt: new Date(),
							updatedAt: new Date(),
						});
					}
				} catch (error) {
					console.error("Sign in error:", error);
					return false;
				}
			}
			return true;
		},
	},
	pages: {
		signIn: "/login",
		signUp: "/signup",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
