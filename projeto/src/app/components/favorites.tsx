import { useEffect, useState } from "react";
import { fetchFavs } from "../lib/fetchFavs";
import axios from "axios";

interface Favs {
    color: any;
}

type Favorite = {
    id: string;
    name: string;
    login: string;
    description: string;
    language: string;
    updated_at: string;
    color: string;
};

// Componente onde acontece a exibição dos favoritos
const Favoritos: React.FC<Favs> = ({ color }) => {

    const [favorites, setFavorites] = useState<Favorite[]>([]);
    useEffect(() => {
        async function fetchData() {
            const data = await fetchFavs();
            setFavorites(data);
        }
        fetchData();
    }, []);

    const remove = async (id: string) => {
        try {
            await axios.delete("http://localhost:5000/repo/" + id);
            const data = await fetchFavs();
            setFavorites(data);

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="mt-6 flex flex-col md:mx-10 md:flex-row bg-white p-6 rounded-lg shadow-lg justify-center sm:pb-10 pb-28">
            <div className="mt-6 md:mt-0 md:w-1/2 md:pl-6 -mt-5 sm:-mt-0">
                <h1 className="text-2xl font-semibold  sm:text-favorito text-gray-600 md:px-4 sm:px-0 pb-5 leading-relaxed sm:text-center">Meus favoritos</h1>

                <ul className="space-y-4">
                    {favorites.length > 0 ? (
                        favorites.map((fav: any) => (
                            <li
                                key={fav.id}
                                className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md"
                            >
                                <div>
                                    <h4 className="text-md font-bold text-gray-600">{fav.name}</h4>
                                    <p className="text-sm text-gray-600">
                                        {fav.description || "Sem descrição disponível."}
                                    </p>
                                    <div className="flex mt-3">
                                        <span className=" w-3 h-3 mt-0.5 mr-3 rounded-full" style={{ backgroundColor: color[fav.language]?.color || "" }}></span>
                                        <span className="text-xs text-gray-500 mr-7">{fav.language ? fav.language : "Sem linguagem"}</span>
                                        <span className="text-xs text-gray-500">
                                            updated in: {new Date(fav.updated_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div>

                                    <button
                                        onClick={() => remove(fav.id)}
                                        className={`inline-block p-2 mb-10 text-xs border text-gray-500 ${favorites.some((fav) => Number(fav.id) === Number(fav.id)) ? "border-favorito bg-white" : "border-0 bg-gray-200"} rounded-full`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={`${favorites.some((fav) => Number(fav.id) === Number(fav.id)) ? "#32c0c6" : "#E5E7EB"}`}
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke={`${favorites.some((fav) => Number(fav.id) === Number(fav.id)) ? "none" : "currentColor"}`}
                                            className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>

                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 flex justify-center">Nenhum favorito adicionado.</p>
                    )}
                </ul>

            </div>
        </div>
    )
}
export default Favoritos;
