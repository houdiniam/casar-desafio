import axios from "axios";

// Função que eu faço a chamada para API local para pegas os repositórios favoritados
export async function fetchFavs() {
  const response = await axios.get("http://localhost:5000/repo");
  return response.data;
}
