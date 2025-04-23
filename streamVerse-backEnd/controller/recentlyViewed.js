const {
    addToRecentlyViewed,
    deleteAllRecentlyViewed,
    getAllRecentlyViewed,
} = require("../module/recentlyViewed");
  
  const addToRecentlyViewedController = async (userId, data) => {
    try {
      const response = await addToRecentlyViewed(userId, data);
      return response;
    } catch (error) {
      console.log(error);
      return "error adding to Recently Viewed list", error;
    }
  };
  
  const deleteAllRecentlyViewedController = async (userId) => {
    try {
      let response = await deleteAllRecentlyViewed(userId);
      return response;
    } catch (error) {
      console.log(error);
      return "error deleting from Recently Viewed list", error;
    }
  };
  
  const getAllRecentlyViewedController = async (userId) => {
    try {
      let response = await getAllRecentlyViewed(userId);
      return response;
    } catch (error) {
      console.log(error);
      return "error getting Recently Viewed list", error;
    }
  };
  
  module.exports = {
    addToRecentlyViewedController,
    deleteAllRecentlyViewedController,
    getAllRecentlyViewedController,
  };
  