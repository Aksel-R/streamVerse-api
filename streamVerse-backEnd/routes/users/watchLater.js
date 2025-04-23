const express = require('express');
const router = express.Router();
const { addToWatchListController, deleteFromWatchLaterController, getAllWatchLaterListController } = require("../../controller/watchLater");
const {verifyGoogleIdToken} = require("../../middleWares/authorization")
router.post('/add/:id', async function (req, res,next) {
  const userId = req.params.id;
  const data = req.body;

  try {
    const response = await addToWatchListController(userId, data);
    res.status(201).send(response);  // ✅ Combine status + response in one call
  } catch (error) {
    console.error("error router", error);
    res.status(500).send({ error: 'Failed to add to watchlist' });  // Send error details if needed
  }
});

router.delete("/delete/:id/:contentId", async function (req, res, next){
  const userId = req.params.id;
  const contentId = req.params.contentId;

  try{
const response = await deleteFromWatchLaterController(userId, contentId)
res.status(204).send(response)

  }catch(error){
    console.log("error deleting",204);
    
  }

})

router.get("/all/:userId", verifyGoogleIdToken,async function(req,res,next){
const userId = req.params.userId
  try{
const response = await getAllWatchLaterListController(userId)
res.status(200).send(response)
console.log(req.headers)
  }catch(error){
    console.log(error);
    res.status(500)
  }

})

module.exports = router;
