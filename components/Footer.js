import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">F1 Fantasy Sports</h2>
          <p>Contact us: contact@f1fantasysports.com</p>
        </div>
        <div className="flex space-x-4">
          <Link href="https://twitter.com/f1fantasysports">
            <a className="text-white">Twitter</a>
          </Link>
          <Link href="https://facebook.com/f1fantasysports">
            <a className="text-white">Facebook</a>
          </Link>
          <Link href="https://instagram.com/f1fantasysports">
            <a className="text-white">Instagram</a>
          </Link>
        </div>
        <div>
          <Link href="/terms">
            <a className="text-white">Terms of Service</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
