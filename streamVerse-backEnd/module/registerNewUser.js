const { db, admin } = require("../fireBase");

// Login user (get user data)
const loginUser = async (email) => {
    console.log(email, "2025");
  
    try {
      // Query the users collection, targeting the email field inside the 'user' map
      const snapshot = await db
        .collection("users")
        .where("user.email", "==", email.toLowerCase()) // Correctly targeting the nested email field
        .limit(1)  // Limit to one result
        .get();
  
      if (snapshot.empty) {
        console.log("No user found with that email.");
        return null;
      }
  
      // Get the first document from the snapshot
      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();  // Extract user data
  console.log(userData);
  
return userData;  // Return the user data
    } catch (err) {
      console.error("Error retrieving user:", err);
      throw err;
    }
  };
  
// Add new user document
const addNewUser = async (userId, data) => {
  try {
    await db.collection("users").doc(userId).set({
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
      ...data,
    });
 console.log("Account added successfully");

return data
   
  } catch (err) {
    console.error("Error saving user:", err); // More detailed error logging
    throw err;
  }
};

module.exports = {
  addNewUser,
  loginUser,
};
