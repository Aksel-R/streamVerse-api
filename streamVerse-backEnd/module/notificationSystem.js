const { db, admin } = require("../fireBase");

// Function to add FCM token and subscribe the user to a topic
const addFCMtoken = async (userId, fcmToken) => {
  try {
    // Save the token to Firestore (users collection)
    await db.collection('users').doc(userId).set({ fcmToken }, { merge: true });

    // Subscribe user to a topic (e.g., "streamverse-all")
    await admin.messaging().subscribeToTopic([fcmToken], 'streamverse-all');
    
    console.log(`User ${userId} subscribed to notification system.`);
  } catch (error) {
    console.error('Error adding FCM token and subscribing user:', error);
  }
};

// Function to send a notification to all users subscribed to the 'streamverse-all' topic
const sendNotification = async (title, body) => {
  const message = {
    topic: 'streamverse-all',
    notification: {
      title,
      body
    },
    android: {
      priority: 'high'
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    }
  };

  try {
    // Send the message to the topic
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// Export functions for use in routes
module.exports = { addFCMtoken, sendNotification };
