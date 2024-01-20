import { store } from './store.js'
import { SET_MOVIES,SET_MOVIE  } from "./movies.reducer.js";
import { moviesService } from '../services/movies.serivce.js';
// export function getActionRemoveBoard(boardId) {
//     return {
//         type: REMOVE_BOARD,
//         boardId
//     }
// }
// export function getActionAddBoard(board) {
//     return {
//         type: ADD_BOARD,
//         board
//     }
// }

// export function getActionUpdateBoard(board) {
//     return {
//         type: SET_BOARD,
//         board
//     }
// }

export async function loadMovies(studioId) {
    try {
        const movies = await moviesService.getById(studioId);

        // let filteredBoards = boards
        // if (user) {
        //     if (user.username !== 'Guest') {
        //         filteredBoards = boards.filter(board =>
        //             board.members.some(boardMember => boardMember._id === user._id)
        //         )
        //     }
        // } else {
        //     console.log('No user provided, no boards will be filtered.');
        // }

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

