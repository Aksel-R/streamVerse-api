const { db } = require('../fireBase'); // assuming you're using firebase-admin



const checkContentExistsInRecent = async (userId, contentId) => {
  try {
    const docRef = db
      .collection('users')
      .doc(userId)
      .collection('recentlyViewed')
      .doc(String(contentId));

     
      
    const docSnap = await docRef.get();
 
    if (docSnap.exists) {
      console.log('✅ content exists in recentlyViewed:');
      console.log(docSnap._fieldsProto.status)
      return docSnap._fieldsProto.episodesStatus;
    } else {
      console.log('❌ content does NOT exist in recentlyViewed.');
      return false;
    }
  } catch (error) {
    console.error('Error checking content existence:', error);
    throw error;
  }
};

const checkContentExists = async (userId, contentId) => {
  try {
    const docRef = db
      .collection('users')
      .doc(userId)
      .collection('wishlist')
      .doc(String(contentId));

     
      
    const docSnap = await docRef.get();
 
    if (docSnap.exists) {
      console.log('✅ content exists in wishlist:');
      console.log(docSnap._fieldsProto.status)
      return true;
    } else {
      console.log('❌ content does NOT exist in wishlist.');
      return false;
    }
  } catch (error) {
    console.error('Error checking content existence:', error);
    throw error;
  }
};


const checkContentExistsInFavorites = async (userId, contentId) => {
  try {
    const docRef = db
      .collection('users')
      .doc(userId)
      .collection('favorites')
      .doc(String(contentId));

     
      
    const docSnap = await docRef.get();
 
    if (docSnap.exists) {
      console.log('✅ content exists in favorites:');
      return true;
    } else {
      console.log('❌ content does NOT exist in favorites.');
      return false;
    }
  } catch (error) {
    console.error('Error checking content existence:', error);
    throw error;
  }
};

module.exports = {checkContentExists, checkContentExistsInFavorites, checkContentExistsInRecent}