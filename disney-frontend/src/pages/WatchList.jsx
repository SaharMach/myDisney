import { logout } from "../store/user.actions"
import { useNavigate } from "react-router"
export function WatchList() {
    const navigate = useNavigate()

    function onLogout() {
        try {
            logout()
            navigate('/')
        } catch (err) {
            console.log(err, 'err');
            throw err
        }
    }
    return <div>
        Watchlist here
        <button onClick={() => onLogout()}>
            logout
        </button>
    </div>
}