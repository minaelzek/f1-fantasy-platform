import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold">F1 Fantasy Sports</h1>
      </div>
      <nav className="flex items-center">
        <Link href="/">
          <a className="px-4 py-2">Home</a>
        </Link>
        <Link href="/leagues">
          <a className="px-4 py-2">Leagues</a>
        </Link>
        <Link href="/leaderboard">
          <a className="px-4 py-2">Leaderboard</a>
        </Link>
        <Link href="/predictions">
          <a className="px-4 py-2">Predictions</a>
        </Link>
        <div className="relative">
          <button onClick={toggleDropdown} className="px-4 py-2">
            Profile
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
              <Link href="/profile">
                <a className="block px-4 py-2">View Profile</a>
              </Link>
              <Link href="/settings">
                <a className="block px-4 py-2">Settings</a>
              </Link>
              <Link href="/logout">
                <a className="block px-4 py-2">Logout</a>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
