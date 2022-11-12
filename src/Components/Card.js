import React,{useState} from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { arrayUnion,doc,updateDoc } from 'firebase/firestore';
import { selectUser } from '../features/userSlice';
import "./Row.css";

const Card = ({isLargeRow, movie}) => {
    const user = useSelector(selectUser);
    const [like,setLike] = useState(false);
    const [saved,setSaved] = useState(false);
    const base_url = "https://image.tmdb.org/t/p/original/";
    const movieId = doc(db,'data',`${user.email}`)

    const saveShow = async () => {
        setLike(!like);
        setSaved(true);
        await updateDoc(movieId,{
          savedShows: arrayUnion({
            id: movie.id,
            title: movie.title || movie.name,
            img: movie.backdrop_path
          })
        })
    }

  return (
    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
        <div className="poster"><img className={`row_poster ${isLargeRow && "row_large"}`} 
        key = {movie.id}
        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
        alt={movie.name} /> 
        <div className="poster_hover"> 
          <p className="movie_title">{movie?.title || movie?.name} </p>  
          <p onClick={()=>saveShow()} className="like">{like ? <FaHeart /> : <FaRegHeart /> } </p>         
        </div>
        </div>
    )
  )
}

export default Card