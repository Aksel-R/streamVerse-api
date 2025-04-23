var express = require('express');
var router = express.Router();
const { searchAnime } = require("../../../controller/anime/animefy/searchAnimefy");

/* GET home page. */
router.get('/ar/:query', async function (req, res, next) {
  const query = req.params.query;
  console.log("routePass")
  let results = await searchAnime(query);
  res.send(results);
});

module.exports = router;
