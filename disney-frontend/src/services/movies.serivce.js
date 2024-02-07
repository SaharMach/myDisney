import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'
import axios from 'axios'

const API_KEY = '2ff60abfe88b7a06269cb368c24bb201'
const API_KEY2 = '5f10b53dc04ac48359b4ae9d6451091e'
export const moviesService = {

    // getUsers,
    getById,
    getSuggestions,
    getMovies
   
}
export async function getMovies() {
    const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    try {
        const response = await axios.get(endpoint);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies with API_KEY', error);
        if (isApiKeyError(error)) {
            console.log('Retrying with API_KEY2');
            const fallbackEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY2}`;
            try {
                const response = await axios.get(fallbackEndpoint);
                return response.data.results;
            } catch (fallbackError) {
                console.error('Error fetching movies with API_KEY2', fallbackError);
                throw fallbackError;
            }
        } else {
            throw error;
        }
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
    const endpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
    try {
        const response = await axios.get(endpoint);
        cachedMovies = response.data.results;
        return cachedMovies;
    } catch (error) {
        console.error('Error fetching suggestions with API_KEY', error);
        if (isApiKeyError(error)) {
            console.log('Retrying with API_KEY2');
            const fallbackEndpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY2}&language=en-US&page=1`;
            try {
                const response = await axios.get(fallbackEndpoint);
                cachedMovies = response.data.results;
                return cachedMovies;
            } catch (fallbackError) {
                console.error('Error fetching suggestions with API_KEY2', fallbackError);
                throw fallbackError;
            }
        } else {
            throw error;
        }
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

function isApiKeyError(error) {
    return error.response && error.response.status === 403;
}

