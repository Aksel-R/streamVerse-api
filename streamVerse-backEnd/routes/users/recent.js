const express = require("express");
const router = express.Router();
const {
  addToRecentlyViewedController,
  deleteAllRecentlyViewedController,
  getAllRecentlyViewedController,
} = require("../../controller/recentlyViewed");
const { verifyGoogleIdToken } = require("../../middleWares/authorization");


router.post("/add/:id", verifyGoogleIdToken, async function (req, res, next) {
  const userId = req.params.id;
  const data = req.body;

  try {
    const response = await addToRecentlyViewedController(userId, data);
    res.status(201).send(response); // ✅ Combine status + response in one call
  } catch (error) {
    console.error("error router", error);
    res.status(500).send({ error: "Failed to add to watchlist" }); // Send error details if needed
  }
});

router.delete(
  "/delete/:id/",
  verifyGoogleIdToken,
  async function (req, res, next) {
    const userId = req.params.id;

    try {
      const response = await deleteAllRecentlyViewedController(userId);
      res.status(204).send(response);
    } catch (error) {
      console.log("error deleting", 204);
    }
  }
);

router.get(
  "/all/:userId",
  verifyGoogleIdToken,
  async function (req, res, next) {
    const userId = req.params.userId;
    try {
      const response = await getAllRecentlyViewedController(userId);
      res.status(200).send(response);
    } catch (error) {
      console.log(eorr);
      res.status(500);
    }
  }
);

module.exports = router;
