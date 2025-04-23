require('dotenv').config();  // Make sure to load the environment variables before using them


//   https://vidsrc.xyz/embed/tv?tmdb=1399
//   https://vidsrc.xyz/embed/tv/1399
//   https://embed.su/embed/tv/{tmdb_id}/{season_number}/{episode_number}
  
  


const streamSeries = async (seriesId, seasonNumber,episodeNumber,episodeID) => {
    let sources = [`https://vidlink.pro/tv/${seriesId}/${seasonNumber}/${episodeNumber}`,
      `https://embed.su/embed/tv/${seriesId}/${seasonNumber}/${episodeNumber}`,
        `https://vidsrc.xyz/embed/tv/${seriesId}/${seasonNumber}-${episodeNumber}`,
        `https://vidsrc.xyz/embed/tv?tmdb=${seriesId}&season=${seasonNumber}&episode=${episodeNumber}`
    ]
  

    
  return sources
};

module.exports = { streamSeries };