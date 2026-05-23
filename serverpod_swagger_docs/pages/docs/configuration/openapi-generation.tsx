import React from "react";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function OpenAPIGeneration() {
  return (
    <div className="prose dark:prose-invert">
      <h1>OpenAPI Generation Configuration</h1>

      <p>
        Serverpod Swagger automatically generates OpenAPI 3.0 specifications
        from your Serverpod protocol definitions. This page explains how to
        customize the generation process to fit your needs.
      </p>

      <h2>Basic Generation</h2>

      <p>
        The simplest way to generate the OpenAPI specification is to run the
        following command from your project root:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <p>
        This will create an <code>apispec.json</code> file in your project root
        directory with default settings.
      </p>

      <h2>Command-line Options</h2>

      <p>
        The generator supports several command-line options to customize the
        output:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate [options]`}
        showLineNumbers={false}
      />

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Option
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Description
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Default
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--output</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Path to the output file
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>apispec.json</code>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--title</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              API title
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Your project name
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--description</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              API description
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Empty
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--version</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              API version
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>1.0.0</code>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--server-url</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Server URL
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>http://localhost:8082</code>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--server-description</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Server description
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Development server
            </td>
          </tr>
        </tbody>
      </table>

      <p>Example usage:</p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --output=web/apispec.json --title="My API" --version="2.0.0" --server-url="https://api.example.com"`}
        showLineNumbers={false}
      />

      <h2>Customizing Endpoint Documentation</h2>

      <p>
        You can add documentation to your endpoints using Dart documentation
        comments. The generator will extract these comments and include them in
        the OpenAPI specification.
      </p>

      <CodeBlock
        language="dart"
        code={`/// Creates a new user in the system.
/// 
/// This endpoint requires admin privileges.
/// 
/// @param user The user to create
/// @return The created user with ID assigned
@Route('/users')
Future<User> createUser(Session session, User user);`}
        fileName="example_endpoint.dart"
      />

      <p>
        The generator will use the first line of the comment as the summary and
        the rest as the description. You can also use <code>@param</code> and{" "}
        <code>@return</code> tags to document parameters and return values.
      </p>

      <h2>HTTP Method Customization</h2>

      <p>
        By default, Serverpod Swagger assigns HTTP methods based on the endpoint
        name prefix:
      </p>

      <ul>
        <li>
          <code>get*</code> - GET
        </li>
        <li>
          <code>create*</code> - POST
        </li>
        <li>
          <code>update*</code> - PUT
        </li>
        <li>
          <code>delete*</code> - DELETE
        </li>
        <li>All others - POST</li>
      </ul>

      <p>
        You can override this behavior by using the <code>@Method</code>{" "}
        annotation:
      </p>

      <CodeBlock
        language="dart"
        code={`@Method('PATCH')
@Route('/users/:id')
Future<User> updateUserPartial(Session session, int id, User user);`}
        fileName="example_endpoint.dart"
      />

      <h2>Custom Schema Definitions</h2>

      <p>
        For complex types that aren't automatically handled by the generator,
        you can provide custom schema definitions using YAML files.
      </p>

      <p>
        Create a file named <code>openapi_schemas.yaml</code> in your project
        root:
      </p>

      <CodeBlock
        language="yaml"
        code={`schemas:\n  CustomType:\n    type: object\n    properties:\n      id:\n        type: integer\n        format: int64\n      name:\n        type: string\n    required:\n      - id\n      - name`}
        fileName="openapi_schemas.yaml"
      />

      <p>
        The generator will include these custom schema definitions in the
        generated OpenAPI specification.
      </p>

      <h2>Regenerating on Code Changes</h2>

      <p>
        During development, you may want to automatically regenerate the OpenAPI
        specification when your code changes. You can use a file watcher like{" "}
        <code>watcher</code> or <code>build_runner</code> to do this.
      </p>

      <p>
        Example with <code>watcher</code>:
      </p>

      <CodeBlock
        language="yaml"
        code={`dependencies:\n  watcher: ^1.0.0\n\ndev_dependencies:\n  build_runner: ^2.0.0`}
        fileName="pubspec.yaml"
      />

      <CodeBlock
        language="dart"
        code={`import 'dart:io';\nimport 'package:watcher/watcher.dart';\n\nvoid main() {\n  final watcher = DirectoryWatcher('lib/protocol');\n  watcher.events.listen((event) {\n    if (event.type == ChangeType.MODIFY && event.path.endsWith('.dart')) {\n      print('Regenerating OpenAPI spec...');\n      Process.run('dart', ['bin/generate.dart']);\n    }\n  });\n  print('Watching for changes in lib/protocol...');\n}`}
        fileName="bin/watch.dart"
      />

      <p>Run the watcher:</p>

      <CodeBlock
        language="bash"
        code={`dart bin/watch.dart`}
        showLineNumbers={false}
      />

      <h2>Next Steps</h2>

      <ul>
        <li>
          <Link
            href="/docs/configuration/swagger-ui-options"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Configure Swagger UI options
          </Link>
        </li>
        <li>
          <Link
            href="/docs/configuration/authentication"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Add authentication to your API documentation
          </Link>
        </li>
      </ul>
    </div>
  );
}
