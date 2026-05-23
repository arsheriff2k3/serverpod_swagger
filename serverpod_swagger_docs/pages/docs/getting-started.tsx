import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function GettingStarted() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Getting Started with Serverpod Swagger</h1>

      <p>
        Serverpod Swagger generates OpenAPI 3.0 specifications from your
        Serverpod endpoint classes and model definitions, and serves a Swagger UI
        interface directly from your server.
      </p>

      <h2>Prerequisites</h2>

      <ul>
        <li>Dart SDK &gt;= 3.5.0</li>
        <li>Serverpod &gt;= 3.4.2</li>
        <li>A working Serverpod project</li>
      </ul>

      <h2>Installation</h2>

      <p>Add the package to your server project's <code>pubspec.yaml</code>:</p>

      <CodeBlock
        language="yaml"
        code={`dependencies:
  serverpod: ">=3.4.2 <4.0.0"
  serverpod_swagger: ^1.0.0`}
        fileName="pubspec.yaml"
      />

      <p>Then run:</p>

      <CodeBlock
        language="bash"
        code={`dart pub get`}
        showLineNumbers={false}
      />

      <h2>Setup</h2>

      <h3>1. Import the package</h3>

      <CodeBlock
        language="dart"
        code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';`}
        fileName="server.dart"
      />

      <h3>2. Register the Swagger UI route</h3>

      <p>
        Add two route registrations: one with the wildcard pattern for sub-paths,
        and one for the base path to handle the redirect from{" "}
        <code>/swagger</code> to <code>/swagger/</code>.
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

      <h3>3. Generate the OpenAPI specification</h3>

      <p>
        Run the generator from your project root. It analyzes your endpoint
        classes and model files to produce <code>apispec.json</code>.
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <h3>4. Start your server and open Swagger UI</h3>

      <p>
        Start your Serverpod server and navigate to{" "}
        <code>http://localhost:8082/swagger/</code> in your browser.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-4">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Tip:</strong> Navigating to <code>/swagger</code> (without
          trailing slash) will automatically redirect to{" "}
          <code>/swagger/</code>.
        </p>
      </div>

      <h2>How It Works</h2>

      <ul>
        <li>
          The CLI generator uses the Dart analyzer to parse your endpoint classes
          under <code>lib/src/generated/endpoints/</code> and your model YAML
          files under <code>lib/src/models/</code>.
        </li>
        <li>
          HTTP methods are automatically inferred from method names (e.g.,{" "}
          <code>getUser</code> becomes GET, <code>createUser</code> becomes
          POST, <code>updateUser</code> becomes PATCH,{" "}
          <code>deleteUser</code> becomes DELETE).
        </li>
        <li>
          The Swagger UI route reads <code>apispec.json</code> from disk on
          every request, so changes appear immediately after regenerating.
        </li>
        <li>
          Swagger UI is loaded from the unpkg CDN (v5.18.2) -- nothing is
          bundled in the package.
        </li>
      </ul>

      <h2>Next Steps</h2>

      <ul>
        <li>
          <Link href="/docs/basic-usage" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Basic Usage -- CLI options, HTTP method inference, and more
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Configuration
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
