var express = require('express');
var router = express.Router();
const { StreamAnime } = require("../../../controller/anime/animefy/streamAnimefy");

/* GET home page. */
router.get('/ar/:query/:episode', async function (req, res, next) {
  const query = req.params.query;
  const episode = req.params.episode;
  console.log("routePass")
  let results = await StreamAnime(query,episode);
  res.send(results);
});

module.exports = router;
