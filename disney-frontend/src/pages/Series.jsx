import React, { useEffect, useState } from "react";
import { HomeSuggestions } from "../cmps/HomeSuggestions";
import { loadTopRatedSeries, loadSeries } from '../store/movies.action';
import { MoviesIndex } from "./MoviesIndex";

export function Series() {
    const [series, setSeries] = useState([])
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopRatedSeries = async () => {
            try {
                const series = await loadTopRatedSeries();
                setTopRatedSeries(series);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        const fetchSeries = async () => {
            try {
                const series = await loadSeries();
                setSeries(series);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        }
        fetchTopRatedSeries();
        fetchSeries()
    }, [])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="series-con w-full mb-6">

            <div className="ml-24">
                <HomeSuggestions movies={topRatedSeries} />
            </div>
            <MoviesIndex movies={series} />
        </section>
    );
}
