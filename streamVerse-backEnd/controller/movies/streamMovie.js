require('dotenv').config();  // Make sure to load the environment variables before using them
const axios = require("axios");
const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;
const EMBED_URL = process.env.EMBED_URL
const vidbinge= process.env.vidbinge
// const vidsrcUrl =process.env.VIDSRC_URLS
const vidsrcUrls = process.env.VIDSRC_URLS.split(',');

const urls = ["https://vidlink.pro/movie/",
   
    "https://vidsrc.xyz/embed/movie/",
    "https://vidsrc.xyz/embed/movie?tmdb=",
    EMBED_URL+"/embed/movie/"
  ];
  

  


const streamMovie = async (query) => {
    let sources = []
    for(var i=0;i<urls.length;i++){
sources.push(urls[i]+query)

    }
    console.log(sources);
   

    
  return sources
};

module.exports = { streamMovie };