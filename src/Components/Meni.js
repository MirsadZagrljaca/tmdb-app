import "./Meni.css";
import React from "react";
import { Link } from "react-router-dom";
import {Button} from "@material-ui/core"

const Search = () => {
  return (
    <section className="Meni">
      <div className="meni__buttons">
        
        <Link style={{textDecoration: "none"}} to="/">
        <Button>Tv Shows</Button>
        </Link>
        <Link style={{textDecoration: "none"}} to="/Movies">
        <Button>Movies</Button>
        </Link>
      </div>
    </section>
  );
}

export default Search;
