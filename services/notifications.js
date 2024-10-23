const webpush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  publicVapidKey,
  privateVapidKey
);

async function sendNotification(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, payload);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

async function notifyImportantEvent(userId, event) {
  const subscription = await getUserSubscription(userId);
  if (subscription) {
    const payload = JSON.stringify({
      title: 'Important Event',
      body: event.message,
      url: event.url,
    });
    await sendNotification(subscription, payload);
  }
}

async function getUserSubscription(userId) {
  // Retrieve the user's subscription from the database
  // This is a placeholder function and should be implemented
  return null;
}

module.exports = {
  sendNotification,
  notifyImportantEvent,
};
