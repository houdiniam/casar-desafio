import axios from "axios";

interface Repository {
    name: string;
    description: string;
    language: string;
    updated_at: string;
    id: string;
}

// Função que eu faço a chamada para API para resgatar os repositórios do user digitado.
export async function fetchRepositories(username: string) {
  const response = await axios.get<Repository[]>(`https://api.github.com/users/${username}/repos?sort=updated`);
  return response.data;
}
