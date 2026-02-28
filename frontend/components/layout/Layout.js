import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

export default function Layout({ children, title = 'Learnify LMS', description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description || 'Learn anything, master everything. A modern LMS for the curious mind.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/learnify-logo.png" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
