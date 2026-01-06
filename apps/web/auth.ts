
import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { cookies } from "next/headers";
import config from "./lib/config";
import { calculateExpiresAt, getCookieConfig } from "./utils/cookies";
import { env } from "./env";

// Define your NextAuth options
export const authOptions: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID!,
            clientSecret: env.GOOGLE_CLIENT_SECRET!,
            authorization: { params: { prompt: "select_account" } },
        }),
    ],

    callbacks: {
        // Called after OAuth sign-in
        async signIn({ user, account }) {
            if (account?.provider === "google" && account.access_token) {
                try {
                    const response = await axios.post(`${config.APP_URL}/auth/google-auth`, {
                        token: account.access_token,
                    });

                    const data = response.data;

                    if (data) {
                        const cookieStore = await cookies();
                        const cookieConfig: any = getCookieConfig();
                        const expiresAt = calculateExpiresAt(data.expires_in);

                        // Set all cookies
                        [
                            { key: "accessToken", value: data.access_token },
                            { key: "refreshToken", value: data.refresh_token },
                            { key: "userType", value: data.user_type || "registered" },
                            { key: "expiresAt", value: String(expiresAt) },
                        ].forEach(({ key, value }) =>
                            cookieStore?.set(cookieConfig[key]?.name, value, {
                                ...cookieConfig[key],
                                maxAge: data.expires_in,
                            })
                        );

                        if (account) {
                            // @ts-expect-error
                            account.backend_access_token = data.access_token;
                        }
                        return true;
                    }
                } catch (error: any) {
                    console.error("[NEXTAUTH] Google token exchange failed:", error.message);
                    return false;
                }
            }

            return true; // Allow other providers
        },

        // JWT callback
        async jwt({ token, account }) {
            if (account) {
                token.google_access_token = account.access_token;
                token.backend_access_token = account.backend_access_token;
            }
            return token;
        },

        // Session callback
        async session({ session, token }) {
            return {
                ...session,
                google_access_token: token.google_access_token,
                backend_access_token: token.backend_access_token,
            };
        },

        // Redirect after sign-in
        async redirect({ url, baseUrl }) {
            // Default redirect to dashboard after Google OAuth
            if (url === "/" || url === baseUrl || url === `${baseUrl}/`) {
                return `${baseUrl}/profile/dashboard`;
            }
            return url;
        },
    },

    events: {
        async signIn(message) {
            console.log("[NEXTAUTH-EVENT] SignIn:", message);
        },
    },

    pages: {
        signIn: "/account/sign-in",
        error: "/account/sign-in",
    },

    // Security & behavior
    trustHost: true,
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: env.NODE_ENV === "production",
                domain: env.NODE_ENV === "production" ? ".finranks.com" : undefined,
            },
        },
    },

    // Dev/experimental flags
    // @ts-ignore
    skipCSRFCheck: env.NODE_ENV !== "production",
    experimental: {
        enableWebAuthn: true,
    },
};

// Export the NextAuth handler
const handler = NextAuth(authOptions);
export { handler };
