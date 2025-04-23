require('dotenv').config();  // Make sure to load the environment variables before using them
const axios = require("axios");
const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;

const getAnimeEpisodes
 = async (animeId, seasonN) => {

    
    try {
        // Making the API request using axios
        const response = await axios.get(`${tmdbUrl}/tv/${animeId}/season/${seasonN}?api_key=${apiKey}`);
        
        // Returning the result from the API request
        return response.data;
    } catch (error) {
        console.error(`Error fetching movie data: ${error}`);
        return { error: 'Failed to fetch movie data' };  // Return an error message or object
    }
};

module.exports = { getAnimeEpisodes };
