var express = require('express');
var router = express.Router();
const { animeDetails } = require("../../controller/anime/animeDetailes");

/* GET home page. */
router.get('/:query', async function (req, res, next) {
  const query = req.params.query;
  
  let results = await animeDetails(query);
  res.send(results);
});

module.exports = router;
