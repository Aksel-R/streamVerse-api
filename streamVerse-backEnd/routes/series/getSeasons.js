
var express = require('express');
var router = express.Router();
const {getSeasons} = require("../../controller/series/getSeasons")

router.get('/get/:id/:season_number', async function (req, res, next) {
    let id = req.params.id
    let season_number = req.params.season_number
    console.log(id,season_number);
    
    let results = await getSeasons(id,season_number);
    res.send(results);
  });
  
  module.exports = router;