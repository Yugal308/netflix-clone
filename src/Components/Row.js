import axios from './axios';
import React,{useState,useEffect} from 'react'
import "./Row.css";
import Card from './Card';

const Row = ({title, fetchURL, isLargeRow = false}) => {
  const [movies, setMovies] = useState([]);
  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  },[fetchURL]);

 return (
    <div className="row">
        <h2>{title}</h2>
        <div className= "row_posters">
        {movies.map(
          (movie,id) => (
            <Card isLargeRow={isLargeRow} movie={movie} />
          )
        )}
        </div>
    </div>
  )
}
export default Row
