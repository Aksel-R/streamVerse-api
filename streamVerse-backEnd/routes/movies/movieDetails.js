var express = require('express');
var router = express.Router();
const {movieDetails} = require("../../controller/movies/movieDetails")

router.get('/get/:id', async function (req, res, next) {
    let id = req.params.id
    let results = await movieDetails(id);
    res.send(results);
  });
  
  module.exports = router;