import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 glass border-t border-white/5">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-bold gradient-text">Serverpod Swagger</span>
            </div>
            <p className="text-sm text-gray-500">
              Automatically generate OpenAPI 3.0 specs and serve interactive Swagger UI for your Serverpod backend.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Documentation</h3>
            <div className="space-y-2">
              <Link href="/docs/getting-started" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Getting Started
              </Link>
              <Link href="/docs/installation" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Installation
              </Link>
              <Link href="/api-reference" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">
                API Reference
              </Link>
              <Link href="/examples" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Examples
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Links</h3>
            <div className="space-y-2">
              <a href="https://github.com/arsheriff2k3/serverpod_swagger" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">
                GitHub
              </a>
              <a href="https://pub.dev/packages/serverpod_swagger" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">
                pub.dev
              </a>
              <a href="https://serverpod.dev" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Serverpod
              </a>
              <a href="https://swagger.io" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Swagger / OpenAPI
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Serverpod Swagger. MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
