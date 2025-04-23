const { db, admin } = require("../fireBase");

const addEpisodesToViewed = async (userId, season, episode) => {
  const showId = episode.show_id;
  const episodeNumber = episode.episode_number;

  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("Viewed_episodes")
      .doc(String(showId))
      .collection("seasons")
      .doc(String(season))
      .collection("episodes")
      .doc(String(episodeNumber))
      .set({
        addedAt: admin.firestore.FieldValue.serverTimestamp(),
        ...episode,
      });

    console.log("Movie added to recently Viewed");
  } catch (err) {
    console.error("Error saving movie", err);
    throw err;
  }
};

const deleteViewedEpisode = async (userId, showId, season, episodeNumber) => {
    const episodeRef = db
      .collection("users")
      .doc(userId)
      .collection("Viewed_episodes")
      .doc(String(showId))
      .collection("seasons")
      .doc(String(season))
      .collection("episodes")
      .doc(String(episodeNumber));
  
    try {
      await episodeRef.delete();
      console.log("Episode deleted successfully.");
    } catch (error) {
      console.error("Error deleting episode:", error);
    }
  };
  

  const getViewedEpisodesBySeason = async (userId, showId, season) => {
    const episodesRef = db
      .collection("users")
      .doc(userId)
      .collection("Viewed_episodes")
      .doc(String(showId))
      .collection("seasons")
      .doc(String(season))
      .collection("episodes");
  console.log(userId, showId, season);
  
    try {
      const snapshot = await episodesRef.get();
      
      const episodes = [];
  
      snapshot.forEach((doc) => {
        console.log(doc,"doc");
        
        episodes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
  
      return episodes;
    } catch (error) {
      console.error("Error getting viewed episodes:", error);
      return [];
    }
  };
  

  module.exports = {
    addEpisodesToViewed,
    deleteViewedEpisode,
    getViewedEpisodesBySeason,
};
