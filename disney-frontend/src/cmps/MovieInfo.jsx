import { useEffect, useState } from "react";
import { utilService } from "../services/util.service"
import { MovieTrailer } from "./MovieTrailer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { update } from "../store/user.actions";
import { useLocation } from "react-router-dom";
export function MovieInfo({ type, movie }) {
    const location = useLocation()
    console.log('entered movie info', type);
    const [toggleTrailer, setToggleTrailer] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    // const isWatchlistUrl = location.pathname.includes('/watchlist')
    const userWatchlist = user?.watchlist || [];
    let isAlreadyInWatchlist = userWatchlist.some(m => movie.id === m.id);

    function getRandomLength() {
        const randNum = utilService.getRandomIntInclusive(0, 5)
        switch (randNum) {
            case 0:
                return "1h 30m"
            case 1:
                return "1h 40m"
            case 2:
                return "1h 50m"
            case 3:
                return "2h"
            case 4:
                return "2h 10m"
            case 5:
                return "2h 30m"
        }
    }

    function handleWatchClick(ev, movie) {
        ev.stopPropagation()
        ev.preventDefault()
        navigate(`/trailer/${movie.title}`)
    };

    function handleWatchlistClick(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        if (!user) return
        console.log('watchlist');
        addToWatchlist()
    }

    async function addToWatchlist(ev) {

        let updatedUser = { ...user, watchlist: [...user.watchlist, movie] };
        await update(updatedUser);
    }
    async function removeFromWatchlist(ev, movieId) {
        ev.stopPropagation();
        ev.preventDefault();
        let updatedUser = { ...user, watchlist: user.watchlist.filter(movie => movie.id !== movieId) };
        await update(updatedUser);
    }

    console.log('checkkkkk', isAlreadyInWatchlist);
    function renderContent(type) {
        if (!type || type === 'Home') {
            return <article className="info-details" style={type === 'Home' ? { left: '0px', bottom: '2.5em' } : {}}>
                <span className="title">{movie.title}</span>
                <section className="date-time-lang">
                    <span>{movie.release_date?.slice(0, 4)}</span> ·
                    <span>{movie.original_language}</span> ·
                    <span>{getRandomLength()}</span> ·
                    <span className="age">{movie.adult ? '18+' : '12+'}</span>
                </section>
                <p>{movie.overview?.slice(0, 100)}...</p>
                <section className="info-details-btns" >
                    <Link className="watch-btn" to={`/trailer/${movie.title}`}><span class="material-symbols-outlined">
                        play_arrow
                    </span> Watch Now</Link>
                    {isAlreadyInWatchlist ?
                        <button className="watchlist-btn" onClick={(e) => removeFromWatchlist(e, movie.id)}><span class="material-symbols-outlined">
                            remove
                        </span>
                        </button>
                        :
                        <button className="watchlist-btn" onClick={(e) => handleWatchlistClick(e)}><span class="material-symbols-outlined">
                            add
                        </span>
                        </button>

                    }
                </section>
            </article>
        } else {
            return <article className="info-details-hovered" >
                <span className="title">{movie.title}</span>
                <section className="info-details-btns">
                    <button className="watch-btn" onClick={(e) => handleWatchClick(e, movie)}><span class="material-symbols-outlined">
                        play_arrow
                    </span> Watch Now</button>
                    {isAlreadyInWatchlist ? <button className="watchlist-btn" onClick={(e) => removeFromWatchlist(e, movie.id)}><span class="material-symbols-outlined">
                        remove
                    </span>
                    </button>
                        :
                        <button className="watchlist-btn" onClick={(e) => handleWatchlistClick(e)}><span class="material-symbols-outlined">
                            add
                        </span>
                        </button>
                    }
                </section>
                <section className="date-time-lang">
                    <span>{movie.release_date?.slice(0, 4)}</span> ·
                    <span>{movie.original_language}</span> ·
                    <span>{getRandomLength()}</span> ·
                    <span className="age">{movie.adult ? '18+' : '12+'}</span>
                </section>
                <p>{movie.overview.slice(0, 100)}...</p>
                {/* {isWatchlistUrl && <button onClick={(e) => removeFromWatchlist(e, movie.id)}>
                    X
                </button>
                } */}
            </article>
        }
    }
    return (
        <>
            {renderContent(type)}
            {toggleTrailer && <MovieTrailer toggleTrailer={toggleTrailer} setToggleTrailer={setToggleTrailer} />}
        </>
    )
}