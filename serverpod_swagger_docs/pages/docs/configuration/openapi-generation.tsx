import React from "react";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function OpenAPIGeneration() {
  return (
    <div className="prose dark:prose-invert">
      <h1>OpenAPI Generation</h1>

      <p>
        The <code>serverpod_swagger</code> CLI analyzes your Serverpod endpoint source code
        using the Dart analyzer and generates an OpenAPI 3.0 specification as{" "}
        <code>apispec.json</code> in your project root.
      </p>

      <h2>Basic Generation</h2>

      <p>
        Run the generator from your Serverpod server project directory:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <p>
        This parses all endpoint classes in{" "}
        <code>lib/src/generated/endpoints/</code> and model files in{" "}
        <code>lib/src/models/</code>, then writes <code>apispec.json</code>.
      </p>

      <h2>Command-Line Options</h2>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Option
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--base-url=URL</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Set the server URL in the spec (default: <code>http://localhost:8082</code>)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--auth=TYPE</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Add a security scheme: <code>jwt</code>, <code>apikey</code>, <code>basic</code>, or <code>oauth2</code>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--auth-description=TEXT</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Custom description for the security scheme
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--secure-endpoints=LIST</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Comma-separated list of endpoints or methods to secure (e.g., <code>admin,user/delete</code>)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--unsecure-endpoints=LIST</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Comma-separated list of endpoints or methods to leave unsecured
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--secure-single-url=PATH</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Secure a single URL path (highest priority override)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--unsecure-single-url=PATH</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Unsecure a single URL path (highest priority override)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--http-method=PATH:METHOD</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Override the HTTP method for a specific path (e.g., <code>/user/archive:delete</code>)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--unauth</code> / <code>--disable-auth</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Remove all security from every endpoint
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--update</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Modify an existing <code>apispec.json</code> instead of regenerating from source
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--verbose</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Print additional details about the generated spec
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Example: Full Generation with Auth</h2>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate \\
  --base-url=https://api.example.com \\
  --auth=jwt \\
  --unsecure-endpoints=auth/login,auth/register \\
  --verbose`}
        showLineNumbers={false}
      />

      <h2>HTTP Method Detection</h2>

      <p>
        The generator infers HTTP methods from endpoint method names using prefix conventions:
      </p>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              HTTP Method
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Name Prefixes
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <strong>GET</strong>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              get, list, fetch, find, read, retrieve, query, search, show, view, load, count, check, has, is, exists, lookup
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <strong>POST</strong>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              create, add, insert, save, register, execute, run, perform, login, send, submit, upload, import, process, trigger, start, init, generate, compute
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <strong>PATCH</strong>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              update, modify, patch, edit, change, set, put, replace, adjust, rename, move, toggle
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <strong>DELETE</strong>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              delete, remove, destroy, drop, clear, unlink, unregister, revoke, cancel, purge
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <strong>POST (default)</strong>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Any method name that does not match the above prefixes
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        You can override any auto-detected method with the <code>--http-method</code> flag:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --http-method=/user/archive:delete`}
        showLineNumbers={false}
      />

      <h2>Generated Responses</h2>

      <p>
        Every operation in the generated spec includes three responses:
      </p>

      <ul>
        <li><strong>200</strong> - Successful operation (with the return type schema, if applicable)</li>
        <li><strong>400</strong> - Bad request</li>
        <li><strong>500</strong> - Internal server error</li>
      </ul>

      <h2>Request Body Handling</h2>

      <p>
        For POST, PATCH, and DELETE methods, parameters are placed in a JSON request body.
        Non-nullable parameters are listed in the <code>required</code> array. For GET methods
        with only primitive parameters, they are placed as query parameters. If a GET method
        has complex (non-primitive) parameters, it falls back to POST with a request body.
      </p>

      <h2>Update Mode</h2>

      <p>
        The <code>--update</code> flag loads the existing <code>apispec.json</code> and applies
        only the changes specified by other flags (auth, base URL, HTTP methods) without
        re-analyzing the source code. This is useful for quick security or URL changes:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --update --base-url=https://staging.example.com`}
        showLineNumbers={false}
      />

      <h2>Next Steps</h2>

      <ul>
        <li>
          <Link
            href="/docs/configuration/swagger-ui-options"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Configure the Swagger UI route
          </Link>
        </li>
        <li>
          <Link
            href="/docs/configuration/authentication"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Configure authentication
          </Link>
        </li>
      </ul>
    </div>
  );
}
