import { z } from "zod";

export const userSchema = z.object({
  login: z.string(),
  avatar_url: z.string(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  blog: z.string().nullable(),
  twitter_username: z.string().nullable(),
});