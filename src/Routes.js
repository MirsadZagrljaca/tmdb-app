import { BrowserRouter, Switch, Route} from "react-router-dom";
import "./Router.css";
import TvShows from "./Tv&Movies/TvShows";
import Movies from "./Tv&Movies/Movies";
import Meni from "./Components/Meni"
import Details from "./Popup/Details"
import DetailsTv from "./Popup/DetailsTv"
const  Routes = () => {
  return (
    <BrowserRouter>
        <Meni/>
        
        <Switch>
            <Route path= "/" exact component = {TvShows}/>
            <Route path= "/Movies" exact component={Movies}/>
             <Route path= "/Details/:movieId" exact component={Details}/>
             <Route path= "/DetailsTv/:showId" exact component={DetailsTv}/>
          </Switch>
            
        </BrowserRouter>
  );
}

export default Routes;
