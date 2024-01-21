import { utilService } from "../services/util.service"

export function MovieInfo({ type, movie }) {
    console.log('entered movie info', type);
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


    function renderContent(type) {
        if (!type || type === 'Home') {
            return <article className="info-details" style={type === 'Home' ? { left: '0px', bottom: '2.5em' } : {}}>
                <span className="title">{movie.title}</span>
                <section className="date-time-lang">
                    <span>{movie.release_date.slice(0, 4)}</span> ·
                    <span>{movie.original_language}</span> ·
                    <span>{getRandomLength()}</span> ·
                    <span className="age">{movie.adult ? '18+' : '12+'}</span>
                </section>
                <p>{movie.overview.slice(0, 100)}...</p>
                <section className="info-details-btns" >
                    <button className="watch-btn"><span class="material-symbols-outlined">
                        play_arrow
                    </span> Watch Now</button>
                    <button className="watchlist-btn">+</button>
                </section>
            </article>
        } else {
            return <article className="info-details-hovered" >
                <span className="title">{movie.title}</span>
                <section className="info-details-btns">
                    <button className="watch-btn"><span class="material-symbols-outlined">
                        play_arrow
                    </span> Watch Now</button>
                    <button className="watchlist-btn">+</button>
                </section>
                <section className="date-time-lang">
                    <span>{movie.release_date.slice(0, 4)}</span> ·
                    <span>{movie.original_language}</span> ·
                    <span>{getRandomLength()}</span> ·
                    <span className="age">{movie.adult ? '18+' : '12+'}</span>
                </section>
                <p>{movie.overview.slice(0, 100)}...</p>
            </article>
        }
    }
    return (
        renderContent(type)
    )
}