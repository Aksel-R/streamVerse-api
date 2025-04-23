var express = require('express');
var router = express.Router();
const { getAnimeEpisodes } = require("../../controller/anime/getAnimeEpisodes");

/* GET home page. */
router.get('/:animeId/:seasonN', async function (req, res, next) {
  const animeId = req.params.animeId;
  const seasonN = req.params.seasonN;
  
  let results = await getAnimeEpisodes(animeId, seasonN);
  res.send(results);
});

module.exports = router;
