const express = require('express');
const router = express.Router();

const {
    addEpisodesToViewedController,
    deleteViewedEpisodeController,
    getViewedEpisodesBySeasonController,
  } = require("../../controller/series/viewedEpisodes")

  const { verifyGoogleIdToken } = require("../../middleWares/authorization");

  router.post('/add/:id/:season', verifyGoogleIdToken, async function (req, res,next) {
    const userId = req.params.id;
    const season = req.params.season;
    const episode = req.body;
  
    try {
      const response = await addEpisodesToViewedController(userId, season,episode);
      res.status(201).send(response);  // ✅ Combine status + response in one call
    } catch (error) {
      console.error("error router", error);
      res.status(500).send({ error: 'Failed to add to watchlist' });  // Send error details if needed
    }
  });
  
  router.delete("/delete/:id/:showId/:season/:episodeNumber", verifyGoogleIdToken, async function (req, res, next){
    const userId = req.params.id;
    const showId = req.params.showId;
    const season = req.params.season;
    const episodeNumber = req.params.episodeNumber;
    try{
  const response = await deleteViewedEpisodeController(userId, showId, season, episodeNumber)
  res.status(204).send(response)
  
    }catch(error){
      console.log("error deleting",204);
      
    }
  
  })
  
  router.get("/all/:userId/:showId/:season", verifyGoogleIdToken, async function(req,res,next){
  const userId = req.params.userId
  const showId = req.params.showId
  const season = req.params.season
    try{
  const response = await getViewedEpisodesBySeasonController(userId, showId, season)
  res.status(200).send(response)
    }catch(error){
      console.log(eorr);
      res.status(500)
    }
  
  })


  module.exports = router;