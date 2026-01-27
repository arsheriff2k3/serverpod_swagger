import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
  },
  {
    title: 'Installation',
    href: '/docs/installation',
  },
  {
    title: 'Basic Usage',
    href: '/docs/basic-usage',
  },
  {
    title: 'Configuration',
    href: '/docs/configuration',
    children: [
      { title: 'OpenAPI Generation', href: '/docs/configuration/openapi-generation' },
      { title: 'Swagger UI Options', href: '/docs/configuration/swagger-ui-options' },
      { title: 'Authentication', href: '/docs/configuration/authentication' },
      { title: 'Custom Paths', href: '/docs/configuration/custom-paths' },
    ],
  },
  {
    title: 'Advanced Usage',
    href: '/docs/advanced-usage',
    children: [
      { title: 'Custom Schemas', href: '/docs/advanced-usage/custom-schemas' },
      { title: 'Response Examples', href: '/docs/advanced-usage/response-examples' },
    ],
  },
  {
    title: 'Examples',
    href: '/examples',
  },
  {
    title: 'API Reference',
    href: '/api-reference',
    children: [
      { title: 'SwaggerUIRoute', href: '/api-reference/swagger-ui-route' },
      { title: 'ServerpodSwaggerVersion', href: '/api-reference/serverpod-swagger-version' },
      { title: 'CLI Options', href: '/api-reference/cli-options' },
    ],
  },
  {
    title: 'Troubleshooting',
    href: '/docs/troubleshooting',
  },
];

const NavItemComponent: React.FC<{ item: NavItem; isActive: boolean }> = ({ item, isActive }) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const hasChildren = item.children && item.children.length > 0;
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className={`flex-1 py-2 px-3 text-sm rounded-md ${router.pathname === item.href ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
          {item.title}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block py-2 pl-4 pr-3 text-sm ${router.pathname === child.href ? 'text-primary-800 dark:text-primary-200 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-20">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isMobileSidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-10 lg:hidden ${isMobileSidebarOpen ? 'block' : 'hidden'}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileSidebarOpen(false)}></div>
        <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl">
          <div className="h-full flex flex-col py-6 overflow-y-auto">
            <div className="px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Documentation</h2>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavItemComponent
                  key={item.href}
                  item={item}
                  isActive={router.pathname.startsWith(item.href)}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
        <div className="h-full flex flex-col py-6">
          <div className="px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Documentation</h2>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <NavItemComponent
                key={item.href}
                item={item}
                isActive={router.pathname.startsWith(item.href)}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;