import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { fetchTopRatedTvShow } from "../Apis";
import "./TvShows.css";
const TvShows = () => {
  const [topShows, setTopShows] = useState([]);
  const [results, setResults] = useState([]);
  const [input, setInput] =useState("");

  useEffect(() => {
    const fetchApi = async () => {
      setTopShows(await fetchTopRatedTvShow());
    };
    fetchApi();
  }, []);

  const topRatedList = topShows.slice(0,10).map((item, index) => {
    return (
      <div className="tvResult" key={index}>
        <div className="poster__wraper">
          <img
            src={`https://image.tmdb.org/t/p/w200${item.poster}`}
            alt={`${item.name}Poster`}
          />
          <h4 className="title">{item.name} </h4>
          <h4>{item.first_air_date}</h4>

          <Link style={{ textDecoration: "none" }} to={"/DetailsTv/" + item.id}>
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
      `https://api.themoviedb.org/3/search/tv?api_key=be09dc67261c2fd483a8de5a34c8388f&language=en-US&page=1&include_adult=false&query=${input}`
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
        
        <div className="tvShows">{topRatedList}</div>
       
      ) : (
        <div className="tvShows">
        {results.slice(10).map((tv) => (
         
          <div className="tvResult" key={tv.id}>
      <div className="poster__wraper">
        <img
          src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
          alt={`${tv.name}Poster`}
        />
        <h4 className="title">{tv.name} </h4>
        <h3>{tv.first_air_date}</h3>

        <Link style={{ textDecoration: "none" }} to={"/DetailsTv/" + tv.id}>
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

export default TvShows;
