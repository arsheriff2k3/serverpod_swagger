import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function SwaggerUIRoute() {
  return (
    <div className="prose dark:prose-invert">
      <h1>SwaggerUIRoute</h1>

      <p>
        The <code>SwaggerUIRoute</code> class extends Serverpod&apos;s <code>Route</code> class to serve
        a live-reloading Swagger UI and the <code>apispec.json</code> file.
      </p>

      <h2>Constructor</h2>

      <CodeBlock
        language="dart"
        code={`SwaggerUIRoute(
  Directory projectRoot, {
  String mountPath = '/swagger/',
  String? customSpecPath,
})`}
      />

      <h3>Parameters</h3>

      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>projectRoot</code></td>
            <td><code>Directory</code></td>
            <td>The root directory where <code>apispec.json</code> is located (typically <code>Directory.current</code>).</td>
          </tr>
          <tr>
            <td><code>mountPath</code></td>
            <td><code>String</code></td>
            <td>The URL path where Swagger UI is served. Must end with <code>/</code>. Default: <code>/swagger/</code></td>
          </tr>
          <tr>
            <td><code>customSpecPath</code></td>
            <td><code>String?</code></td>
            <td>Override the URL from which Swagger UI loads the API spec. If null, defaults to <code>&lt;mountPath&gt;/apispec.json</code>.</td>
          </tr>
        </tbody>
      </table>

      <h2>How It Works</h2>

      <p>The <code>handleCall</code> method handles three request types:</p>

      <ol>
        <li><strong>Spec request</strong> &mdash; Serves <code>apispec.json</code> from disk on every request (no caching) with <code>Cache-Control: no-store</code>.</li>
        <li><strong>UI request</strong> &mdash; Serves the Swagger UI HTML page (works with both <code>/swagger</code> and <code>/swagger/</code>).</li>
        <li><strong>Redirect</strong> &mdash; Redirects <code>/swagger</code> to <code>/swagger/</code> for correct relative path resolution.</li>
      </ol>

      <h2>Method Signature</h2>

      <CodeBlock
        language="dart"
        code={`@override
Future<Response> handleCall(Session session, Request request) async`}
      />

      <h2>Usage</h2>

      <h3>Default Setup</h3>

      <CodeBlock
        language="dart"
        code={`import 'dart:io';
import 'package:serverpod_swagger/serverpod_swagger.dart';

// Swagger UI at /swagger/ and /swagger
pod.webServer.addRoute(
  SwaggerUIRoute(Directory.current),
  '/swagger/**',
);
pod.webServer.addRoute(
  SwaggerUIRoute(Directory.current),
  '/swagger',
);`}
        fileName="server.dart"
        showLineNumbers={false}
      />

      <h3>Custom Path with Separate Spec Route</h3>

      <CodeBlock
        language="dart"
        code={`// Swagger UI at /docs/, spec at /apispec.json
pod.webServer.addRoute(
  SwaggerUIRoute(
    Directory.current,
    mountPath: '/docs/',
    customSpecPath: '/apispec.json',
  ),
  '/docs/**',
);

// Serve apispec.json at root
pod.webServer.addRoute(
  ApiSpecRoute(Directory.current),
  '/apispec.json',
);`}
        fileName="server.dart"
        showLineNumbers={false}
      />

      <h2>Security</h2>

      <p>
        The spec URL is JSON-encoded before being injected into the HTML to prevent XSS attacks
        via crafted <code>customSpecPath</code> values.
      </p>

      <h2>Related</h2>

      <ul>
        <li><Link href="/api-reference/cli-options">CLI Options</Link></li>
        <li><Link href="/docs/configuration/custom-paths">Custom Paths</Link></li>
      </ul>
    </div>
  );
}
