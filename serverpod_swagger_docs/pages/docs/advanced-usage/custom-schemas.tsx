import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function CustomSchemas() {
  return (
    <div className="prose dark:prose-invert">
      <h1>How Schemas Are Generated</h1>

      <p>
        The <code>serverpod_swagger</code> generator automatically creates OpenAPI schemas
        from your Serverpod model files and Dart endpoint signatures. This page explains
        how schema generation works and how you can influence the output.
      </p>

      <h2>Automatic Schema Generation</h2>

      <p>
        The generator reads two sources to build schemas:
      </p>

      <ul>
        <li>
          <strong>YAML model files</strong> in <code>lib/src/models/</code> (both <code>.yaml</code> and{" "}
          <code>.spy.yaml</code> files) -- these produce named schemas under{" "}
          <code>components/schemas</code>.
        </li>
        <li>
          <strong>Dart endpoint parameters and return types</strong> -- primitive types are
          inlined, while references to model classes use <code>$ref</code> pointers.
        </li>
      </ul>

      <h3>Serverpod Model File Example</h3>

      <p>
        Given a standard Serverpod model file:
      </p>

      <CodeBlock
        language="yaml"
        code={`class: User\nfields:\n  name: String\n  email: String\n  age: int?\n  role: String`}
        fileName="lib/src/models/user.spy.yaml"
      />

      <p>
        The generator produces the following OpenAPI schema:
      </p>

      <CodeBlock
        language="json"
        code={`{\n  "User": {\n    "type": "object",\n    "properties": {\n      "name": { "type": "string" },\n      "email": { "type": "string" },\n      "age": { "type": "integer", "format": "int64" },\n      "role": { "type": "string" }\n    },\n    "required": ["name", "email", "role"]\n  }\n}`}
        fileName="apispec.json (excerpt)"
      />

      <p>
        Non-nullable fields are added to the <code>required</code> array. Nullable fields
        (ending with <code>?</code>) are omitted from <code>required</code>.
      </p>

      <h2>Supported Type Mappings</h2>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Dart/YAML Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">OpenAPI Type</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>String</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>string</code></td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>int</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>integer</code> (format: int64)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>double</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>number</code> (format: double)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>bool</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>boolean</code></td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>DateTime</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>string</code> (format: date-time)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>ByteData</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>string</code> (format: byte)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>Duration</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>string</code> (ISO 8601)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>Uri</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>string</code> (format: uri)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>UuidValue</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>string</code> (format: uuid)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>List&lt;T&gt;</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>array</code> (items: schema of T)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>Map&lt;K, V&gt;</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>object</code> (additionalProperties: true)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Enums</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>string</code> with <code>enum</code> values</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Model classes</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>$ref</code> to <code>#/components/schemas/ClassName</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Cross-Module Model Resolution</h2>

      <p>
        When an endpoint references a model from another Serverpod module (e.g.,{" "}
        <code>module:auth:UserInfo</code>), the generator automatically locates and
        parses that model from the dependency's package using{" "}
        <code>package_config.json</code>.
      </p>

      <h2>Editing the Generated Spec</h2>

      <p>
        The generator writes <code>apispec.json</code> as a standard JSON file. You can
        edit it manually after generation to add custom descriptions, examples, or
        additional schemas. Use the <code>--update</code> flag on subsequent runs to
        apply CLI changes without overwriting your manual edits:
      </p>

      <CodeBlock
        language="bash"
        code={`# First run: generate from source\ndart run serverpod_swagger:generate --auth=jwt\n\n# Later: update auth settings without regenerating\ndart run serverpod_swagger:generate --update --unsecure-endpoints=public`}
        showLineNumbers={false}
      />

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-4">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          <strong>Note:</strong> Running without <code>--update</code> regenerates the entire
          spec from source, which will overwrite any manual edits to <code>apispec.json</code>.
        </p>
      </div>

      <h2>Next Steps</h2>

      <ul>
        <li>
          <Link href="/docs/configuration/openapi-generation" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Full list of CLI generation options
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration/authentication" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Configure authentication
          </Link>
        </li>
      </ul>
    </div>
  );
}
