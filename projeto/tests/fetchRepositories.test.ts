import axios from "axios";
import { fetchRepositories } from "../src/app/lib/fetchRepositories";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchRepositories", () => {
  it("deve retornar os repositórios de um usuário", async () => {
    const mockRepositories = [
      {
        name: "Repo 1",
        description: "Descrição do repositório 1",
        language: "JavaScript",
        updated_at: "2023-11-28T00:00:00Z",
        id: "123",
      },
      {
        name: "Repo 2",
        description: "Descrição do repositório 2",
        language: "TypeScript",
        updated_at: "2023-11-27T00:00:00Z",
        id: "456",
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockRepositories });

    const username = "test-user";
    const repositories = await fetchRepositories(username);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.github.com/users/${username}/repos?sort=updated`
    );
    expect(repositories).toEqual(mockRepositories);
  });
});
