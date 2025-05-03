const admin = require("firebase-admin");

const subscribeOneTokenToTopic = async (token, topic) => {
  try {
    const response = await admin.messaging().subscribeToTopic([token], topic); // Pass as array
    console.log(`Successfully subscribed token to topic "${topic}":`, response);
  } catch (error) {
    console.error("Error subscribing token to topic:", error);
  }
};

const sendNotificationToTopic = async (topic, title, body, data = {}) => {
  console.log("pass");
  
  try {
    const message = {
      notification: {
        title,
        body,
      },
      data, // optional custom key-value pairs
      topic,
    };

    const response = await admin.messaging().send(message);
    console.log(`Notification sent to topic "${topic}":`, response);
  } catch (error) {
    console.error("Error sending notification to topic:", error);
  }
};


module.exports = {subscribeOneTokenToTopic, sendNotificationToTopic}