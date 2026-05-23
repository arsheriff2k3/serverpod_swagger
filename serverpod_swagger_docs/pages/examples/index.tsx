import React from "react";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export default function Examples() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Examples</h1>

      <p>
        Practical examples of how to use Serverpod Swagger in different
        scenarios.
      </p>

      <h2>Minimal Setup</h2>

      <p>
        The simplest possible integration -- register the route and generate the
        spec.
      </p>

      <CodeBlock
        language="dart"
        code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(args, Protocol(), Endpoints());

  final swaggerRoute = SwaggerUIRoute(Directory.current);
  pod.webServer.addRoute(swaggerRoute, '/swagger/**');
  pod.webServer.addRoute(swaggerRoute, '/swagger');

  await pod.start();
}`}
        fileName="server.dart"
      />

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <p>
        Access the Swagger UI at{" "}
        <code>http://localhost:8082/swagger/</code>.
      </p>

      <h2>Generation with Authentication</h2>

      <p>
        Add JWT authentication to all endpoints, then exclude specific public
        ones.
      </p>

      <CodeBlock
        language="bash"
        code={`# JWT auth on all endpoints, except login and register
dart run serverpod_swagger:generate \\
  --base-url=http://localhost:8082 \\
  --auth=jwt \\
  --unsecure-endpoints=auth/login,auth/register`}
        showLineNumbers={false}
      />

      <p>
        After generating, use the "Authorize" button in Swagger UI to enter your
        JWT token.
      </p>

      <h3>Other Auth Types</h3>

      <CodeBlock
        language="bash"
        code={`# API key auth
dart run serverpod_swagger:generate --auth=apikey

# Basic auth
dart run serverpod_swagger:generate --auth=basic

# OAuth2
dart run serverpod_swagger:generate --auth=oauth2 --base-url=http://localhost:8082`}
        showLineNumbers={false}
      />

      <h2>HTTP Method Inference</h2>

      <p>
        HTTP methods are inferred automatically from your endpoint method names.
        Given an endpoint like this:
      </p>

      <CodeBlock
        language="dart"
        code={`class UserEndpoint extends Endpoint {
  Future<List<User>> listUsers(Session session) async { ... }
  Future<User> getUser(Session session, int id) async { ... }
  Future<User> createUser(Session session, String name) async { ... }
  Future<User> updateUser(Session session, int id, String name) async { ... }
  Future<void> deleteUser(Session session, int id) async { ... }
  Future<bool> doSomething(Session session) async { ... }
}`}
        fileName="user_endpoint.dart"
      />

      <p>The generator will produce:</p>

      <ul>
        <li><code>GET /user/listUsers</code></li>
        <li><code>GET /user/getUser</code></li>
        <li><code>POST /user/createUser</code></li>
        <li><code>PATCH /user/updateUser</code></li>
        <li><code>DELETE /user/deleteUser</code></li>
        <li><code>POST /user/doSomething</code> (default for unrecognized names)</li>
      </ul>

      <h3>Overriding Inferred Methods</h3>

      <CodeBlock
        language="bash"
        code={`# Override specific paths
dart run serverpod_swagger:generate \\
  --http-method=/user/doSomething:get \\
  --http-method=/user/updateUser:put`}
        showLineNumbers={false}
      />

      <h2>Updating an Existing Spec</h2>

      <p>
        Use <code>--update</code> to modify an existing <code>apispec.json</code>{" "}
        without regenerating from source. This is useful for changing auth or
        base URL on an already-generated spec.
      </p>

      <CodeBlock
        language="bash"
        code={`# Add auth to an existing spec
dart run serverpod_swagger:generate --update --auth=jwt

# Change the base URL
dart run serverpod_swagger:generate --update --base-url=https://api.example.com

# Remove all auth
dart run serverpod_swagger:generate --update --unauth`}
        showLineNumbers={false}
      />

      <h2>Programmatic API</h2>

      <p>
        Build an OpenAPI spec in code without running the CLI.
      </p>

      <CodeBlock
        language="dart"
        code={`import 'package:serverpod_swagger/serverpod_swagger.dart';

final spec = SwaggerSpec();

// Define an endpoint
final endpoint = SwaggerEndpoint('greeting');
final method = SwaggerMethod('sayHello');
method.parameters['name'] = SwaggerParameter(
  name: 'name',
  type: 'String',
  isNullable: false,
);
method.returnType = 'String';
endpoint.methods['sayHello'] = method;
spec.endpoints['greeting'] = endpoint;

// Generate the OpenAPI map
final openApiMap = generateOpenApiMap(
  spec,
  baseUrl: 'http://localhost:8082',
);

// Or generate a JSON string directly
final jsonString = generateOpenApiJson(
  spec,
  baseUrl: 'http://localhost:8082',
);

// Utility: infer HTTP method from a name
print(inferHttpMethod('getUser'));    // 'get'
print(inferHttpMethod('createUser')); // 'post'
print(inferHttpMethod('updateUser')); // 'patch'
print(inferHttpMethod('deleteUser')); // 'delete'
print(inferHttpMethod('doStuff'));    // 'post' (default)`}
        fileName="programmatic_example.dart"
      />

      <h2>Development Workflow</h2>

      <CodeBlock
        language="bash"
        code={`# Terminal 1: run your server
dart run bin/main.dart

# Terminal 2: regenerate spec after making changes
dart run serverpod_swagger:generate

# Then refresh your browser at http://localhost:8082/swagger/`}
        showLineNumbers={false}
      />

      <p>
        The Swagger UI route re-reads <code>apispec.json</code> from disk on
        every request with no-cache headers, so you see changes immediately after
        regenerating.
      </p>

      <h2>More Resources</h2>

      <ul>
        <li>
          <Link
            href="/docs/getting-started"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Getting Started
          </Link>
        </li>
        <li>
          <Link
            href="/docs/basic-usage"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Basic Usage
          </Link>
        </li>
        <li>
          <Link
            href="/docs/configuration"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Configuration
          </Link>
        </li>
        <li>
          <Link
            href="/docs/configuration/custom-paths"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Custom Paths
          </Link>
        </li>
      </ul>
    </div>
  );
}
