const express = require('express')
const router = express.Router();
const { searchAnimePardise } = require("../../../controller/anime/animeParadise/search&getEpisodes");







router.get("/search/:name", async function (req, res, next) {
   let query = req.params.name
   let data = await searchAnimePardise(query)
   res.send(data)
   
})



module.exports = router