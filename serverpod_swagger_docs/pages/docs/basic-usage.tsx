import React from "react";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function BasicUsage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Basic Usage</h1>

      <p>
        This guide walks you through integrating Swagger UI into your Serverpod
        project and generating an OpenAPI specification for your endpoints.
      </p>

      <h2>Setting Up Swagger UI</h2>

      <h3>Step 1: Import the Package</h3>

      <CodeBlock
        language="dart"
        code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';`}
        fileName="server.dart"
      />

      <h3>Step 2: Register the Swagger UI Route</h3>

      <p>
        Add the Swagger UI route to your server's web server. Two route
        registrations are required: one with the wildcard pattern for sub-paths,
        and one for the base path to handle the redirect.
      </p>

      <CodeBlock
        language="dart"
        code={`void run(List<String> args) async {
  final pod = Serverpod(
    args,
    Protocol(),
    Endpoints(),
  );

  // Add the Swagger UI route
  final swaggerRoute = SwaggerUIRoute(Directory.current);
  pod.webServer.addRoute(swaggerRoute, '/swagger/**');
  pod.webServer.addRoute(swaggerRoute, '/swagger');

  await pod.start();
}`}
        fileName="server.dart"
      />

      <p>
        This serves the Swagger UI at <code>/swagger/</code>. The UI
        automatically loads the OpenAPI specification from{" "}
        <code>/swagger/apispec.json</code>.
      </p>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-4">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          <strong>Note:</strong> Both route registrations are needed.{" "}
          <code>/swagger/**</code> handles sub-paths (the UI page and the spec
          file), while <code>/swagger</code> handles the redirect from{" "}
          <code>/swagger</code> to <code>/swagger/</code>.
        </p>
      </div>

      <h2>Generating the OpenAPI Specification</h2>

      <p>
        The CLI generator analyzes your Serverpod endpoint classes and protocol
        model files to produce an <code>apispec.json</code> file.
      </p>

      <h3>Step 1: Run the Generator</h3>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <p>
        This creates an <code>apispec.json</code> file in your project root.
      </p>

      <h3>Step 2: Customize Generation (Optional)</h3>

      <CodeBlock
        language="bash"
        code={`# Specify base URL
dart run serverpod_swagger:generate --base-url=http://localhost:8082

# Add JWT authentication to all endpoints
dart run serverpod_swagger:generate --auth=jwt

# Mark specific endpoints as unsecured
dart run serverpod_swagger:generate --auth=jwt --unsecure-endpoints=status,health/check

# Override an HTTP method for a specific path
dart run serverpod_swagger:generate --http-method=/users/create:post

# Update an existing spec (preserves manual edits)
dart run serverpod_swagger:generate --update

# Show verbose output
dart run serverpod_swagger:generate --verbose`}
        showLineNumbers={false}
      />

      <h2>HTTP Method Inference</h2>

      <p>
        HTTP methods are automatically inferred from endpoint method names using
        naming conventions:
      </p>

      <ul>
        <li>
          <strong>GET:</strong> methods starting with <code>get</code>,{" "}
          <code>list</code>, <code>find</code>, <code>fetch</code>,{" "}
          <code>read</code>, <code>search</code>, <code>count</code>,{" "}
          <code>check</code>, etc.
        </li>
        <li>
          <strong>POST:</strong> methods starting with <code>create</code>,{" "}
          <code>add</code>, <code>insert</code>, <code>save</code>,{" "}
          <code>send</code>, etc.
        </li>
        <li>
          <strong>PATCH:</strong> methods starting with <code>update</code>,{" "}
          <code>edit</code>, <code>modify</code>, <code>patch</code>,{" "}
          <code>set</code>, etc.
        </li>
        <li>
          <strong>DELETE:</strong> methods starting with <code>delete</code>,{" "}
          <code>remove</code>, <code>destroy</code>, <code>clear</code>,{" "}
          <code>cancel</code>, etc.
        </li>
        <li>
          <strong>Default:</strong> POST (for methods that do not match any
          convention)
        </li>
      </ul>

      <p>
        You can override any inferred method using the{" "}
        <code>--http-method</code> CLI flag.
      </p>

      <h2>Accessing Swagger UI</h2>

      <ol>
        <li>Start your Serverpod server</li>
        <li>
          Navigate to <code>http://localhost:8082/swagger/</code> in your
          browser
        </li>
        <li>The Swagger UI will display your API documentation</li>
      </ol>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-4">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Tip:</strong> Navigating to <code>/swagger</code> (without
          trailing slash) will automatically redirect to <code>/swagger/</code>.
        </p>
      </div>

      <h2>Live Reloading During Development</h2>

      <p>
        The Swagger UI route re-reads <code>apispec.json</code> from disk on
        every request, so you can regenerate the spec and see changes immediately
        by refreshing the browser.
      </p>

      <CodeBlock
        language="bash"
        code={`# Terminal 1: run your server
dart run bin/main.dart

# Terminal 2: regenerate spec after making changes
dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <h2>Next Steps</h2>

      <ul>
        <li>
          <Link
            href="/docs/configuration"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Configuration options
          </Link>
        </li>
        <li>
          <Link
            href="/docs/configuration/custom-paths"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Custom mount paths and API spec paths
          </Link>
        </li>
        <li>
          <Link
            href="/examples"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Examples
          </Link>
        </li>
      </ul>
    </div>
  );
}
