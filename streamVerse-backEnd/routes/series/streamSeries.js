var express = require("express");
var router = express.Router();
const { streamSeries } = require("../../controller/series/streamSeries");

router.get(
  "/:seriesId/:seasonNumber/:episodeNumber/:episodeID",
  async function (req, res, next) {
    const seriesId = req.params.seriesId;
    const seasonNumber = req.params.seasonNumber;
    const episodeNumber = req.params.episodeNumber;
    const episodeID = req.params.episodeID;
    let results = await streamSeries(
      seriesId,
      seasonNumber,
      episodeNumber,
      episodeID
    );
    res.send(results);
  }
);

module.exports = router;
