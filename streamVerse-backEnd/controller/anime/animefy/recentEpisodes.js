require('dotenv').config();  // Make sure to load the environment variables before using them
const axios = require("axios");
const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;
var moment = require('moment')
const date = moment().format().slice("0",'10');
let day = date.slice("8",'10');

let startDate = date.slice("0",'8')+ (parseInt(day)-1);
let endDate = date.slice("0",'8')+ (parseInt(day)+1)

const recentEpisodes = async (pageN) => {
  
   
    try {
        // Making the API request using axios
        const response = await axios.get(`${tmdbUrl}/discover/tv?api_key=${apiKey}&with_genres=16&with_origin_country=JP&air_date.gte${startDate}&air_date.lte=${endDate}&page=${pageN}`);
       
        
        // Returning the result from the API request
        return response.data;
    } catch (error) {
        console.error(`Error fetching movie data: ${error}`);
        return { error: 'Failed to fetch movie data' };  // Return an error message or object
    }
};

module.exports = { recentEpisodes };
