import { db } from './db';
import { calculateDynamicScoring } from './scoring';

export async function submitPrediction(userId, week, top5Drivers, fastestLap, sideBets) {
  const prediction = {
    userId,
    week,
    top5Drivers,
    fastestLap,
    sideBets,
    createdAt: new Date(),
  };

  await db.predictions.insert(prediction);
  await calculateDynamicScoring(userId, week);
}

export async function getPredictions(userId, week) {
  return await db.predictions.find({ userId, week });
}

export async function getAllPredictions(week) {
  return await db.predictions.find({ week });
}
