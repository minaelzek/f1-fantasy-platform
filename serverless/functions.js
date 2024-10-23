const { submitPrediction, getPredictions, getAllPredictions } = require('../services/prediction');
const { getLeaderboard, updateLeaderboard } = require('../services/leaderboard');

module.exports.submitPredictionHandler = async (event) => {
  const { userId, week, top5Drivers, fastestLap, sideBets } = JSON.parse(event.body);
  await submitPrediction(userId, week, top5Drivers, fastestLap, sideBets);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Prediction submitted successfully' }),
  };
};

module.exports.getPredictionsHandler = async (event) => {
  const { userId, week } = event.queryStringParameters;
  const predictions = await getPredictions(userId, week);
  return {
    statusCode: 200,
    body: JSON.stringify(predictions),
  };
};

module.exports.getAllPredictionsHandler = async (event) => {
  const { week } = event.queryStringParameters;
  const predictions = await getAllPredictions(week);
  return {
    statusCode: 200,
    body: JSON.stringify(predictions),
  };
};

module.exports.getLeaderboardHandler = async (event) => {
  const leaderboard = await getLeaderboard();
  return {
    statusCode: 200,
    body: JSON.stringify(leaderboard),
  };
};

module.exports.updateLeaderboardHandler = async (event) => {
  const { userId, points } = JSON.parse(event.body);
  await updateLeaderboard(userId, points);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Leaderboard updated successfully' }),
  };
};
