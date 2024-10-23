import { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/leaderboard';

export default function LeaderboardTable() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'descending' });

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

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 cursor-pointer" onClick={() => requestSort('rank')}>Rank</th>
            <th className="py-2 cursor-pointer" onClick={() => requestSort('username')}>User</th>
            <th className="py-2 cursor-pointer" onClick={() => requestSort('points')}>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeaderboard.map((entry, index) => (
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
