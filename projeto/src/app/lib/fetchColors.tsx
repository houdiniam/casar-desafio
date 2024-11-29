import axios from "axios";

// Função que eu faço a chamada para API para resgatar as cores das linguagens disponíveis no Github
export async function fetchColors() {
  const response = await axios.get("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
  return response.data;
}
