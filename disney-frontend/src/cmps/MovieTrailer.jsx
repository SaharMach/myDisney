import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
export function MovieTrailer({ toggleTrailer, setToggleTrailer }) {
    const { movieName } = useParams()
    const API_KEY = 'AIzaSyB8ifuCghBu6hu0LH7X3lNjvmnt_TRQyhc'
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        if (movieName) {
            const fetchTrailer = async () => {
                try {
                    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                        params: {
                            key: API_KEY,
                            part: 'snippet',
                            maxResults: 1,
                            q: `${movieName} trailer`
                        }
                    });

                    if (response.data.items.length > 0) {
                        setVideoId(response.data.items[0].id.videoId);
                    }
                } catch (error) {
                    console.error('Error fetching trailer:', error);
                }
            };

            fetchTrailer();
        }
    }, [movieName]);

    return (
        <div className="trailer-con">
            {videoId && <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                autoPlay
                allowFullScreen>
            </iframe>}
            <button onClick={() => setToggleTrailer(!toggleTrailer)}>X</button>
        </div>
    );
}
