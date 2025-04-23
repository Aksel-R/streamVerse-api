var express = require('express');
var router = express.Router();
const { recentEpisodes } = require("../../controller/anime/recentEpisodes");

/* GET home page. */
router.get('/:pageN', async function (req, res, next) {
  let pageN = req.params.pageN
  let results = await recentEpisodes(pageN);
  res.send(results);
});

module.exports = router;
