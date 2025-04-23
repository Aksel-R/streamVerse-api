const {
  addToWatchLater,
  deleteFromWatchLater,
  getAllWatchLaterList,
} = require("../module/watchLater");

const addToWatchListController = async (userId, data) => {
  try {
    const response = await addToWatchLater(userId, data);
    return response;
  } catch (error) {
    console.log(error);
    return "error adding to watch later list", error;
  }
};

const deleteFromWatchLaterController = async (userId, contentId) => {
  try {
    let response = await deleteFromWatchLater(userId, contentId);
    return response;
  } catch (error) {
    console.log(error);
    return "error deleting from watch later list", error;
  }
};

const getAllWatchLaterListController = async (userId) => {
  try {
    let response = await getAllWatchLaterList(userId);
    return response;
  } catch (error) {
    console.log(error);
    return "error getting watch later list", error;
  }
};

module.exports = {
  addToWatchListController,
  deleteFromWatchLaterController,
  getAllWatchLaterListController,
};
