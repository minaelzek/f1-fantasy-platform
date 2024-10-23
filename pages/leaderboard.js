import { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/leaderboard';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const leaderboardData = await getLeaderboard();
        setLeaderboard(leaderboardData);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Rank</th>
            <th className="py-2">User</th>
            <th className="py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.userId} className="text-center">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{entry.username}</td>
              <td className="py-2">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
