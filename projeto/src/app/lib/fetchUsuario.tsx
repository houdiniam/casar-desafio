import axios from "axios";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
}

export async function fetchUsuario(username: string) {
  const response = await axios.get<GitHubUser>(`https://api.github.com/users/${username}`);
  return response.data;
}
