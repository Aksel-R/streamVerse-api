const {
  addEpisodesToViewed,
  deleteViewedEpisode,
  getViewedEpisodesBySeason,
} = require("../../module/viewedEpisodes");

const addEpisodesToViewedController = async (userId, season, episode) => {
  try {
    const response = await addEpisodesToViewed(userId, season, episode);
    return response;
  } catch (error) {
    console.log(error);
    return "error adding to episode", error;
  }
};

const deleteViewedEpisodeController = async (
  userId,
  showId,
  season,
  episodeNumber
) => {
  try {
    let response = await deleteViewedEpisode(
      userId,
      showId,
      season,
      episodeNumber
    );
    return response;
  } catch (error) {
    console.log(error);
    return "error deleting from watch later list", error;
  }
};

const getViewedEpisodesBySeasonController = async (userId, showId, season) => {
  try {
    let response = await getViewedEpisodesBySeason(userId, showId, season);
    return response;
  } catch (error) {
    console.log(error);
    return "error getting watch later list", error;
  }
};

module.exports = {
  addEpisodesToViewedController,
  deleteViewedEpisodeController,
  getViewedEpisodesBySeasonController,
};
