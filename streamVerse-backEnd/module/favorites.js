const { db, admin } = require("../fireBase");

const addFavorites = async (userId, data) => {
  const Id = data.id;

  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("favorites")
      .doc(String(Id))
      .set({
        addedAt: admin.firestore.FieldValue.serverTimestamp(),
        ...data,
      });

    console.log("Movie added to favorites");
  } catch (err) {
    console.error("Error saving movie", err);
    throw err;
  }
};

const deleteFromFavorites = async (userId, contentId) => {
  try {
    const docRef = db
      .collection("users")
      .doc(userId)
      .collection("favorites")
      .doc(String(contentId));

    await docRef.delete();
    console.log(
      `🗑️ Successfully deleted content (${contentId}) from favorites.`
    );
    return true;
  } catch (error) {
    console.log("❌ Error deleting content from favorites:", error);
  }
};

const getAllFavoritesList = async (userId) => {
  try {
    const docRef = await db
      .collection("users")
      .doc(userId)
      .collection("favorites")
      .get();

    const items = [];

    docRef.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    console.log(` Successfully retrived all the content from favorites.`);
    return items;
  } catch (error) {
    console.log("❌ Error fetching content from favorites:", error);
  }
};

module.exports = {
  addFavorites,
  deleteFromFavorites,
  getAllFavoritesList,
};
