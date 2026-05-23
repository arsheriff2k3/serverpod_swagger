import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function SwaggerUIOptions() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Swagger UI Route Configuration</h1>

      <p>
        The <code>SwaggerUIRoute</code> class serves Swagger UI as a route on your
        Serverpod web server. It reads <code>apispec.json</code> from disk on every
        request, so changes are reflected immediately without restarting the server.
      </p>

      <h2>Basic Setup</h2>

      <CodeBlock
        language="dart"
        code={`import 'dart:io';\nimport 'package:serverpod_swagger/serverpod_swagger.dart';\n\npod.webServer.addRoute(\n  SwaggerUIRoute(\n    Directory(Directory.current.path),\n  ),\n);`}
        fileName="server.dart"
      />

      <p>
        With no options, Swagger UI is served at <code>/swagger/</code> and loads
        the spec from <code>/swagger/apispec.json</code>.
      </p>

      <h2>Constructor Parameters</h2>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Parameter</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Default</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>projectRoot</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>Directory</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">required</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">The project root directory where <code>apispec.json</code> is located</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>mountPath</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>String</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>'/swagger/'</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">URL path where Swagger UI is served (must end with <code>/</code>)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>customSpecPath</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>String?</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>null</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Override the URL from which Swagger UI loads the spec. Defaults to <code>mountPath + 'apispec.json'</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Custom Mount Path</h2>

      <p>
        To serve Swagger UI at a different URL:
      </p>

      <CodeBlock
        language="dart"
        code={`pod.webServer.addRoute(\n  SwaggerUIRoute(\n    Directory(Directory.current.path),\n    mountPath: '/docs/',\n  ),\n);`}
        fileName="server.dart"
      />

      <p>
        The route handles redirects automatically -- visiting <code>/docs</code> redirects
        to <code>/docs/</code>.
      </p>

      <h2>Custom Spec Path</h2>

      <p>
        If you want the Swagger UI to load the spec from a different URL (e.g., served
        by a separate route or an external URL):
      </p>

      <CodeBlock
        language="dart"
        code={`pod.webServer.addRoute(\n  SwaggerUIRoute(\n    Directory(Directory.current.path),\n    customSpecPath: '/api/v1/spec.json',\n  ),\n);`}
        fileName="server.dart"
      />

      <h2>ApiSpecRoute</h2>

      <p>
        The <code>ApiSpecRoute</code> class serves just the <code>apispec.json</code> file
        at a given path, independently of the Swagger UI. This is useful when you want
        to expose the raw spec at a separate URL:
      </p>

      <CodeBlock
        language="dart"
        code={`pod.webServer.addRoute(\n  ApiSpecRoute(\n    Directory(Directory.current.path),\n  ),\n  '/apispec.json',\n);`}
        fileName="server.dart"
      />

      <h2>Swagger UI Features</h2>

      <p>
        The served Swagger UI page includes these features enabled by default:
      </p>

      <ul>
        <li><strong>Deep linking</strong> - Share URLs to specific operations</li>
        <li><strong>Operation IDs displayed</strong> - Shows the operationId for each endpoint</li>
        <li><strong>Persist authorization</strong> - Auth tokens survive page refreshes</li>
        <li><strong>Try it out enabled</strong> - The "Try it out" button is active by default</li>
        <li><strong>Credentials included</strong> - Requests include cookies/auth headers</li>
        <li><strong>OAuth2 redirect</strong> - Configured automatically based on the mount path</li>
      </ul>

      <p>
        The Swagger UI is loaded from the unpkg CDN (v5.18.2) and is not bundled with the package.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-4">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Note:</strong> The <code>apispec.json</code> file is re-read from disk on
          every request, so you can regenerate it while the server is running and see
          changes immediately in the browser.
        </p>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li>
          <Link href="/docs/configuration/openapi-generation" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            OpenAPI generation options
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration/authentication" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Configure authentication
          </Link>
        </li>
      </ul>
    </div>
  );
}
