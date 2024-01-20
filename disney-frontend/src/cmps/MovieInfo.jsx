import { utilService } from "../services/util.service"

export function MovieInfo({ type, movie }) {
    console.log('entered movie info');
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
    return (

        <article className="info-details" style={type === 'Home' ? { left: '0px' } : {}}>
            <span className="title">{movie.title}</span>
            <section className="date-time-lang">
                <span>{movie.release_date.slice(0, 4)}</span> ·
                <span>{movie.original_language}</span> ·
                <span>{getRandomLength()}</span> ·
                <span className="age">{movie.adult ? '18+' : '12+'}</span>
            </section>
            <p>{movie.overview.slice(0, 100)}...</p>
            <section className="info-details-btns">
                <button className="watch-btn">Watch Now</button>
                <button className="watchlist-btn">+</button>
            </section>
        </article>
    )
}