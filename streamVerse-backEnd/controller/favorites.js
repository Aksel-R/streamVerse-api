const {
    addFavorites,
    deleteFromFavorites,
    getAllFavoritesList,
  } = require("../module/favorites");
  
  const addFavoritesController = async (userId, data) => {
    try {
      const response = await addFavorites(userId, data);
      return response;
    } catch (error) {
      console.log(error);
      return "error adding to watch later list", error;
    }
  };
  
  const deleteFromFavoritesController = async (userId, contentId) => {
    try {
      let response = await deleteFromFavorites(userId, contentId);
      return response;
    } catch (error) {
      console.log(error);
      return "error deleting from watch later list", error;
    }
  };
  
  const getAllFavoritesListController = async (userId) => {
    try {
      let response = await getAllFavoritesList(userId);
      return response;
    } catch (error) {
      console.log(error);
      return "error getting watch later list", error;
    }
  };
  
  module.exports = {
    addFavoritesController,
    deleteFromFavoritesController,
    getAllFavoritesListController,
  };
  