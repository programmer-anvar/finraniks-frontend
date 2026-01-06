import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// ENV SETUP
export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),

    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_TRUSTED_HOSTS: z.string().optional(),

    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  client: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(1),
  },

  // Load variables from process.env
  runtimeEnv: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_TRUSTED_HOSTS: process.env.NEXTAUTH_TRUSTED_HOSTS,

    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  },

  // Skip validation during Docker build (server vars are provided at runtime)
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
