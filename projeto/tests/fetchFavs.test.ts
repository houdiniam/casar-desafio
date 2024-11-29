import axios from "axios";
import { fetchFavs } from "../src/app/lib/fetchFavs";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchFavs", () => {
    it("deve retornar os favoritos corretamente", async () => {
        const mockData = [
            {
                id: "768756392",
                name: "web-json-api",
                description: null,
                language: "JavaScript",
                updated_at: "2024-03-07T17:20:01Z",
                color: "#f1e05a",
                login: "houdiniam"
            },
            {
                id: "84110240",
                name: "estoque",
                description: "Controle de Estoque construído com PHP e MySQL, utilizando framework Code Igniter",
                language: "PHP",
                updated_at: "2021-11-29T16:31:46Z",
                color: "#4F5D95",
                login: "teste"
            }
        ];
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });
        const result = await fetchFavs();
        
        expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:5000/repo");
        expect(result).toEqual(mockData);
    });
});
