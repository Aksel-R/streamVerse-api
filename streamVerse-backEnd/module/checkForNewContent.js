const { db, admin } = require("../fireBase");
require("dotenv").config(); // Make sure to load the environment variables before using them
const axios = require("axios");
const moment = require("moment");
const { sendNotificationToTopic } = require("../fireBaseNotificationSystem");

const date = moment(); // current date and time
const year = date.year();

const apiKey = process.env.TMDB_API_KEY;
const tmdbUrl = process.env.TMDB_URL;

const fetchContentDetailsFromTMDB = async (id, contentType) => {
  if (!id || !contentType) {
    return;
  }

  try {
    const response = await axios.get(`${tmdbUrl}/${contentType}/${id}?&api_key=${apiKey}`);
    
    
    return response.data;
  } catch (error) {
    console.error("error:", error);
  }
};

const addRecentContentToFireStore = async (data) =>{


  try {
    await db.collection("latestContent").doc(`${data.id}`).set({
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
      data: data,
    });
    

    console.log("Content added to recent");
  } catch (err) {
    console.error("Error saving movie", err);
    throw err;
  }

}


const removeDuplicates = (arr) => {
  const seen = new Set();
  return arr.filter((el) => {
    if (!seen.has(el.tmdb_id)) {
      seen.add(el.tmdb_id);
      return true;
    }
    return false;
  });
};

const filterdata = (data) => {
  return data.filter((el) => {
    if (el.title) {
      return el.title.includes(`${year}`);
    }

    if (el.show_title) {
      return el.show_title.includes(`${year}`);
    }
  });
};

const getRecentAddedMovies = async () => {
  try {
    const response = await axios.get(
      "https://vidsrc.xyz/movies/latest/page-1.json"
    );

    const data = filterdata(response.data.result);
    const data2 = removeDuplicates(data);
    // addToRecentAddedMovies(data2)

    return data2;
  } catch (error) {
    console.log(error);
  }
};

const addToRecentAddedMovies = async (data) => {
  try {
    await db.collection("latestMovies").doc("movies").set({
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
      data: data,
    });

    console.log("Movies added to recent");
  } catch (err) {
    console.error("Error saving movie", err);
    throw err;
  }
};

const getRecentAddedEpisodes = async () => {
  try {
    const response = await axios.get(
      "https://vidsrc.me/episodes/latest/page-1.json"
    );

    const data = await filterdata(response.data.result);
    const data2 = await removeDuplicates(data);
    
    // addToRecentAddedEpisodes(data2)
    return data2;
    // addToRecentAddedEpisodes(data2)
  } catch (error) {
    console.log(error);
  }
};

const addToRecentAddedEpisodes = async (data) => {
 

  try {
    await db.collection("latestEpisodes").doc("episodes").set({
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
      data: data,
    });

    console.log("episode added to recent");
  } catch (err) {
    console.error("Error saving movie", err);
    throw err;
  }
};

const getRecentMoviesFireStore = async () => {
  try {
    const docRef = db.collection("latestMovies").doc("movies");

    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const data = docSnap.data();
      return data.data;
      // console.log(data);
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error("Error saving movie", err);
    throw err;
  }
};

const compareMovies = async () => {
  try {
    const vidsrcData = await getRecentAddedMovies();

    const firestoreData = await getRecentMoviesFireStore();

    

    const checkForNew = new Set();

    for (var i = 0; i < firestoreData.length; i++) {
      checkForNew.add(firestoreData[i].tmdb_id);
    }

    let newData = vidsrcData.filter((el) => {
      return !checkForNew.has(el.tmdb_id);
    });
    if (newData.length === 0) {
      console.log("No New movies:", newData);
      return false;
    }
    console.log("New movies:");
    for (var i = 0; i < newData.length; i++) {
     try{
      const movieDetails = await  fetchContentDetailsFromTMDB(newData[i].tmdb_id,"movie")
      const firestoreResponse = await addRecentContentToFireStore(movieDetails)


      sendNotificationToTopic(
        "streamVerseNotificationSystem",
        "New Movie " + newData[i].quality,
        `${newData[i].title} is now avialable 🎬🍿`
      );
     }catch(error){
      console.log("error in compare movies: ",error);
      
     }
    }

    newData = [];
    await addToRecentAddedMovies(vidsrcData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const getRecentEpisodesFireStore = async () => {
  try {
    const docRef = db.collection("latestEpisodes").doc("episodes");

    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const data = docSnap.data();
      
      
      return data.data;
      // console.log(data);
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error("Error saving series", err);
    throw err;
  }
};

const compareEpisodes = async () => {
  try {
    const vidsrcData = await getRecentAddedEpisodes();

    const firestoreData = await getRecentEpisodesFireStore();

    const checkForNew = new Set();

    for (var i = 0; i < firestoreData.length; i++) {
      checkForNew.add(firestoreData[i].tmdb_id);
    }

    let newData = vidsrcData.filter((el) => {
      return !checkForNew.has(el.tmdb_id);
    });
    if (newData.length === 0) {
      console.log("No New episodes:", newData);
      return false;
    }
    console.log("New episodes:");

    for (var i = 0; i < newData.length; i++) {
     try{
      const tvDetails = await  fetchContentDetailsFromTMDB(newData[i].tmdb_id,"tv")
      const firestoreResponse = await addRecentContentToFireStore(tvDetails)

      sendNotificationToTopic(
        "streamVerseNotificationSystem",
        "New Episode " + newData[i].quality,
        `Season ${newData[i].season} Episode ${newData[i].episode} of ${newData[i].show_title} is now avialable 🔥`
      );
     }catch(error){

      console.log(error);
      
     }
    }

    newData = [];

    await addToRecentAddedEpisodes(vidsrcData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRecentAddedMovies,
  getRecentAddedEpisodes,
  compareMovies,
  compareEpisodes,
};
