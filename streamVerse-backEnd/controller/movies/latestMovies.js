require('dotenv').config();  // Make sure to load the environment variables before using them
const axios = require("axios");
const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;
const moment = require('moment');

const date = moment().format('YYYY-MM-DD'); // Get current date
let year = date.slice(0, 4); // Extract year
let month = parseInt(date.slice(5, 7), 10); // Extract month as an integer
let day = date.slice(8, 10); // Extract day as a string (to preserve leading zeros)

// Adjust the month while keeping the year and day unchanged
let startDate = moment(`${year}-${month}-01`).subtract(1, 'months').format('YYYY-MM') + `-${day}`;


console.log( startDate )



const latestMovie = async (pageN) => {
    console.log(`${tmdbUrl}trending/all/day?language=en-US&page=${pageN}&api_key=${apiKey}`);
    
    try {
        // Making the API request using axios
        const response = await axios.get(`${tmdbUrl}/trending/all/day?language=en-US&page=${pageN}&api_key=${apiKey}`);
       
        return response.data;
    } catch (error) {
        console.error(`Error fetching movie data: ${error}`);
        return { error: 'Failed to fetch movie data' };  // Return an error message or object
    }
};

module.exports = { latestMovie };
