var express = require('express');
var router = express.Router();
const { trendingMovies } = require("../../controller/movies/trendingMovies");

/* GET home page. */
router.get('/:time_window', async function (req, res, next) {
  const time_window = req.params.time_window;
  let results = await trendingMovies(time_window);
  res.send(results);
});

module.exports = router;
