var express = require('express');
var router = express.Router();
const { searchMovie } = require("../../controller/movies/searchMovie");

/* GET home page. */
router.get('/:query', async function (req, res, next) {
  const query = req.params.query;
  let results = await searchMovie(query);
  res.send(results);
});

module.exports = router;
