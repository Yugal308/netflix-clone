import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { onSnapshot,doc,updateDoc } from 'firebase/firestore';
import { selectUser } from '../features/userSlice';
import "./Row.css"
import "./SavedShows.css"
import {AiOutlineClose} from "react-icons/ai";

const SavedShows = () => {
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [movies,setMovies] = useState([]);
    const user = useSelector(selectUser);
    const movieRef = doc(db,"users",`${user?.email}`);
    
    useEffect(()=>{
        onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
            setMovies(doc.data()?.savedShows);
        })
    },[user.email])

    const deleteList = async (passedId) => {
      try{
        const res = movies.filter((movie)=> movie.id !== passedId);
        await updateDoc(movieRef,{
          savedShows:res,
        });
      }catch(error){
        console.log(error);
      }
    };

    console.log(movies);

  return (
    <div className="row full">
        <h2 className="save_title">My List</h2>
        <div className= "row_posters">
          {movies.map(
            (movie,id) => (
              <div className= "poster">
              <img className="row_poster" 
              key = {movie.id}
              src={`${base_url}${movie.img}`} 
              alt={movie.title} /> 
              <div className="poster_hover"> 
                <p className="movie_title">{movie?.title} </p>  
                <p className="close" onClick={()=>deleteList(movie.id)} > <AiOutlineClose /> </p>      
              </div>
              </div>
            )
          )}
    </div>
    </div>
  )
}

export default SavedShows