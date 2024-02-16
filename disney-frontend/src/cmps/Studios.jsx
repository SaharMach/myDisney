import { Link } from "react-router-dom";
import disneyImg from '../assets/imgs/disney.jpeg'
import pixarImg from '../assets/imgs/pixar.jpeg'
import marvelImg from '../assets/imgs/marvel.jpeg'
import starWarsmg from '../assets/imgs/starwars.jpeg'
import nationalGeoImg from '../assets/imgs/geo.jpeg'
import starImg from '../assets/imgs/star.jpeg'
import { useState } from "react";
export function Studios() {
    const [hoveredStudioId, setHoveredStudioId] = useState(null);

    const studios = [
        {
            name: 'Disney',
            url: 'https://img10.hotstar.com/video/upload/sources/r1/cms/animations/8n6fmv_1649420240209',
            id: '3166',
            img: disneyImg
        },
        {
            name: 'Pixar',
            url: 'https://img10.hotstar.com/video/upload/sources/r1/cms/animations/kwup1_1649421095532',
            id: '3',
            img: pixarImg
        }
        ,
        {
            name: 'Marvel',
            url: 'https://img10.hotstar.com/video/upload/sources/r1/cms/animations/20ojer_1649419122712',
            id: '7505',
            img: marvelImg
        },
        {
            name: 'StarWARS',
            url: 'https://img10.hotstar.com/video/upload/sources/r1/cms/animations/ytgcex_1649421147697',
            id: '95365',
            img: starWarsmg
        },
        {
            name: 'National geo',
            url: 'https://img10.hotstar.com/video/upload/sources/r1/cms/animations/364ygx_1649419839498',
            id: '114038',
            img: nationalGeoImg
        },
        {
            name: 'Star',
            url: 'https://img10.hotstar.com/video/upload/sources/r1/cms/animations/99ovvh_1649420448021',
            id: '88699',
            img: starImg
        }

    ];


    const handleMouseEnter = (studioId) => {
        setHoveredStudioId(studioId);
    };

    const handleMouseLeave = () => {
        setHoveredStudioId(null);
    };

    return (
        <div className="studios-con grid gap-2">
            {studios.map((studio, index) => (
                <Link to={`/studio/${studio.id}`} key={index} className="relative overflow-hidden rounded w-full h-full bg-white">
                    {hoveredStudioId === studio.id ? (
                        <video
                            playsInline
                            loop
                            muted
                            preload="auto"
                            autoPlay
                            onMouseLeave={() => handleMouseLeave()}
                            className="absolute top-0 left-0 w-full h-full object-cover">
                            <source type="video/mp4" src={studio.url} />
                        </video>
                    ) : (
                        <img
                            src={studio.img}
                            alt={studio.name}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            onMouseEnter={() => handleMouseEnter(studio.id)}
                        />
                    )}
                </Link>
            ))}
        </div>
    );
}
