import axios from "axios";

export async function fetchFavs() {
  const response = await axios.get("http://localhost:5000/repo");
  return response.data;
}
