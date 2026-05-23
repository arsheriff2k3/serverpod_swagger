import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Head>
        <title>Serverpod Swagger - API Documentation for Serverpod</title>
        <meta name="description" content="Automatically generate and serve Swagger UI for your Serverpod backend. OpenAPI 3.0 specification generation with interactive documentation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar />

      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
