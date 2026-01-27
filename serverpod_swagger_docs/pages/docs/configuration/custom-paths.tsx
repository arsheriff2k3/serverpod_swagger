import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function CustomPaths() {
    return (
        <div className="prose dark:prose-invert">
            <h1>Custom Mount Paths</h1>

            <p>
                By default, Swagger UI is mounted at <code>/swagger/</code>, but you can customize this
                to mount it at any path you prefer. This guide shows you how to configure custom paths
                for both the Swagger UI and the API specification file.
            </p>

            <h2>Default Configuration</h2>

            <p>
                The simplest setup mounts Swagger UI at the default <code>/swagger/</code> path:
            </p>

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
  
  await pod.start();
}`}
                fileName="server.dart"
            />

            <p>
                With this configuration:
            </p>

            <ul>
                <li>Swagger UI is available at: <code>http://localhost:8082/swagger/</code></li>
                <li>API spec is loaded from: <code>http://localhost:8082/swagger/apispec.json</code></li>
            </ul>

            <h2>Custom Mount Path</h2>

            <p>
                You can mount Swagger UI at a custom path using the <code>mountPath</code> parameter:
            </p>

            <CodeBlock
                language="dart"
                code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(args, Protocol(), Endpoints());
  
  // Custom path - Swagger UI at /api/docs/
  final swaggerRoute = SwaggerUIRoute(
    Directory.current,
    mountPath: '/api/docs/',
  );
  pod.webServer.addRoute(swaggerRoute, '/api/docs/**');
  
  await pod.start();
}`}
                fileName="server.dart"
            />

            <p>
                With this configuration:
            </p>

            <ul>
                <li>Swagger UI is available at: <code>http://localhost:8082/api/docs/</code></li>
                <li>API spec is loaded from: <code>http://localhost:8082/api/docs/apispec.json</code></li>
            </ul>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-4">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>Important:</strong> The <code>mountPath</code> parameter must end with a trailing slash (<code>/</code>).
                </p>
            </div>

            <h2>Custom API Specification Path</h2>

            <p>
                If you want to serve the <code>apispec.json</code> file from a different location
                (e.g., at the root instead of under the mount path), you can use the <code>customSpecPath</code>
                parameter along with the <code>ApiSpecRoute</code> class:
            </p>

            <CodeBlock
                language="dart"
                code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(args, Protocol(), Endpoints());
  final projectRoot = Directory.current;
  
  // Swagger UI at custom path, API spec at root
  final swaggerRoute = SwaggerUIRoute(
    projectRoot,
    mountPath: '/api/docs/',
    customSpecPath: '/apispec.json', // Tell Swagger UI to load from root
  );
  pod.webServer.addRoute(swaggerRoute, '/api/docs/**');
  
  // Serve apispec.json at the root
  final apiSpecRoute = ApiSpecRoute(projectRoot);
  pod.webServer.addRoute(apiSpecRoute, '/apispec.json');
  
  await pod.start();
}`}
                fileName="server.dart"
            />

            <p>
                With this configuration:
            </p>

            <ul>
                <li>Swagger UI is available at: <code>http://localhost:8082/api/docs/</code></li>
                <li>API spec is loaded from: <code>http://localhost:8082/apispec.json</code> (root)</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-4">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>Why use customSpecPath?</strong> This is useful when you want to:
                </p>
                <ul className="text-blue-800 dark:text-blue-200 text-sm mt-2 ml-4">
                    <li>Keep your API specification at a consistent URL regardless of where Swagger UI is mounted</li>
                    <li>Share the same API specification file across multiple Swagger UI instances</li>
                    <li>Serve the API specification separately for programmatic access</li>
                </ul>
            </div>

            <h2>Automatic Redirection</h2>

            <p>
                The package automatically handles redirection from paths without trailing slashes.
                For example, if you access <code>/swagger</code>, you'll be automatically redirected
                to <code>/swagger/</code>. This ensures that relative URLs (like <code>apispec.json</code>)
                resolve correctly in the browser.
            </p>

            <h2>Complete Example with Multiple Configurations</h2>

            <p>
                Here's a complete example showing how to set up multiple Swagger UI instances
                with different configurations:
            </p>

            <CodeBlock
                language="dart"
                code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(args, Protocol(), Endpoints());
  final projectRoot = Directory.current;
  
  // Configuration 1: Default Swagger UI at /swagger/
  final defaultSwagger = SwaggerUIRoute(projectRoot);
  pod.webServer.addRoute(defaultSwagger, '/swagger/**');
  
  // Configuration 2: Custom path with spec at root
  final customSwagger = SwaggerUIRoute(
    projectRoot,
    mountPath: '/api/docs/',
    customSpecPath: '/apispec.json',
  );
  pod.webServer.addRoute(customSwagger, '/api/docs/**');
  
  // Serve apispec.json at root for custom configuration
  final apiSpecRoute = ApiSpecRoute(projectRoot);
  pod.webServer.addRoute(apiSpecRoute, '/apispec.json');
  
  await pod.start();
  
  print('Swagger UI available at:');
  print('  - http://localhost:8082/swagger/');
  print('  - http://localhost:8082/api/docs/');
}`}
                fileName="server.dart"
            />

            <h2>Best Practices</h2>

            <ul>
                <li>
                    <strong>Always use trailing slashes</strong> in <code>mountPath</code> to ensure
                    relative paths work correctly
                </li>
                <li>
                    <strong>Match route patterns</strong> - if <code>mountPath</code> is <code>/api/docs/</code>,
                    use <code>/api/docs/**</code> for the route pattern
                </li>
                <li>
                    <strong>Use ApiSpecRoute when needed</strong> - if you specify <code>customSpecPath</code>,
                    make sure to add an <code>ApiSpecRoute</code> to serve the file at that path
                </li>
                <li>
                    <strong>Keep it simple</strong> - for most cases, the default configuration is sufficient
                </li>
            </ul>

            <h2>Next Steps</h2>

            <ul>
                <li>
                    <Link href="/docs/configuration/openapi-generation" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        Configure OpenAPI generation
                    </Link>
                </li>
                <li>
                    <Link href="/docs/configuration/authentication" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        Add authentication
                    </Link>
                </li>
                <li>
                    <Link href="/docs/troubleshooting" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        Troubleshooting guide
                    </Link>
                </li>
            </ul>
        </div>
    );
}
