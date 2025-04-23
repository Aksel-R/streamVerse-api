require('dotenv').config();  // Make sure to load the environment variables before using them
const axios = require("axios");
const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;

const searchAnimePardise= async (query) => {
   
    
    try {
        // Making the API request using axios
        
        const response2 = await axios.get(`https://api.animeparadise.moe/search?q=${query}`);
        
     
       
        return response2.data.data
    } catch (error) {
        console.error(`Error fetching movie data: ${error}`);
        return { error: 'Failed to fetch movie data' };  // Return an error message or object
    }
};


module.exports = { searchAnimePardise };
