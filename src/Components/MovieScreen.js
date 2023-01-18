import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import Nav from './Nav';
import "./MovieScreen.css"
import "./Banner.css"
import { useState } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const MovieScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [trailerURL, setTrailerURL] = useState("");

  const opts = {
    height: "380",
    width: "100%",
  };

  const handleClick = () =>{
    if(trailerURL){
        setTrailerURL("");
    } else{
        movieTrailer(location.state.movie?.name || location.state.movie?.title || ""
            ).then((url)=>{
                const urlParms = new URLSearchParams(new URL(url).search);
                setTrailerURL(urlParms.get('v')); 
            }).catch((error)=> console.log(error));
    }
  };

  function truncate(string,n){
    return string?.length > n ? string.substr(0,n-1) + "..." : string; 
    }

  console.log(location.state)

  return (
    <div className='movie'>
    <Nav/>
    <header className="movie_banner" style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${location.state.movie?.backdrop_path || location.state.movie?.poster_path}')`,
        backgroundPosition: "center center",
        opacity: 0.8
    }}>
    <div className="banner_contents">
        <h1 className="banner_title">
            {location.state.movie?.title || location.state.movie?.name || location.state.movie.original_title}
        </h1>
        <div className="banner_buttons">
            <button onClick = {()=>handleClick()} className="banner_button">Play</button>
            <button className="banner_button" onClick={()=>navigate("/mylist")}>My List</button>
        </div>
        <h1 className="ban_desc">
            {truncate(location.state.movie?.overview, 200 )}
        </h1>
        <div className='movie_desc'>
            <p><span>Release Date:</span>{location.state.movie?.release_date}</p>
            <p><span>Language:</span>{location.state.movie?.original_language}</p>
            <p><span>Populartity:</span>{location.state.movie.popularity}</p>
            <p><span>Votes:</span>{location.state.movie.vote_average}</p>
        </div>
    </div>
    <div className="banner_fade" />
    </header>
    {trailerURL && <YouTube videoId = {trailerURL} opts = {opts} />}
    </div>
  )
}

export default MovieScreen