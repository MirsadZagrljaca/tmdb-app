import axios from 'axios';

const apiKey = 'a4999a28333d1147dbac0d104526337a';
 const topratedUrl=` http://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&page=1&api_key=${apiKey}`;
const topRatedTv = `http://api.themoviedb.org/3/discover/tv?&sort_by=popularity.desc&page=1&api_key=${apiKey}`;




export const fetchTopRatedTvShow = async () =>{
    try{
        const {data} = await axios.get(topRatedTv, {
            params: {
                api_key: apiKey,
                language: "en_Us",
                page: 1
            }
        })
        const posterUrl = "https://image.tmdb.org/t/p/original/";
        const modifiedData = data['results'].map((m) =>({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            name: m['name'],
            first_air_date: m['first_air_date'],
            poster: posterUrl + m['poster_path'],
           
        }))
        return modifiedData;
    }catch(error){
        console.log(error)
    }
}




export const fetchTopratedMovie = async () => {
    try {
        const  {data}  = await axios.get(topratedUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            release_date: m['release_date']
           
           
            
        }))

        return modifiedData;
    } catch (error) {

    }
}





