require('dotenv').config();
const axios = require("axios");
const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;

const movieDetails = async (id) =>{
    console.log(`${tmdbUrl}/movie/${id}?&api_key=${apiKey}`);
    try{
        let  response = await axios.get(`${tmdbUrl}/movie/${id}?&api_key=${apiKey}`)
   
        
        return response.data
        
    }
catch (error){
    console.log(error);
    return { error: 'Failed to fetch movie data' }
    
}


}


module.exports = { movieDetails }