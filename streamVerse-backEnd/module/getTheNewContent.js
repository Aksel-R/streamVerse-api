const { db, admin } = require("../fireBase")





const getTheNewContentModule = async () => {
  try {
    // Step 1: Get all documents ordered by addedAt descending
    const snapshot = await db
      .collection("latestContent")
      .orderBy("addedAt", "desc")
      .get();

    const allDocs = [];
    snapshot.forEach(doc => {
      allDocs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Step 2: Determine if we have more than 40
    if (allDocs.length > 40) {
      const docsToDelete = allDocs.slice(40); // oldest ones
      const deletePromises = docsToDelete.map(doc =>
        db.collection("latestContent").doc(doc.id).delete()
      );
      await Promise.all(deletePromises); // delete in parallel
      console.log(`🗑️ Deleted ${docsToDelete.length} old documents`);
    }

    // Step 3: Return only the latest 40
    console.log("✅ Recently added content fetched");
    return allDocs.slice(0, 40);

  } catch (error) {
    console.error("❌ Error fetching or cleaning up content:", error);
  }
};



module.exports = {getTheNewContentModule}