var express = require('express');
var router = express.Router();
const { searchAnime } = require("../../controller/anime/searchAnime");

/* GET home page. */
router.get('/:query/:pageN', async function (req, res, next) {
  const query = req.params.query;
  const pageN = req.params.pageN
  let results = await searchAnime(query,pageN);
  res.send(results);
});

module.exports = router;
