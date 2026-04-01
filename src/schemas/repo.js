import { z } from "zod";

export const repoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string(),
  description: z.string().nullable(),
});

export const reposSchema = z.array(repoSchema);