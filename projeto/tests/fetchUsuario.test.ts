import axios from "axios";
import { fetchUsuario } from "../src/app/lib/fetchUsuario";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
}

describe("fetchUsuario", () => {
  it("deve retornar os dados do usuário do GitHub", async () => {
    const mockUser: GitHubUser = {
      login: "johnDoe",
      name: "John Doe",
      avatar_url: "https://example.com/avatar.jpg",
      bio: "Developer",
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });
    const username = "johnDoe";
    const user = await fetchUsuario(username);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.github.com/users/${username}`
    );
    expect(user).toEqual(mockUser);
  });

  it("deve lançar erro se a requisição falhar", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Erro ao buscar o usuário"));
    await expect(fetchUsuario("johnDoe")).rejects.toThrow("Erro ao buscar o usuário");
  });
});
