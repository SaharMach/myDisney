import { logout } from "../store/user.actions"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { MoviesIndex } from "./MoviesIndex"
export function WatchList() {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    let userWatchlist = user.watchlist

    function onLogout() {
        try {
            logout()
            navigate('/')
        } catch (err) {
            console.log(err, 'err');
            throw err
        }
    }



    return <div className="watchlist-con w-full">

        <button className="logout-btn" onClick={() => onLogout()}>
            Logout
        </button>
        <div className="watchlist">
            {userWatchlist.length > 0 ? <MoviesIndex type={'Watchlist'} movies={userWatchlist} /> :
                <span className="watchlist-txt">Add movies to your watchlist...</span>}
        </div>
    </div>
}