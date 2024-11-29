import axios from "axios";

export async function fetchColors() {
  const response = await axios.get("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
  return response.data;
}
