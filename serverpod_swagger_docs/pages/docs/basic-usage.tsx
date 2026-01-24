import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function BasicUsage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Basic Usage</h1>

      <p>
        This guide will walk you through the basic steps to integrate Swagger UI into your Serverpod project
        and generate OpenAPI documentation for your endpoints.
      </p>

      <h2>Setting Up Swagger UI</h2>

      <p>
        To add Swagger UI to your Serverpod server, you need to create a route that serves the Swagger UI interface.
        This is done by adding a <code>SwaggerUIRoute</code> to your server's web server routes.
      </p>

      <h3>Step 1: Import the Package</h3>

      <p>
        First, import the Serverpod Swagger package in your server file:
      </p>

      <CodeBlock
        language="dart"
        code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';`}
        fileName="server.dart"
      />

      <h3>Step 2: Add the Swagger UI Route</h3>

      <p>
        Next, add the Swagger UI route to your server's web server in your main function:
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
        fileName="server.dart"
      />

      <p>
        This adds a route that serves the Swagger UI interface at <code>/swagger/</code>.
        The Swagger UI will automatically load the OpenAPI specification from <code>/swagger/apispec.json</code>.
      </p>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-4">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          <strong>Note:</strong> The <code>mountPath</code> parameter must end with a trailing slash.
        </p>
      </div>

      <h2>Generating OpenAPI Specification</h2>

      <p>
        Serverpod Swagger can automatically generate an OpenAPI specification from your Serverpod endpoints
        by analyzing your endpoint classes and protocol definitions.
      </p>

      <h3>Step 1: Run the Generator</h3>

      <p>
        Run the following command from your project root to generate the OpenAPI specification:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <p>
        This will create an <code>apispec.json</code> file in your project root directory.
      </p>

      <h3>Step 2: Customize Generation (Optional)</h3>

      <p>
        You can customize the generation with command-line options:
      </p>

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

      <h2>Accessing Swagger UI</h2>

      <p>
        Once you have set up Swagger UI and generated the OpenAPI specification, you can access the Swagger UI interface.
      </p>

      <ol>
        <li>Start your Serverpod server</li>
        <li>Navigate to <code>http://localhost:8082/swagger/</code> in your browser</li>
        <li>The Swagger UI will display your API documentation</li>
      </ol>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-4">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Tip:</strong> Make sure to include the trailing slash in the URL. The route is configured to serve at <code>/swagger/</code>.
        </p>
      </div>

      <h2>Live Reloading During Development</h2>

      <p>
        The Swagger UI route automatically re-reads the <code>apispec.json</code> file on every request,
        so you can regenerate your specification and see changes immediately by refreshing the browser.
      </p>

      <CodeBlock
        language="bash"
        code={`# In one terminal: run your server
dart run bin/main.dart

# In another terminal: regenerate spec when you make changes
dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <h2>Complete Example</h2>

      <p>
        Here's a complete example of a Serverpod server with Swagger UI:
      </p>

      <CodeBlock
        language="dart"
        code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';
import 'package:my_server/server.dart';

void run(List<String> args) async {
  // Create the Serverpod instance
  final pod = Serverpod(
    args,
    Protocol(),
    Endpoints(),
  );

  // Add Swagger UI route
  final swaggerRoute = SwaggerUIRoute(Directory.current);
  pod.webServer.addRoute(swaggerRoute, '/swagger/**');

  // Start the server
  await pod.start();
}`}
        fileName="bin/main.dart"
      />

      <h2>Next Steps</h2>

      <p>
        Now that you have set up basic Swagger UI integration, you can explore more advanced features:
      </p>

      <ul>
        <li>
          <Link href="/docs/configuration/openapi-generation" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Configure OpenAPI generation options
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration/authentication" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Add authentication to your API documentation
          </Link>
        </li>
        <li>
          <Link href="/docs/advanced-usage/custom-schemas" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Work with custom schemas
          </Link>
        </li>
        <li>
          <Link href="/api-reference/cli-options" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            View all CLI options
          </Link>
        </li>
      </ul>
    </div>
  );
}