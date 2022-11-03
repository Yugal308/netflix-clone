import axios from './axios';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import React,{useState,useEffect} from 'react'
import "./Row.css";
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { arrayUnion,doc,updateDoc } from 'firebase/firestore';

const Row = ({title, fetchURL, isLargeRow = false}) => {
  const user = useSelector(selectUser);
  const [like,setLike] = useState(false);
  const [saved,setSaved] = useState(false);
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const movieId = doc(db,'data',`${user.email}`)

  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  },[fetchURL]);

  const saveShow = async (movie) => {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieId,{
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title || movie.name,
          img: movie.poster_path
        })
      })
  }

 return (
    <div className="row">
        <h2>{title}</h2>
        <div className= "row_posters">
        {movies.map(
          (movie,id) => (
          ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
            <div className="poster"><img className={`row_poster ${isLargeRow && "row_large"}`} 
            key = {movie.id}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
            alt={movie.name} /> 
            <div className="poster_hover"> 
              <p className="movie_title">{movie?.title || movie?.name} </p>  
              <p onClick={()=>saveShow(movie)} className="like">{like ? <FaHeart /> : <FaRegHeart /> } </p>         
            </div>
            </div>
          ))
        )}
        </div>
    </div>
  )
}
export default Row
//onClick={saveShow(movie)}