import React from "react";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function APIReference() {
  return (
    <div className="prose dark:prose-invert">
      <h1>API Reference</h1>

      <p>
        This page provides detailed documentation for the classes and methods
        available in the Serverpod Swagger package.
      </p>

      <h2>SwaggerUIRoute</h2>

      <p>
        The <code>SwaggerUIRoute</code> class is the main entry point for adding
        Swagger UI to your Serverpod server.
      </p>

      <h3>Constructor</h3>

      <CodeBlock
        language="dart"
        code={`SwaggerUIRoute(
  Directory projectDirectory, {
  String mountPath = '/swagger/',
})`}
      />

      <h3>Parameters</h3>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Parameter
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Type
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>projectDirectory</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>Directory</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              The root directory of your Serverpod project
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>mountPath</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>String</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              The base path where Swagger UI will be served (must end with a
              trailing slash)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>apiSpecPath</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>String</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Path to the OpenAPI specification file
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Methods</h3>

      <h4>
        <code>handleCall</code>
      </h4>

      <CodeBlock
        language="dart"
        code={`@override\nFuture<bool> handleCall(HttpRequest request) async`}
      />

      <p>
        Handles incoming HTTP requests to the Swagger UI route. This method is
        called by the Serverpod web server when a request is made to the
        configured mount path.
      </p>

      <h2>ServerpodSwaggerVersion</h2>

      <p>
        The <code>ServerpodSwaggerVersion</code> class provides version
        information for the Serverpod Swagger package.
      </p>

      <h3>Properties</h3>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Property
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Type
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>version</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>String</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              The current version of the Serverpod Swagger package
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Command-line Generator</h2>

      <p>
        The <code>generate.dart</code> script in the <code>bin</code> directory
        is used to generate OpenAPI specifications from your Serverpod protocol
        definitions.
      </p>

      <h3>Usage</h3>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate [options]`}
        showLineNumbers={false}
      />

      <h3>Options</h3>

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

      <h2>Annotations</h2>

      <p>
        The following annotations can be used to customize the OpenAPI
        specification generation:
      </p>

      <h3>
        <code>@Route</code>
      </h3>

      <p>
        Specifies the route path for an endpoint. This annotation is provided by
        Serverpod and is used by the Swagger generator to determine the endpoint
        paths.
      </p>

      <CodeBlock
        language="dart"
        code={`@Route('/users/:id')\nFuture<User> getUser(Session session, int id);`}
      />

      <h3>
        <code>@Method</code>
      </h3>

      <p>
        Specifies the HTTP method for an endpoint. If not provided, the method
        is inferred from the endpoint name.
      </p>

      <CodeBlock
        language="dart"
        code={`@Method('PATCH')\n@Route('/users/:id')\nFuture<User> updateUserPartial(Session session, int id, User user);`}
      />

      <h3>
        <code>@Security</code>
      </h3>

      <p>Specifies the security requirements for an endpoint.</p>

      <CodeBlock
        language="dart"
        code={`@Security(['BearerAuth'])\n@Route('/users/profile')\nFuture<User> getUserProfile(Session session);`}
      />

      <h3>
        <code>@Param</code>
      </h3>

      <p>
        Specifies the parameter name for an endpoint parameter. This is useful
        when the parameter name in the Dart code doesn't match the desired
        parameter name in the API.
      </p>

      <CodeBlock
        language="dart"
        code={`@Route('/users/search')\nFuture<List<User>> searchUsers(\n  Session session,\n  @Param('query') String searchQuery,\n);`}
      />

      <h2>Next Steps</h2>

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
            href="/docs/configuration/openapi-generation"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            OpenAPI Generation Configuration
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
