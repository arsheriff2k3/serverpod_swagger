import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function ResponseExamples() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Response Structure</h1>

      <p>
        This page explains how the <code>serverpod_swagger</code> generator creates
        response definitions for each endpoint operation in the OpenAPI specification.
      </p>

      <h2>Generated Responses</h2>

      <p>
        Every operation in the generated spec includes exactly three responses:
      </p>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status Code</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Description</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Content</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>200</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Successful operation</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">JSON schema of the return type (if not void)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>400</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Bad request</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">No content schema</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>500</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Internal server error</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">No content schema</td>
          </tr>
        </tbody>
      </table>

      <h2>Example: Endpoint with Return Type</h2>

      <p>Given this Serverpod endpoint method:</p>

      <CodeBlock
        language="dart"
        code={`class UserEndpoint extends Endpoint {\n  Future<User> getUser(Session session, int id) async {\n    // ...\n  }\n}`}
        fileName="user_endpoint.dart"
      />

      <p>The generator produces a response with the return type schema:</p>

      <CodeBlock
        language="json"
        code={`{\n  "responses": {\n    "200": {\n      "description": "Successful operation",\n      "content": {\n        "application/json": {\n          "schema": {\n            "$ref": "#/components/schemas/User"\n          }\n        }\n      }\n    },\n    "400": {\n      "description": "Bad request"\n    },\n    "500": {\n      "description": "Internal server error"\n    }\n  }\n}`}
        fileName="apispec.json (excerpt)"
      />

      <h2>Example: Void Return Type</h2>

      <p>
        When an endpoint returns <code>void</code> or <code>Future&lt;void&gt;</code>,
        the 200 response has no content schema:
      </p>

      <CodeBlock
        language="json"
        code={`{\n  "responses": {\n    "200": {\n      "description": "Successful operation"\n    },\n    "400": {\n      "description": "Bad request"\n    },\n    "500": {\n      "description": "Internal server error"\n    }\n  }\n}`}
        fileName="apispec.json (excerpt)"
      />

      <h2>Example: List Return Type</h2>

      <p>
        When an endpoint returns a list, the schema uses the array type:
      </p>

      <CodeBlock
        language="dart"
        code={`Future<List<User>> listUsers(Session session) async {\n  // ...\n}`}
        fileName="user_endpoint.dart"
      />

      <CodeBlock
        language="json"
        code={`{\n  "200": {\n    "description": "Successful operation",\n    "content": {\n      "application/json": {\n        "schema": {\n          "type": "array",\n          "items": {\n            "$ref": "#/components/schemas/User"\n          }\n        }\n      }\n    }\n  }\n}`}
        fileName="apispec.json (excerpt)"
      />

      <h2>Request Body and Required Fields</h2>

      <p>
        For POST, PATCH, and DELETE operations, endpoint parameters are placed in a
        JSON request body. Non-nullable parameters are included in the{" "}
        <code>required</code> array:
      </p>

      <CodeBlock
        language="dart"
        code={`Future<User> createUser(Session session, String name, String email, int? age) async {\n  // ...\n}`}
        fileName="user_endpoint.dart"
      />

      <CodeBlock
        language="json"
        code={`{\n  "requestBody": {\n    "required": true,\n    "content": {\n      "application/json": {\n        "schema": {\n          "type": "object",\n          "properties": {\n            "name": { "type": "string" },\n            "email": { "type": "string" },\n            "age": { "type": "integer", "format": "int64" }\n          },\n          "required": ["name", "email"]\n        }\n      }\n    }\n  }\n}`}
        fileName="apispec.json (excerpt)"
      />

      <p>
        Note that <code>age</code> is nullable (<code>int?</code>) and therefore is not
        in the <code>required</code> array.
      </p>

      <h2>Adding Custom Examples</h2>

      <p>
        The generator does not produce example values automatically. If you need
        examples in your spec, you can edit <code>apispec.json</code> directly after
        generation. Use <code>--update</code> on subsequent runs to preserve your
        manual edits when changing auth or base URL settings.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li>
          <Link href="/docs/advanced-usage/custom-schemas" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            How schemas are generated
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration/openapi-generation" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Full list of CLI generation options
          </Link>
        </li>
      </ul>
    </div>
  );
}
