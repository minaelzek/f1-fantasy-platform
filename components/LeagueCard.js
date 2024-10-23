import { useState } from 'react';

export default function LeagueCard({ league, onJoin, onLeave }) {
  const [isMember, setIsMember] = useState(league.isMember);

  const handleJoin = () => {
    onJoin(league.id);
    setIsMember(true);
  };

  const handleLeave = () => {
    onLeave(league.id);
    setIsMember(false);
  };

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-bold">{league.name}</h3>
      <p className="text-sm">Members: {league.members.length}</p>
      {isMember ? (
        <button
          onClick={handleLeave}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Leave League
        </button>
      ) : (
        <button
          onClick={handleJoin}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Join League
        </button>
      )}
    </div>
  );
}
