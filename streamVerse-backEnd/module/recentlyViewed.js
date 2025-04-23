const { db, admin } = require("../fireBase");

const addToRecentlyViewed = async (userId, data) => {
  const Id = data.id;
  const docRef = db
    .collection("users")
    .doc(userId)
    .collection("recentlyViewed")
    .doc(String(Id));

  try {
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      // 🔁 Update existing document's timestamp to push it to the top
      await docRef.update({
        addedAt: admin.firestore.FieldValue.serverTimestamp(),
        ...data,
      });
      console.log("Recently viewed item updated & moved to top");
    } else {
      // ➕ Add new document
      await docRef.set({
        addedAt: admin.firestore.FieldValue.serverTimestamp(),
        ...data,
      });
      console.log("Movie added to recently viewed");
    }
  } catch (err) {
    console.error("Error saving movie", err);
    throw err;
  }
};


const deleteAllRecentlyViewed = async (userId) => {
    try {
      const collectionRef = db
        .collection("users")
        .doc(userId)
        .collection("recentlyViewed");
  
      const snapshot = await collectionRef.get();
  
      const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);
  
      console.log("🗑️ Successfully deleted all recentlyViewed items.");
      return true;
    } catch (error) {
      console.error("❌ Error deleting all recentlyViewed items:", error);
      return false;
    }
  };
  

const getAllRecentlyViewed = async (userId) => {
  try {
    const docRef = await db
      .collection("users")
      .doc(userId)
  .collection("recentlyViewed")
  .orderBy("addedAt", "desc")
  .get()

    const items = [];

    docRef.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    console.log(` Successfully retrived all the content from recently Viewed.`);
    return items;
  } catch (error) {
    console.log("❌ Error fetching content from recently Viewed:", error);
  }
};





module.exports = {
    addToRecentlyViewed,
    deleteAllRecentlyViewed,
    getAllRecentlyViewed,
};
