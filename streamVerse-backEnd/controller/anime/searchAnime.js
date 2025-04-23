require('dotenv').config();  // Make sure to load the environment variables before using them
const axios = require("axios");
const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;

const searchAnime = async (query,pageN) => {
    console.log(`${tmdbUrl}search/tv?query=${query}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`);
    
    try {
        // Making the API request using axios
        const response = await axios.get(`${tmdbUrl}/search/tv?query=${query}&include_adult=false&language=en-US&page=${pageN}&api_key=${apiKey}`);
        const response2 = await axios.get(`https://api.animeparadise.moe/search?q=${query}`);
        
        // Returning the result from the API request
        const filteredData = response.data.results.filter(el =>{ 
          console.log(el.original_language === "ja");
          
         return el.original_language === "ja"
         
         
        } )
        console.log(response2);
        return [filteredData,response2.data];
    } catch (error) {
        console.error(`Error fetching movie data: ${error}`);
        return { error: 'Failed to fetch movie data' };  // Return an error message or object
    }
};

// let body1 = `UserId=0&Language=AR&FilterType=SEARCH&FilterData=${name}&Type=SERIES&From=0&Token=8cnY80AZSbUCmR26Vku1VUUY4`;

// let animefySearch = await axios.post(
//   "https://animeify.net/animeify/apis_v4/anime/load_anime_list_v2.php", // Added missing URL
//   body1,
//   {
//     headers: {
//       "Content-Length": body1.length.toString(),
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Expect": "100-continue",
//       "Host": "animeify.net",
//     },
//   }
// );

module.exports = { searchAnime };
