import React, { useState } from 'react';

interface SearchInputProps {
    onSearch: (username: string) => void;
    goFavs: () => void;
    userNull: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, goFavs, userNull }) => {
    const [username, setUsername] = useState<string>('');
    const [auxMobile, setAuxMobile] = useState<boolean>(true);
    const [auxFav, setAuxFav] = useState<boolean>(false);

    const handleSearch = () => {
        if (username.trim()) {
            onSearch(username.trim());
        }
        setAuxMobile(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(username.trim());
            setAuxMobile(false);
        }
    };

    const handleFavs = () => {
        setUsername("");
        setAuxFav(true);
        goFavs();
    };

    const returnMenu = () => {
        setAuxFav(false);
        setAuxMobile(true);
        setUsername('')
        userNull();
    }

    return (
        <>
            <nav>
                <div className={`mx-auto py-4 pl-2 sm:pl-6 lg:pl-8 ${auxFav ? "hidden sm:block" : ""}`}>
                    <div className=" relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center"></div>
                        <div className="w-full max-w-sm min-w-[200px] ">
                            <div className={`relative ${auxMobile? "sm:mt-0 mt-80":""}`}>
                                <input
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    placeholder="Buscar Usuário"
                                    type="text"
                                    value={username}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <button
                                    className="absolute top-1 right-1 flex items-center rounded  py-1 px-2.5 text-sm"
                                    type="button"
                                    onClick={handleSearch}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>

                                </button>
                            </div>
                        </div>

                        <button onClick={handleFavs} className="hidden sm:block">
                            <div className="absolute cursor-pointer bg-favorito p-8 items-end inset-y-0 right-0 bg-favorito items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="relative mr-7 flex mr-2 p-1 text-white">


                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    <span>Favoritos</span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-gray/10 hidden sm:block" />


                <div className="fixed bottom-0 left-0 z-50 w-full h-24 border-t border-gray-200 block sm:hidden">
                    <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                        <button type="button" className="inline-flex flex-col items-center justify-center px-5 bg-favorito" onClick={returnMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-8 bg-favorito">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>

                        </button>
                        <button type="button" className="inline-flex flex-col items-center justify-center px-5 bg-white" onClick={handleFavs}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>

                        </button>
                    </div>
                </div>

            </nav>
        </>
    );
};

export default SearchInput;
