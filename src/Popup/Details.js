import React, { Component } from "react";
import "./Details.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ReactPlayer from "react-player";

class Details extends Component {
  state = {
    movies: [],
    videos: [],
  };

  fetchVideos = () => {
    const movieId = this.props.match.params.movieId;
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=a4999a28333d1147dbac0d104526337a&language=en-US`
    )
      .then((res) => res.json())
      .then((vid) => {
        this.setState({ ...this.state, videos: vid.results });
      });
  };
  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=be09dc67261c2fd483a8de5a34c8388f&language=en-US&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((movies) => {
        this.setState({ ...this.state, movies: movies });
      });
    this.fetchVideos();
  }
  render() {
    const { movies, videos } = this.state;
    console.log("movies", movies);
    console.log("videos", videos);
    console.log(videos.length);
     
    const moviePhoto = movies ? (
      
      <div className="photo">
      <img
          src={`https://image.tmdb.org/t/p/w200${movies.backdrop_path}`}
          alt={`${movies.title}Poster`}
        />
      </div>
      ) : (<div>No photo</div>)
    

    const movieDetails =  movies ? (
      <div className="movieDetails">
      
        <h2>{movies.title}</h2>
        <h3>{movies.overview}</h3>
      </div>
    ) : (
      <div>No details</div>
    );

    const trailers =  videos ?(

        videos.slice(0,1).map((vid) => (
        <div className="trailer">
          <ReactPlayer
            url={"https://youtube.com/watch?v=" + vid.key}
            title="trailers"
            frameBorder="0"
          ></ReactPlayer>
        </div>
      ))):(<div>No trailers</div>)
     
  

    return (
      <div className="details">
        <Link style={{ textDecoration: "none" }} to="/Movies">
          <Button>Back</Button>
        </Link>
        <div className="contentWrap">
          {moviePhoto}
          {movieDetails}
        </div>
         <div className="trailer">
           <h2>Watch the trailer</h2>
           {trailers}
         </div>
      </div>
    );
  }
}
export default Details;
