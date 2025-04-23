var express = require('express');
var router = express.Router();
const { streamMovie } = require("../../controller/movies/streamMovie");


router.get('/:query', async function (req, res, next) {
  const query = req.params.query;
  let results = await streamMovie(query);
  res.send(results);
});

module.exports = router;
