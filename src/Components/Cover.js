import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Banner.css"

const Cover = (movie) => {
    const navigate = useNavigate();
    const base_url = "https://image.tmdb.org/t/p/original/";
  return (
  <div className='Card_cover'>
        <header className="banner" style={{
        backgroundSize: "cover",
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
        }}>
    <div className="banner_contents">
    <h1 className="banner_title">
        {movie?.title || movie?.name || movie.original_title}
    </h1>
    <div className="banner_buttons">
        <button className="banner_button">Play</button>
        <button className="banner_button" onClick={()=>navigate("/mylist")}>My List</button>
    </div>
    <h1 className="banner_desc">
        {movie?.overview}
    </h1>
    </div>
    </header>
    </div> 
  )
}

export default Cover