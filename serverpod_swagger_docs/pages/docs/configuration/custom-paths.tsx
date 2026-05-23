import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function CustomPaths() {
    return (
        <div className="prose dark:prose-invert">
            <h1>Custom Mount Paths</h1>

            <p>
                By default, Swagger UI is mounted at <code>/swagger/</code>, but you can
                customize this to any path. You can also serve the <code>apispec.json</code>{" "}
                file at a separate location using <code>ApiSpecRoute</code>.
            </p>

            <h2>Default Configuration</h2>

            <CodeBlock
                language="dart"
                code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(args, Protocol(), Endpoints());

  // Default setup - Swagger UI at /swagger/
  final swaggerRoute = SwaggerUIRoute(Directory.current);
  pod.webServer.addRoute(swaggerRoute, '/swagger/**');
  pod.webServer.addRoute(swaggerRoute, '/swagger');

  await pod.start();
}`}
                fileName="server.dart"
            />

            <p>With this configuration:</p>

            <ul>
                <li>Swagger UI is available at: <code>http://localhost:8082/swagger/</code></li>
                <li>API spec is loaded from: <code>http://localhost:8082/swagger/apispec.json</code></li>
            </ul>

            <h2>Custom Mount Path</h2>

            <p>
                Use the <code>mountPath</code> parameter to serve Swagger UI at a
                different path. Make sure the route pattern matches.
            </p>

            <CodeBlock
                language="dart"
                code={`void run(List<String> args) async {
  final pod = Serverpod(args, Protocol(), Endpoints());

  // Swagger UI at /api/docs/
  final swaggerRoute = SwaggerUIRoute(
    Directory.current,
    mountPath: '/api/docs/',
  );
  pod.webServer.addRoute(swaggerRoute, '/api/docs/**');
  pod.webServer.addRoute(swaggerRoute, '/api/docs');

  await pod.start();
}`}
                fileName="server.dart"
            />

            <p>With this configuration:</p>

            <ul>
                <li>Swagger UI is available at: <code>http://localhost:8082/api/docs/</code></li>
                <li>API spec is loaded from: <code>http://localhost:8082/api/docs/apispec.json</code></li>
            </ul>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-4">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>Important:</strong> The <code>mountPath</code> must end with a
                    trailing slash (<code>/</code>). The route pattern must include both
                    the wildcard (<code>/api/docs/**</code>) and the base path (<code>/api/docs</code>).
                </p>
            </div>

            <h2>Custom API Specification Path</h2>

            <p>
                To serve <code>apispec.json</code> at a different URL (e.g., at the root
                instead of under the mount path), use the <code>customSpecPath</code>{" "}
                parameter together with an <code>ApiSpecRoute</code>.
            </p>

            <CodeBlock
                language="dart"
                code={`void run(List<String> args) async {
  final pod = Serverpod(args, Protocol(), Endpoints());
  final projectRoot = Directory.current;

  // Swagger UI at /api/docs/, spec at /apispec.json
  final swaggerRoute = SwaggerUIRoute(
    projectRoot,
    mountPath: '/api/docs/',
    customSpecPath: '/apispec.json',
  );
  pod.webServer.addRoute(swaggerRoute, '/api/docs/**');
  pod.webServer.addRoute(swaggerRoute, '/api/docs');

  // Serve apispec.json at the root
  final apiSpecRoute = ApiSpecRoute(projectRoot);
  pod.webServer.addRoute(apiSpecRoute, '/apispec.json');

  await pod.start();
}`}
                fileName="server.dart"
            />

            <p>With this configuration:</p>

            <ul>
                <li>Swagger UI is available at: <code>http://localhost:8082/api/docs/</code></li>
                <li>API spec is loaded from: <code>http://localhost:8082/apispec.json</code></li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-4">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>Why use customSpecPath?</strong> This is useful when you want to:
                </p>
                <ul className="text-blue-800 dark:text-blue-200 text-sm mt-2 ml-4">
                    <li>Keep the API spec at a consistent URL regardless of where Swagger UI is mounted</li>
                    <li>Share the same spec across multiple Swagger UI instances</li>
                    <li>Serve the spec separately for programmatic access by other tools</li>
                </ul>
            </div>

            <h2>Automatic Redirection</h2>

            <p>
                The package automatically redirects from paths without a trailing slash
                to the trailing-slash version. For example, accessing <code>/swagger</code>{" "}
                redirects to <code>/swagger/</code>. This ensures that the relative URL{" "}
                <code>apispec.json</code> inside the HTML resolves correctly.
            </p>

            <h2>Best Practices</h2>

            <ul>
                <li>
                    <strong>Always use trailing slashes</strong> in <code>mountPath</code>{" "}
                    to ensure relative paths resolve correctly
                </li>
                <li>
                    <strong>Register both route patterns</strong> -- use{" "}
                    <code>/path/**</code> for sub-paths and <code>/path</code> for the
                    redirect
                </li>
                <li>
                    <strong>Use ApiSpecRoute when needed</strong> -- if you set{" "}
                    <code>customSpecPath</code>, make sure to add an{" "}
                    <code>ApiSpecRoute</code> to serve the file at that path
                </li>
                <li>
                    <strong>Keep it simple</strong> -- for most projects, the default
                    configuration is sufficient
                </li>
            </ul>

            <h2>Related Pages</h2>

            <ul>
                <li>
                    <Link href="/docs/configuration" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        Configuration overview
                    </Link>
                </li>
                <li>
                    <Link href="/docs/basic-usage" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        Basic Usage
                    </Link>
                </li>
                <li>
                    <Link href="/examples" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        Examples
                    </Link>
                </li>
            </ul>
        </div>
    );
}
