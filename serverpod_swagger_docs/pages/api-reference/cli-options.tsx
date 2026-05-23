import React from "react";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export default function CLIOptions() {
  return (
    <div className="prose dark:prose-invert">
      <h1>CLI Options</h1>

      <p>
        The Serverpod Swagger package includes a command-line interface (CLI)
        tool for generating OpenAPI specifications from your Serverpod protocol
        definitions. This page documents the available options for the CLI tool.
      </p>

      <h2>Overview</h2>

      <p>
        The <code>generate.dart</code> script in the <code>bin</code> directory
        is used to generate OpenAPI specifications from your Serverpod protocol
        definitions. The tool analyzes your Dart code, extracts endpoint
        information, and generates a JSON file that conforms to the OpenAPI
        specification.
      </p>

      <h2>Basic Usage</h2>

      <p>
        To use the CLI tool, run the following command from your project root
        directory:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate [options]`}
        showLineNumbers={false}
      />

      <h2>Available Options</h2>

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
              Path to the output file where the generated OpenAPI specification
              will be saved.
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
              The title of the API that will be displayed in the Swagger UI.
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Your project name (derived from pubspec.yaml)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--description</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              A description of the API that will be displayed in the Swagger UI.
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
              The version of the API that will be displayed in the Swagger UI.
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
              The URL of the server that will be used for the "Try it out"
              feature in Swagger UI.
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
              A description of the server that will be displayed in the Swagger
              UI.
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Development server
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--source-dir</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              The directory containing the Serverpod protocol definitions to
              analyze.
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>lib/src/protocol</code>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--schema-dir</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              The directory containing custom schema definitions in YAML format.
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>lib/src/openapi</code>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              <code>--help</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Display help information about the available options.
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              N/A
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Example Commands</h2>

      <h3>Basic Generation</h3>

      <p>Generate an OpenAPI specification with default options:</p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate`}
        showLineNumbers={false}
      />

      <h3>Custom Output Path</h3>

      <p>Generate an OpenAPI specification and save it to a custom location:</p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --output=public/api/openapi.json`}
        showLineNumbers={false}
      />

      <h3>Custom API Information</h3>

      <p>Generate an OpenAPI specification with custom API information:</p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate \
  --title="My Awesome API" \
  --description="A comprehensive API for my application" \
  --version="2.1.0"`}
        showLineNumbers={false}
      />

      <h3>Custom Server Information</h3>

      <p>Generate an OpenAPI specification with custom server information:</p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate \
  --server-url="https://api.example.com" \
  --server-description="Production API Server"`}
        showLineNumbers={false}
      />

      <h3>Multiple Servers</h3>

      <p>
        To specify multiple servers, you can provide the server URL and
        description options multiple times:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate \
  --server-url="https://api.example.com" \
  --server-description="Production API Server" \
  --server-url="https://staging-api.example.com" \
  --server-description="Staging API Server" \
  --server-url="http://localhost:8082" \
  --server-description="Development Server"`}
        showLineNumbers={false}
      />

      <h2>Integration with Build Process</h2>

      <p>
        You can integrate the OpenAPI generation into your build process by
        adding a script to your <code>package.json</code> file (if you're using
        npm) or creating a shell script that runs the generator.
      </p>

      <h3>Example Shell Script</h3>

      <CodeBlock
        language="bash"
        code={`#!/bin/bash

# Generate OpenAPI specification
dart run serverpod_swagger:generate \
  --title="My API" \
  --description="API for my application" \
  --version="1.0.0" \
  --output="public/api/openapi.json"

# Start the server
dart bin/main.dart`}
        showLineNumbers={false}
      />

      <h2>Related Documentation</h2>

      <ul>
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
            href="/docs/advanced-usage/custom-schemas"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Custom Schema Definitions
          </Link>
        </li>
        <li>
          <Link
            href="/api-reference/swagger-ui-route"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            SwaggerUIRoute API Reference
          </Link>
        </li>
      </ul>
    </div>
  );
}
