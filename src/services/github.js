import axios from "axios";
import { userSchema } from "../schemas/user";
import { reposSchema } from "../schemas/repo";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const getUser = async (username) => {
  const response = await api.get(`/users/${username}`);
  const data = response.data;

  const parsed = userSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid user data");
  }

  return parsed.data;
};

export const getRepos = async (username, page = 1, sort = "created") => {
  const response = await api.get(
    `/users/${username}/repos?per_page=10&page=${page}&sort=${sort}`
  );

  const data = response.data;

  const parsed = reposSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid repos data");
  }

  return parsed.data;
};