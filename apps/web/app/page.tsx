import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>BEAST CRM</h1>
      <p><Link href="/login">Login</Link></p>
      <p><Link href="/jobs">Job Board</Link></p>
    </main>
  );
}
