import { useEffect, useState } from "react";
import { HomeSuggestions } from "../cmps/HomeSuggestions";
import { SideBar } from "../cmps/SideBar";
import { Studios } from "../cmps/Studios";
import { Outlet, useLocation } from 'react-router-dom';
import { loadHomeMovies, loadSuggestions } from "../store/movies.action";
import { MoviesIndex } from "./MoviesIndex";
export function Home() {
    const location = useLocation()
    const [suggestedMovies, setSuggestedMovies] = useState()
    const [homeMovies, setHomeMovies] = useState()

    useEffect(() => {
        const fetchMovies = async () => {
            const sugMovies = await loadSuggestions()
            const homMovies = await loadHomeMovies()
            setSuggestedMovies(sugMovies)
            setHomeMovies(homMovies)
        };

        if (!suggestedMovies) {
            fetchMovies();
        }
    }, [suggestedMovies]);

    const isHomePage = location.pathname === '/';

    return (
        <div className="home-page bg-[#0f1014] h-screen flex relative">
            <SideBar />
            {isHomePage ? (
                <section className="w-full ml-24 mb-6">
                    <HomeSuggestions movies={suggestedMovies} />
                    <Studios />
                    <MoviesIndex type={'Home'} movies={homeMovies} />
                </section>
            ) : (
                <Outlet />
            )}
        </div>
    )
}
