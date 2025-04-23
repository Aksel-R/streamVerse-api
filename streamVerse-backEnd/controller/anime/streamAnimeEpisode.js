require('dotenv').config();  // Make sure to load the environment variables before using them
const axios = require("axios");
const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;
const EMBED_URL = process.env.EMBED_URL;
const vidbinge = process.env.vidbinge;
const vidsrcUrls = process.env.VIDSRC_URLS.split(',');

const urls = [
  vidbinge + "/tv/",
  "https://vidsrc.xyz/embed/tv/",
  "https://vidsrc.xyz/embed/tv?tmdb=",
  EMBED_URL + "/embed/tv/"
].concat(vidsrcUrls);  // Merge vidsrcUrls dynamically



const streamAnimeEpisode = async (query, season, episode, name) => {

  


  
  try {
    console.log("Requesting stream...");

    // Prepare the body with dynamic AnimeId and Episode
    let body = `UserId=0&AnimeId=x${name}&Episode=${episode}&AnimeType=SERIES&Token=8cnY80AZSbUCmR26Vku1VUUY4`;
    console.log(body,body.length);
    

    let animefy = await axios.post(
      "https://animeify.net/animeify/apis_v4/anime/load_servers.php",
      body,
      {
        headers: {
          "Content-Length": body.length.toString(),
          "Content-Type": "application/x-www-form-urlencoded",
          "Expect": "100-continue",
          "Host": "animeify.net"
        }
      }
    );

    // Assuming animefy contains the data with the required `urls`
    let sources = [];
    for (let i = 0; i < urls.length; i++) {
      sources.push(urls[i] + query + "/" + season + "/" + episode);
    }

    return [sources, animefy.data];
  } catch (error) {
    console.error("Error streaming anime episode:", error);
    return [[], null]; // Return empty sources and null response in case of error
  }
};

module.exports = { streamAnimeEpisode };


