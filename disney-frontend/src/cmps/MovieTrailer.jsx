export function MovieTrailer({ toggleTrailer, setToggleTrailer }) {
    return <div className="trailer-con">
        trailer here
        <button onClick={() => setToggleTrailer(!toggleTrailer)}> X</button>
    </div>
}