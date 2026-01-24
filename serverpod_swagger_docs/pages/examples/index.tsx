import React from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export default function Examples() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Serverpod Swagger Examples</h1>

      <p>
        This page provides practical examples of how to use Serverpod Swagger in different scenarios.
        Each example includes code snippets and explanations to help you implement Swagger UI in your Serverpod application.
      </p>

      <h2>Basic Example</h2>

      <p>
        This example shows the minimal setup required to add Swagger UI to your Serverpod server.
      </p>

      <CodeBlock
        language="dart"
        code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(
    args,
    Protocol(),
    Endpoints(),
  );
  
  // Add the Swagger UI route
  final swaggerRoute = SwaggerUIRoute(Directory.current);
  pod.webServer.addRoute(swaggerRoute, '/swagger/**');
  
  // Start the server
  await pod.start();
}`}
        fileName="main.dart"
      />

      <p>
        With this setup, you can access the Swagger UI at <code>http://localhost:8082/swagger/</code> after generating the OpenAPI specification with <code>dart run serverpod_swagger:generate</code>.
      </p>

      <h2>Complete Server Example</h2>

      <p>
        This example shows a more complete server setup with multiple routes and Swagger UI.
      </p>

      <CodeBlock
        language="dart"
        code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(
    args,
    Protocol(),
    Endpoints(),
  );
  
  // Add Swagger UI route
  final swaggerRoute = SwaggerUIRoute(Directory.current);
  pod.webServer.addRoute(swaggerRoute, '/swagger/**');
  
  // Add other routes
  pod.webServer.addRoute(RouteRoot(), '/');
  pod.webServer.addRoute(
    StaticRoute.directory(Directory('static')),
    '/*',
  );
  
  // Start the server
  await pod.start();
}`}
        fileName="main.dart"
      />

      <h2>Generating OpenAPI Specification</h2>

      <h3>Basic Generation</h3>

      <CodeBlock
        language="bash"
        code={`# Generate OpenAPI specification
dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <h3>With Custom Options</h3>

      <CodeBlock
        language="bash"
        code={`# Specify base URL
dart run serverpod_swagger:generate --base-url=http://localhost:8080

# Add authentication
dart run serverpod_swagger:generate --auth=jwt

# Customize HTTP methods
dart run serverpod_swagger:generate --http-method=users/create:post

# Update existing spec
dart run serverpod_swagger:generate --update`}
        showLineNumbers={false}
      />

      <h2>Authentication Example</h2>

      <h3>Step 1: Generate spec with authentication</h3>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --auth=bearer --base-url=http://localhost:8080`}
        showLineNumbers={false}
      />

      <h3>Step 2: Use the Swagger UI to test authenticated endpoints</h3>

      <p>
        After generating the spec with authentication, you can use the "Authorize" button in Swagger UI to provide your authentication token.
      </p>

      <h2>Custom HTTP Methods Example</h2>

      <p>
        By default, all endpoints use POST. You can customize HTTP methods for specific endpoints:
      </p>

      <CodeBlock
        language="bash"
        code={`# Make specific endpoints use different HTTP methods
dart run serverpod_swagger:generate \\
  --http-method=users/get:get \\
  --http-method=users/create:post \\
  --http-method=users/update:put \\
  --http-method=users/delete:delete`}
        showLineNumbers={false}
      />

      <h2>Development Workflow</h2>

      <p>
        During development, you can use this workflow for live updates:
      </p>

      <CodeBlock
        language="bash"
        code={`# Terminal 1: Run your server
dart run bin/main.dart

# Terminal 2: Regenerate spec when you make changes
dart run serverpod_swagger:generate

# Then refresh your browser at http://localhost:8082/swagger/`}
        showLineNumbers={false}
      />

      <p>
        The Swagger UI route automatically re-reads the <code>apispec.json</code> file on every request, so you'll see your changes immediately after regenerating the spec.
      </p>

      <h2>More Resources</h2>

      <p>For more detailed information, check out:</p>

      <ul>
        <li>
          <Link href="/docs/basic-usage" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Basic Usage Guide
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration/openapi-generation" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            OpenAPI Generation Options
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration/authentication" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Authentication Configuration
          </Link>
        </li>
        <li>
          <Link href="/api-reference/cli-options" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            CLI Options Reference
          </Link>
        </li>
      </ul>
    </div>
  );
}