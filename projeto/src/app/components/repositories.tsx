import { useEffect, useState, useRef } from "react";
import { fetchFavs } from "../lib/fetchFavs";
import axios from "axios";

interface Favs {
    user: any;
    repositories: any;
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

interface Repository {
    name: string;
    description: string;
    language: string;
    updated_at: string;
    id: string;
}

// Componente onde acontece a exibição dos repositórios do usuário.
const Repositorios: React.FC<Favs> = ({ user, repositories, color }) => {

    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadMoreButtonRef = useRef<HTMLDivElement | null>(null);
    const [visibleRepos, setVisibleRepos] = useState<Repository[]>([]);
    const REPOS_PER_PAGE = 3;

    useEffect(() => {
        async function fetchData() {
            const data = await fetchFavs();
            setFavorites(data);
        }
        fetchData();
        loadMoreRepos(); // Carrega os primeiros repositórios

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreRepos();
            }
        });

        if (loadMoreButtonRef.current) {
            observer.observe(loadMoreButtonRef.current);
        }

        return () => {
            if (loadMoreButtonRef.current) {
                observer.unobserve(loadMoreButtonRef.current);
            }
        };
    }, [repositories]);

    const save = async (name: string, description: string, language: string, updated_at: any, color: string, login: string, id: string) => {
        id = id.toString();
        try {
            await axios.post("http://localhost:5000/repo", { name, description, language, updated_at, color, login, id });
            const data = await fetchFavs();
            setFavorites(data);

        } catch (error) {
            console.log(error)
        }
    }

    const remove = async (id: string) => {
        try {
            await axios.delete("http://localhost:5000/repo/" + id);
            const data = await fetchFavs();
            setFavorites(data);

        } catch (error) {
            console.log(error)
        }
    }

    const loadMoreRepos = () => {
        if (isLoading) return;
        setIsLoading(true);
        setVisibleRepos((prevRepos: Repository[]) => [
            ...prevRepos,
            ...repositories.slice(prevRepos.length, prevRepos.length + REPOS_PER_PAGE),
        ]);
        setIsLoading(false);
    };

    return (
        <div className="mt-6 flex flex-col md:mx-10 md:flex-row bg-white p-6 rounded-lg shadow-lg justify-center sm:pb-12 pb-28 -mt-5 sm:-mt-0">
            <div className="flex flex-col md:items-center md:w-1/3 md:h-2/4 border-2 rounded border-gray-200  pr-6">
                <div className="flex flex-inline sm:flex-col">
                    <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-16 h-16 sm:w-44 sm:h-44 rounded-full md:mt-12 mb-4 m-4"
                    />
                    <div className="mt-5 sm:mt-0 sm:text-center">
                        <h2 className="text-xl font-semibold text-gray-600">{user.name}</h2>
                        <p className="text-gray-600">@{user.login}</p>
                    </div>
                </div>
                <hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-gray/10 ml-5 block sm:hidden mb-2" />
                <p className="sm:text-center md:text-left text-gray-700 mt-2 md:mb-10 md:p-5 sm:my-0 sm:ml-0 ml-3 my-3">
                    {user.bio || "Este usuário não possui uma bio definida."}
                </p>
            </div>
            <div className="mt-6 md:mt-0 md:w-2/3 md:pl-6">
                <h3 className="text-2xl font-semibold text-favorito mb-4">Repositórios</h3>
                <ul className="space-y-4">
                    {visibleRepos.length > 0 ? (
                        visibleRepos.map((repo: any) => (
                            <li
                                key={repo.id}
                                className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md"
                            >
                                <div>
                                    <h4 className="text-md font-bold text-gray-600">{repo.name}</h4>
                                    <p className="text-sm text-gray-600">
                                        {repo.description || "Sem descrição disponível."}
                                    </p>
                                    <div className="flex mt-3">
                                        <span className=" w-3 h-3 mt-0.5 mr-3 rounded-full" style={{ backgroundColor: color[repo.language]?.color || "" }}></span>
                                        <span className="text-xs text-gray-500 mr-7">{repo.language ? repo.language : "Sem linguagem"}</span>
                                        <span className="text-xs text-gray-500">
                                            updated in: {new Date(repo.updated_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            favorites.some((fav) => Number(fav.id) === Number(repo.id)) ?
                                                remove(repo.id)
                                                :
                                                save(repo.name, repo.description, repo.language, repo.updated_at, color[repo.language]?.color, user.login, repo.id)
                                        }
                                        className={`inline-block p-2 mb-10 text-xs border text-gray-500 ${favorites.some((fav) => Number(fav.id) === Number(repo.id)) ? "border-favorito bg-white" : "border-0 bg-gray-200"} rounded-full`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={`${favorites.some((fav) => Number(fav.id) === Number(repo.id)) ? "#32c0c6" : "#E5E7EB"}`}
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke={`${favorites.some((fav) => Number(fav.id) === Number(repo.id)) ? "none" : "currentColor"}`}
                                            className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>

                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">Nenhum repositório encontrado.</p>
                    )}
                </ul>
                {isLoading && <p>Carregando...</p>}
                <div ref={loadMoreButtonRef} />
            </div>
        </div>
    )
}
export default Repositorios;
