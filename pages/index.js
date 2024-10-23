import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>F1 Fantasy Sports Platform</title>
        <meta name="description" content="Predict the top 5 drivers, fastest lap, and side bets on a weekly basis." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to the F1 Fantasy Sports Platform!</h1>
        <p className="text-lg mb-8">Predict the top 5 drivers, fastest lap, and side bets on a weekly basis.</p>
        <div className="space-x-4">
          <Link href="/signup">
            <a className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</a>
          </Link>
          <Link href="/login">
            <a className="bg-green-500 text-white px-4 py-2 rounded">Log In</a>
          </Link>
          <Link href="/leagues">
            <a className="bg-purple-500 text-white px-4 py-2 rounded">Join Leagues</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
