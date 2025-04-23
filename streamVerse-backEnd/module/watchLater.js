const { db, admin } = require("../fireBase");

const addToWatchLater = async (userId, data) => {
  const Id = data.id;

  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("wishlist")
      .doc(String(Id))
      .set({
        addedAt: admin.firestore.FieldValue.serverTimestamp(),
        ...data,
      });

    console.log("Movie added to watch later");
  } catch (err) {
    console.error("Error saving movie", err);
    throw err;
  }
};

const deleteFromWatchLater = async (userId, contentId) => {
  try {
    const docRef = db
      .collection("users")
      .doc(userId)
      .collection("wishlist")
      .doc(String(contentId));

    await docRef.delete();
    console.log(
      `🗑️ Successfully deleted content (${contentId}) from wishlist.`
    );
    return true;
  } catch (error) {
    console.log("❌ Error deleting content from wishlist:", error);
  }
};

const getAllWatchLaterList = async (userId) => {
  try {
    const docRef = await db
      .collection("users")
      .doc(userId)
      .collection("wishlist")
      .get();

    const items = [];

    docRef.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    console.log(` Successfully retrived all the content from wishlist.`);
    return items;
  } catch (error) {
    console.log("❌ Error fetching content from wishlist:", error);
  }
};

module.exports = {
  addToWatchLater,
  deleteFromWatchLater,
  getAllWatchLaterList,
};
