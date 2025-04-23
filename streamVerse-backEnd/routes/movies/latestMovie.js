var express = require('express');
var router = express.Router();
const { latestMovie } = require("../../controller/movies/latestMovies");

/* GET home page. */
router.get('/latest/:pageN', async function (req, res, next) {
  let pageN = req.params.pageN
  let results = await latestMovie(pageN);
  res.send(results);
});

module.exports = router;
