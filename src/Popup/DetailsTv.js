import React, { Component } from "react";
import "./Details.css"
import {Link} from "react-router-dom"
import Button from "@material-ui/core/Button"
import ReactPlayer from "react-player"
class Details extends Component {
  state = {
    shows: [],
    videos: [],
  };
   
 

  fetchVideos = () => {
    
    const showId = this.props.match.params.showId;

    fetch(
      `https://api.themoviedb.org/3/tv/${showId}/videos?api_key=a4999a28333d1147dbac0d104526337a&language=en-US`
    )
    .then((res) => res.json())
    .then((vid) => {
      this.setState({ ...this.state, videos: vid.results});
    });
  };
  componentDidMount(){
    
    const showId = this.props.match.params.showId;
    fetch(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=be09dc67261c2fd483a8de5a34c8388f&language=en-US&page=1&include_adult=false`
    )
    .then((res) => res.json())
    .then((shows) => {
      this.setState({ ...this.state, shows: shows });
    });
    this.fetchVideos();
  }
  render() {
     
      
      const {shows, videos} = this.state;
      console.log("shows",shows);
      console.log("videos", videos);
      const showPhoto = shows ? (
          <div className="photo">
              <img src={`https://image.tmdb.org/t/p/w200${shows.poster_path}`} alt={`${shows.title}Poster`}/>

          </div>
      ):(<div></div>)
      const showDetails = shows ? (
          <div className="movieDetails">
              <h2>{shows.name}</h2>
              <h3>{shows.overview}</h3>
          </div>
      ):(<div></div>)

      const trailers = videos ?(
        videos.slice(0,1).map(vid =>(
          
            <div className="trailer">
                <ReactPlayer url={"https://youtube.com/watch?v="+ vid.key} 
                title="trailers"
                frameBorder= "0">

                </ReactPlayer>
            </div>
            
        ))  
        
        ) : (<div>No trailer</div>)

      
      
    return <div className="details" >
        <Link style={{textDecoration: "none"}}to="/">
        <Button>
            Back
        </Button>
        </Link>
        <div className="contentWrap">
        {showPhoto}
        {showDetails}
        </div>
     <div className="trailer">
       <h2>Watch the trailer</h2>
       {trailers}
     </div>
    </div>
    
  }
}
export default Details;