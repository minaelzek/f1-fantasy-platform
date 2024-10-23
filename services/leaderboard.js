import { db } from './db';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

export async function getLeaderboard() {
  return await db.leaderboard.find().sort({ points: -1 });
}

export async function updateLeaderboard(userId, points) {
  await db.leaderboard.updateOne(
    { userId },
    { $inc: { points } },
    { upsert: true }
  );
  const updatedLeaderboard = await getLeaderboard();
  broadcastLeaderboardUpdate(updatedLeaderboard);
}

function broadcastLeaderboardUpdate(leaderboard) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(leaderboard));
    }
  });
}

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received: %s', message);
  });

  ws.send('Welcome to the leaderboard updates!');
});
