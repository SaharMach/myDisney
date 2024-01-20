import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'
import axios from 'axios'

const API_KEY = '2ff60abfe88b7a06269cb368c24bb201';

export const moviesService = {

    // getUsers,
    getById,
    getSuggestions,
    getMovies
   
}
export async function getMovies() {
    
    try {
        console.log('called api');
        const endpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=2ff60abfe88b7a06269cb368c24bb201';
        const response = await axios.get(endpoint);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies', error);
        throw error;
    }
}


// async function getUsers() {
//     return httpService.get(`user`)
// }
let cachedMovies = null;

export async function getSuggestions() {
    if (cachedMovies) {
        return cachedMovies;
    }
    try {
        console.log('called api');
        const endpoint = 'https://api.themoviedb.org/3/movie/top_rated?api_key=2ff60abfe88b7a06269cb368c24bb201&language=en-US&page=1';
        const response = await axios.get(endpoint);
        cachedMovies = response.data.results;
        return cachedMovies;
    } catch (error) {
        console.error('Error fetching movies', error);
        throw error;
    }
}



async function getById(studioId) {
    const endpoints = [
        { name: 'Featured', url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=${studioId}&page=1` },
        { name: 'Top Rated', url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=${studioId}&page=2` },
        { name: 'Most Recent', url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=${studioId}&page=3` }
    ]
    try {
        const responses = await Promise.all(
            endpoints.map(endpointObj => axios.get(endpointObj.url))
        );

        let allMovies = [];
        responses.forEach(response => {
            allMovies = [...allMovies, ...response.data.results];
        });

        return allMovies;
    } catch (error) {
        console.error('Error fetching movies', error);
        throw error;
    }
}
