
var express = require('express');
var router = express.Router();
const {seriesDetails} = require("../../controller/series/seriesDetail")

router.get('/get/:id', async function (req, res, next) {
    let id = req.params.id
    let results = await seriesDetails(id);
    res.send(results);
  });
  
  module.exports = router;