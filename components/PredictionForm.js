import { useState } from 'react';

export default function PredictionForm() {
  const [top5Drivers, setTop5Drivers] = useState(['', '', '', '', '']);
  const [fastestLap, setFastestLap] = useState('');
  const [sideBets, setSideBets] = useState('');

  const handleDriverChange = (index, value) => {
    const newTop5Drivers = [...top5Drivers];
    newTop5Drivers[index] = value;
    setTop5Drivers(newTop5Drivers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the predictions
    console.log('Top 5 Drivers:', top5Drivers);
    console.log('Fastest Lap:', fastestLap);
    console.log('Side Bets:', sideBets);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Top 5 Drivers</label>
        {top5Drivers.map((driver, index) => (
          <input
            key={index}
            type="text"
            value={driver}
            onChange={(e) => handleDriverChange(index, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={`Driver ${index + 1}`}
          />
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Fastest Lap</label>
        <input
          type="text"
          value={fastestLap}
          onChange={(e) => setFastestLap(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Fastest Lap"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Side Bets</label>
        <input
          type="text"
          value={sideBets}
          onChange={(e) => setSideBets(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Side Bets"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Predictions
      </button>
    </form>
  );
}