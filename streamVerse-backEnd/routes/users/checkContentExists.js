const express = require('express');
const router = express.Router();
const { checkContentExistsController, checkContentExistsInRecentController, checkContentExistsInFavoritesController } = require("../../controller/checkContentExistsController");
const { verifyGoogleIdToken } = require("../../middleWares/authorization");

router.get('/check/:id/:contentId', verifyGoogleIdToken, async function (req, res) {
  const userId = req.params.id;
  const contentId = req.params.contentId;

  try {
    const response = await checkContentExistsController(userId, contentId);
    res.status(200).send(response);  // ✅ Combine status + response in one call
  } catch (error) {
    console.error("error router", error);
    res.status(500).send({ error: 'Failed to check content' });  // Send error details if needed
  }
});

router.get('/check/recent/:id/:contentId', verifyGoogleIdToken, async function (req, res) {
  const userId = req.params.id;
  const contentId = req.params.contentId;

  try {
    const response = await checkContentExistsInRecentController(userId, contentId);
    res.status(200).send(response);  // ✅ Combine status + response in one call
  } catch (error) {
    console.error("error router", error);
    res.status(500).send({ error: 'Failed to check content' });  // Send error details if needed
  }
});

router.get('/check/favorites/:id/:contentId', verifyGoogleIdToken, async function (req, res) {
  const userId = req.params.id;
  const contentId = req.params.contentId;

  try {
    const response = await checkContentExistsInFavoritesController(userId, contentId);
    res.status(200).send(response);  // ✅ Combine status + response in one call
  } catch (error) {
    console.error("error router", error);
    res.status(500).send({ error: 'Failed to check content' });  // Send error details if needed
  }
});

module.exports = router;
