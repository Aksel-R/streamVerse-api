const axios = require("axios");

const searchAnime = async (name) => {
   
    
    let body = `UserId=0&Language=AR&FilterType=SEARCH&FilterData=${name}&Type=SERIES&From=0&Token=8cnY80AZSbUCmR26Vku1VUUY4`;
console.log("fetching");


    try{
    let animefySearch = await axios.post(
        "https://animeify.net/animeify/apis_v4/anime/load_anime_list_v2.php", // Added missing URL
        body,
        {
          headers: {
            "Content-Length": body.length.toString(),
            "Content-Type": "application/x-www-form-urlencoded",
            "Expect": "100-continue",
            "Host": "animeify.net",
          }
        }
      ) 
      return animefySearch.data
}
   
    catch (error) {
        console.error(`Error fetching movie data: ${error}`);
        return { error: 'Failed to fetch movie data' };  // Return an error message or object
    }
};




module.exports = { searchAnime };
