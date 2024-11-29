"use client"
import React, { useState } from 'react';
import SearchInput from '../components/search';
import UserDetails from '../components/userDetails';
import { fetchColors } from '../lib/fetchColors';
import { fetchRepositories } from '../lib/fetchRepositories';
import { fetchUsuario } from '../lib/fetchUsuario';

interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
}

interface Repository {
    name: string;
    description: string;
    language: string;
    updated_at: string;
    id: string;
}

const Home: React.FC = () => {
    // const para me auxiliar em mostrar os dados 
    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [error, setError] = useState<string>('');
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [color, setColor] = useState<[]>([]);
    const [loading, setLoading] = useState(false);
    const [showFavorites, setshowFavorites] = useState(false);
    const [nomeUser, setNomeUser] = useState<string>("");

    // Função para mostrar os repositórios favoritos
    const goFavs = async () => {
        setshowFavorites(true);
        setUserData(null);
        setRepositories([]);
        setError('');
        const colorLang = await fetchColors();
        setColor(colorLang);
    }

    // Função para pegas o user digitado, seus repositórios e a cor das linguaguens
    const fetchUser = async (username: string) => {
        setError('');
        setUserData(null);
        setRepositories([]);
        setColor([]);
        setLoading(true);
        setshowFavorites(false);
        setNomeUser(username)

        try {
            const UserResponse = await fetchUsuario(username);
            setUserData(UserResponse);
            const reposResponse = await fetchRepositories(username);
            setRepositories(reposResponse);
            const colorLang = await fetchColors();
            setColor(colorLang);
        } catch (err) {
            setError('Nenhum usuário encontrado');
        } finally {
            setLoading(false);
        }
    };

    // Função para voltar a barra de pesquisa a partir do menu disponível no mobile
    const userNull = () => {
        setUserData(null);
        setshowFavorites(false);
    }

    return (
        <div className="">
            <div className="">
                <SearchInput onSearch={fetchUser} goFavs={goFavs} userNull={userNull} />
                <UserDetails nomeUser={nomeUser} showFavorites={showFavorites} user={userData} repositories={repositories} error={error} loading={loading} color={color} />
            </div>
        </div>
    );
};

export default Home;
