const { getUserById } = require('./user');
const { getLeagueById } = require('./league');

async function sharePrediction(userId, prediction) {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const message = `${user.name} has made a new prediction: ${JSON.stringify(prediction)}`;
  // Logic to share the prediction on social media
  return { message: 'Prediction shared successfully' };
}

async function shareLeagueUpdate(leagueId, update) {
  const league = await getLeagueById(leagueId);
  if (!league) {
    throw new Error('League not found');
  }
  const message = `Update for league ${league.name}: ${update}`;
  // Logic to share the league update on social media
  return { message: 'League update shared successfully' };
}

module.exports = {
  sharePrediction,
  shareLeagueUpdate,
};
