
// export const SET_BOARD = 'SET_BOARD'
// export const REMOVE_BOARD = 'REMOVE_BOARD'
// export const ADD_BOARD = 'ADD_BOARD'
// export const UPDATE_BOARD = 'UPDATE_BOARD'
// export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
// export const UNDO_UPDATE_BOARD = 'UNDO_UPDATE_BOARD'


export const SET_MOVIES = 'SET_MOVIES'
export const SET_MOVIE = 'SET_MOVIE'
const initialState = {
    movies: [],
    movie: {}
    // board: {},
    // lastRemovedBoard: null,
    // starredBoards: [],
}

export function moviesReducer(state = initialState, action) {
    let newState = state
    let movies
 
    switch (action.type) {
        case SET_MOVIES:
            newState = { ...state, movies: action.movies }
            break
        case SET_MOVIE:
            newState = { ...state, movie: action.movie }
            break
        
    
        default:
    }
    return newState
}



    // case REMOVE_BOARD:
        //     const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
        //     boards = state.boards.filter(board => board._id !== action.boardId)
        //     newState = { ...state, boards, lastRemovedBoard }
        //     break
        // case ADD_BOARD:
        //     newState = { ...state, boards: [...state.boards, action.board] }
        //     break
        // case UPDATE_BOARD:
        //     boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
        //     newState = { ...state, boards, board: { ...action.board } }
        //     break
        // case UNDO_UPDATE_BOARD:
        //     ({ lastBoard } = state)
        //     currBoard = lastBoard
        //     return { ...state, currBoard, lastBoard: null }
        // case UNDO_REMOVE_BOARD:
        //     if (state.lastRemovedBoard) {
        //         newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
        //     }
        // case SET_BOARD:
        //     newState = { ...state, board: action.board }
        //     break