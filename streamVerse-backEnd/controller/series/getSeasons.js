require('dotenv').config();  // Make sure to load the environment variables before using them
const axios = require("axios");
const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;

// const endpoint = "https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}"


const getSeasons = async (series_id,season_number) => {


try{
  let seasons = await  axios.get(`${tmdbUrl}/tv/${series_id}/season/${season_number}?&api_key=${apiKey}`)
return seasons.data
}catch(error){
    console.log(error);
    return { error: 'Failed to fetch seasons data' };}


}

module.exports = {getSeasons}