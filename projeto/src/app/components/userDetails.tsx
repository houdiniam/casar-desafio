"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import lupa from '../../img/lupa.png'
import notFound from '../../img/notFound.svg'
import { fetchFavs } from '../lib/fetchFavs';
import Favorite from './favorites';
import Repositorios from './repositories';

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

interface UserDetailsProps {
    user: GitHubUser | null;
    repositories: Repository[];
    error: string;
    color: any;
    loading: any;
    showFavorites: any;
    nomeUser: string;
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

// Componente onde acontece a exibição de todas as informações, baseado em que state tá preenchido e em qual foi a ação do user
const UserDetails: React.FC<UserDetailsProps> = ({ user, repositories, error, color, loading, showFavorites, nomeUser }) => {

    if (error) {
        return (
            <div className="max-w-5xl mx-auto mt-12 px-4 sm:text-left text-center grid justify-center">
                <div className="w-full max-w-3xl mx-auto text-gray-600 text-center -mt-10 sm:-mt-0">
                    <h3 className="text-2xl semi-bold mt-2 text-favorito">"{nomeUser}"</h3>
                    <h3 className="text-2xl font-bold mt-2">{error}</h3>
                    <p className="md:px-4 sm:px-0 leading-relaxed">Verifique se a escrita está correta ou tente novamente</p>
                    <div className="ml-6 max-sm:hidden">
                        <Image
                            src={notFound}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            priority
                        />
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center mt-20">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!user && !showFavorites) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:text-left md:text-center grid justify-center">
                <div className="w-full max-w-3xl mx-auto -mt-12 sm:-mt-0 text-gray-600 ">
                    <h3 className="text-2xl font-bold mt-0 sm:mt-2">Procure pelo Nome ou Nome de Usuário</h3>
                    <p className="md:px-4 sm:px-0 leading-relaxed">Encontre os repositórios de algum  usuário digitando no campo acima</p>
                    <div className="ml-6 max-sm:hidden">
                        <Image
                            src={lupa}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            priority
                        />
                    </div>
                </div>
            </div>
        )
    }

    if (user) {
        return (
            <Repositorios user={user} repositories={repositories} color={color}/>
        );
    }
    if (showFavorites && !user) {
        return (
            <Favorite color={color} />
        )
    }
};

export default UserDetails;
