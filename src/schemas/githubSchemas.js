import { z } from "zod";

// USER
export const userSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string(),
  bio: z.string().nullable(),
  blog: z.string().nullable(),
  twitter_username: z.string().nullable(),
});

// REPO
export const repoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string(),
  description: z.string().nullable(),
});

// ARRAY DE REPOS
export const reposSchema = z.array(repoSchema);