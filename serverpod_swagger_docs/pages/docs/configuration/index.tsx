import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function Configuration() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Configuration</h1>

      <p>
        Serverpod Swagger can be configured through CLI flags when generating the
        OpenAPI specification, and through constructor parameters when setting up
        the route. This page covers all available options.
      </p>

      <h2>CLI Options</h2>

      <p>
        All configuration for the OpenAPI spec generation is done via
        command-line flags passed to <code>dart run serverpod_swagger:generate</code>.
      </p>

      <table className="table-auto w-full text-sm">
        <thead>
          <tr>
            <th className="text-left p-2">Flag</th>
            <th className="text-left p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2"><code>--base-url=URL</code></td>
            <td className="p-2">Set the server URL in the spec (e.g., <code>http://localhost:8082</code>)</td>
          </tr>
          <tr>
            <td className="p-2"><code>--auth=TYPE</code></td>
            <td className="p-2">Add an authentication scheme. Supported types: <code>jwt</code>, <code>apikey</code>, <code>basic</code>, <code>oauth2</code></td>
          </tr>
          <tr>
            <td className="p-2"><code>--secure-endpoints=a,b</code></td>
            <td className="p-2">Comma-separated list of endpoints or paths to mark as secured (e.g., <code>users,admin/delete</code>)</td>
          </tr>
          <tr>
            <td className="p-2"><code>--unsecure-endpoints=a,b</code></td>
            <td className="p-2">Comma-separated list of endpoints or paths to mark as unsecured</td>
          </tr>
          <tr>
            <td className="p-2"><code>--http-method=/path:method</code></td>
            <td className="p-2">Override the HTTP method for a specific path (e.g., <code>--http-method=/users/getAll:get</code>)</td>
          </tr>
          <tr>
            <td className="p-2"><code>--update</code></td>
            <td className="p-2">Update an existing <code>apispec.json</code> instead of regenerating from scratch</td>
          </tr>
          <tr>
            <td className="p-2"><code>--verbose</code></td>
            <td className="p-2">Print detailed output during generation</td>
          </tr>
          <tr>
            <td className="p-2"><code>--unauth</code></td>
            <td className="p-2">Globally remove all security from every endpoint</td>
          </tr>
        </tbody>
      </table>

      <h3>Authentication Examples</h3>

      <CodeBlock
        language="bash"
        code={`# JWT auth on all endpoints
dart run serverpod_swagger:generate --auth=jwt

# JWT auth, but keep login and register public
dart run serverpod_swagger:generate --auth=jwt --unsecure-endpoints=auth/login,auth/register

# API key auth, only secure admin endpoints
dart run serverpod_swagger:generate --auth=apikey --secure-endpoints=admin

# Remove all auth from an existing spec
dart run serverpod_swagger:generate --update --unauth`}
        showLineNumbers={false}
      />

      <h3>HTTP Method Overrides</h3>

      <p>
        HTTP methods are inferred from method names automatically, but you can
        override specific paths.
      </p>

      <CodeBlock
        language="bash"
        code={`# Override a single path
dart run serverpod_swagger:generate --http-method=/users/getAll:get

# Override multiple paths
dart run serverpod_swagger:generate \\
  --http-method=/users/sync:post \\
  --http-method=/data/export:get`}
        showLineNumbers={false}
      />

      <h2>Route Configuration</h2>

      <p>
        The <code>SwaggerUIRoute</code> constructor accepts the following parameters:
      </p>

      <CodeBlock
        language="dart"
        code={`SwaggerUIRoute(
  Directory projectRoot, {
  String mountPath = '/swagger/',
  String? customSpecPath,
})`}
        showLineNumbers={false}
      />

      <ul>
        <li><strong>projectRoot</strong> -- The directory containing <code>apispec.json</code> (typically <code>Directory.current</code>)</li>
        <li><strong>mountPath</strong> -- The URL path where Swagger UI is served. Must end with a trailing slash. Defaults to <code>/swagger/</code></li>
        <li><strong>customSpecPath</strong> -- Override the URL from which Swagger UI loads the API spec. When not provided, defaults to <code>apispec.json</code> relative to the mount path</li>
      </ul>

      <p>
        A separate <code>ApiSpecRoute</code> class is available for serving
        <code> apispec.json</code> at an independent path:
      </p>

      <CodeBlock
        language="dart"
        code={`ApiSpecRoute(Directory projectRoot)`}
        showLineNumbers={false}
      />

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-4">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Tip:</strong> For details on custom mount paths and separating
          the API spec route, see the{" "}
          <Link href="/docs/configuration/custom-paths" className="underline">
            Custom Paths
          </Link>{" "}
          guide.
        </p>
      </div>

      <h2>Programmatic API</h2>

      <p>
        You can also build OpenAPI specs programmatically using the exported
        models and functions:
      </p>

      <CodeBlock
        language="dart"
        code={`import 'package:serverpod_swagger/serverpod_swagger.dart';

final spec = SwaggerSpec();
final endpoint = SwaggerEndpoint('greeting');
final method = SwaggerMethod('hello');
method.parameters['name'] = SwaggerParameter(
  name: 'name',
  type: 'String',
  isNullable: false,
);
method.returnType = 'String';
endpoint.methods['hello'] = method;
spec.endpoints['greeting'] = endpoint;

// Generate the OpenAPI map or JSON string
final map = generateOpenApiMap(spec, baseUrl: 'http://localhost:8082');
final json = generateOpenApiJson(spec, baseUrl: 'http://localhost:8082');

// Infer HTTP method from a name
final httpMethod = inferHttpMethod('getUserById'); // returns 'get'`}
        fileName="example.dart"
      />

      <h2>Related Pages</h2>

      <ul>
        <li>
          <Link
            href="/docs/configuration/custom-paths"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Custom Paths
          </Link>
          {" "}- Mount Swagger UI at a custom path and serve the spec separately
        </li>
        <li>
          <Link
            href="/docs/basic-usage"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Basic Usage
          </Link>
          {" "}- Step-by-step integration guide
        </li>
        <li>
          <Link
            href="/examples"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Examples
          </Link>
          {" "}- Practical code examples
        </li>
      </ul>
    </div>
  );
}
