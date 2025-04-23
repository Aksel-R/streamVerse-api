var express = require('express');
var router = express.Router();
const { recommendationsMovies } = require("../../controller/movies/recommendationsMovies");

/* GET home page. */
router.get('/:Mid', async function (req, res, next) {
    let movieId = req.params.Mid
  
  let results = await recommendationsMovies(movieId);
  res.send(results);
});

module.exports = router;
