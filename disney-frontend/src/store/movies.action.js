import { store } from './store.js'
import { SET_MOVIES,SET_MOVIE  } from "./movies.reducer.js";
import { moviesService } from '../services/movies.serivce.js';


export async function loadMovies(studioId) {
    try {
        const movies = await moviesService.getById(studioId);

        store.dispatch({
            type: SET_MOVIES,
            movies: movies
        })
        return movies
    } catch (err) {
        console.error('Cannot load boards', err)
        throw err
    }
}

export function setMovie(movie) {
    store.dispatch({
        type: SET_MOVIE,
        movie,
    })
    return movie
}

export async function loadSuggestions() {
    try {
        // const movies = await moviesService.getSuggestions();
        return await moviesService.getSuggestions()
        // store.dispatch({ type: SET_BOARD, board })
        // return movies
    }
    catch {
        console.log('cannot load board:', err)
        throw err
    }
}
export async function loadHomeMovies() {
    try {
        return await moviesService.getMovies()
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

export async function loadSeries() {
    try {
        return await moviesService.fetchTVSeries()
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

export async function loadTopRatedSeries() {
    try {
        return await moviesService.fetchTopRatedSeries()
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

// export async function removeBoard(boardId) {
//     try {
//         await boardService.remove(boardId)
//         store.dispatch(getActionRemoveBoard(boardId))
//     } catch (err) {
//         console.log('Cannot remove board', err)
//         throw err
//     }
// }

// export async function addBoard(board, user, txt) {

//     try {
//         const savedBoard = await boardService.save(board, user, txt)
//         store.dispatch(getActionUpdateBoard(savedBoard))

//         return savedBoard
//     } catch (err) {
//         console.log('Cannot add board', err)

//         throw err
//     }
// }

