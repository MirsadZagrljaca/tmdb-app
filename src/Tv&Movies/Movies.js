import React, { useState, useEffect } from "react";
import { fetchTopratedMovie } from "../Apis";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./Movies.css";


const Movies = () => {
  const [topRated, setToprated] = useState([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
 

  useEffect(() => {
    const fetchApi = async () => {
      setToprated(await fetchTopratedMovie());
    };
    fetchApi();
  }, []);

  const topRatedList = topRated.slice(0, 10).map((item, index) => {
    return (
      <div className="movieResult" key={index}>
        <div className="poster__wraper">
          <img
            src={`https://image.tmdb.org/t/p/w200${item.poster}`}
            alt={`${item.title}Poster`}
          />
          <h4 className="title">{item.title} </h4>
          <h4>{item.release_date}</h4>

          <Link style={{ textDecoration: "none" }} to={"/Details/" + item.id}>
            <Button className="button">Details</Button>
          </Link>
        </div>
      </div>
    );
  });
   
  const onChange = (e) => {
    e.preventDefault();

    setInput(e.target.value);
    
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=be09dc67261c2fd483a8de5a34c8388f&language=en-US&page=1&include_adult=false&query=${input}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
    }
  


  return (
    <div className="container">
       <div className="search">
      <input value={input} onChange={onChange} type="text" placeholder="search" className="searchbox" />
    </div>
      {input.length < 4 ? (
        
        <div className="movies">{topRatedList}</div>
       
      ) : (
        <div className="movies">
        {results.slice(10).map((movie) => (
         
          <div className="movieResult" key={movie.id}>
      <div className="poster__wraper">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title}Poster`}
        />
        <h4 className="title">{movie.title} </h4>
        <h4>{movie.release_date}</h4>

        <Link style={{ textDecoration: "none" }} to={"/Details/" + movie.id}>
          <Button className="button">Details</Button>
        </Link>
      </div>
    </div>
    
        
        ))}
      </div>
      )}
    </div>
  );
};

export default Movies;
