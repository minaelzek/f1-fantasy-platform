import { useState, useEffect } from 'react';
import { getLeagues, createLeague, inviteUser } from '../services/league';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLeagues() {
      try {
        const leaguesData = await getLeagues();
        setLeagues(leaguesData);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchLeagues();
  }, []);

  const handleCreateLeague = async (e) => {
    e.preventDefault();
    try {
      const newLeague = await createLeague(newLeagueName);
      setLeagues([...leagues, newLeague]);
      setNewLeagueName('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    try {
      await inviteUser(selectedLeague, inviteEmail);
      setInviteEmail('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Header />
      <h1 className="text-4xl font-bold mb-4">Leagues</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Create a New League</h2>
        <form onSubmit={handleCreateLeague} className="space-y-4">
          <div>
            <label htmlFor="newLeagueName" className="block text-sm font-medium text-gray-700">
              League Name
            </label>
            <input
              type="text"
              id="newLeagueName"
              value={newLeagueName}
              onChange={(e) => setNewLeagueName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create League
          </button>
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Invite User to League</h2>
        <form onSubmit={handleInviteUser} className="space-y-4">
          <div>
            <label htmlFor="selectedLeague" className="block text-sm font-medium text-gray-700">
              Select League
            </label>
            <select
              id="selectedLeague"
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>Select a league</option>
              {leagues.map((league) => (
                <option key={league.id} value={league.id}>
                  {league.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-700">
              User Email
            </label>
            <input
              type="email"
              id="inviteEmail"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Invite User
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Leagues</h2>
        <ul className="space-y-4">
          {leagues.map((league) => (
            <li key={league.id} className="border p-4 rounded-md">
              <h3 className="text-xl font-bold">{league.name}</h3>
              <p className="text-sm">Members: {league.members.length}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
