import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function APIReference() {
  return (
    <div className="prose dark:prose-invert">
      <h1>API Reference</h1>

      <p>
        Complete reference for all public classes, functions, and CLI options
        in the <code>serverpod_swagger</code> package.
      </p>

      <h2>Classes</h2>

      <h3><Link href="/api-reference/swagger-ui-route">SwaggerUIRoute</Link></h3>

      <p>
        Extends <code>Route</code>. Serves the Swagger UI HTML page and the <code>apispec.json</code> file.
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

      <h3>ApiSpecRoute</h3>

      <p>
        Extends <code>Route</code>. Serves only the <code>apispec.json</code> file.
        Useful when you want to serve the spec at a different path than the Swagger UI.
      </p>

      <CodeBlock
        language="dart"
        code={`ApiSpecRoute(Directory projectRoot)`}
        showLineNumbers={false}
      />

      <h3><Link href="/api-reference/serverpod-swagger-version">ServerpodSwaggerVersion</Link></h3>

      <p>Version information for the package.</p>

      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>version</code></td>
            <td><code>&apos;1.0.1&apos;</code></td>
          </tr>
          <tr>
            <td><code>minServerpodVersion</code></td>
            <td><code>&apos;3.4.2&apos;</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Data Models</h2>

      <p>These classes can be used with <code>generateOpenApiMap</code> for programmatic spec generation.</p>

      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>SwaggerSpec</code></td>
            <td>Root object containing a map of <code>endpoints</code></td>
          </tr>
          <tr>
            <td><code>SwaggerEndpoint</code></td>
            <td>Named endpoint with a map of <code>methods</code></td>
          </tr>
          <tr>
            <td><code>SwaggerMethod</code></td>
            <td>Named method with <code>parameters</code> map and optional <code>returnType</code></td>
          </tr>
          <tr>
            <td><code>SwaggerParameter</code></td>
            <td>Parameter with <code>name</code>, <code>type</code>, and <code>isNullable</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Functions</h2>

      <h3><code>generateOpenApiMap</code></h3>

      <CodeBlock
        language="dart"
        code={`Map<String, dynamic> generateOpenApiMap(
  SwaggerSpec spec, {
  String? baseUrl,
  Map<String, dynamic>? customInfo,
})`}
        showLineNumbers={false}
      />

      <p>Generates an OpenAPI 3.0 JSON map from a <code>SwaggerSpec</code>.</p>

      <h3><code>generateOpenApiJson</code></h3>

      <CodeBlock
        language="dart"
        code={`String generateOpenApiJson(
  SwaggerSpec spec, {
  String? baseUrl,
  Map<String, dynamic>? customInfo,
})`}
        showLineNumbers={false}
      />

      <p>Same as above but returns a pretty-printed JSON string.</p>

      <h3><code>inferHttpMethod</code></h3>

      <CodeBlock
        language="dart"
        code={`String inferHttpMethod(String methodName)`}
        showLineNumbers={false}
      />

      <p>
        Returns <code>&apos;get&apos;</code>, <code>&apos;post&apos;</code>, <code>&apos;patch&apos;</code>,
        or <code>&apos;delete&apos;</code> based on the method name prefix.
      </p>

      <h2><Link href="/api-reference/cli-options">CLI Options</Link></h2>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate [options]`}
        showLineNumbers={false}
      />

      <p>
        See the <Link href="/api-reference/cli-options">full CLI options reference</Link> for
        all available flags including <code>--base-url</code>, <code>--auth</code>, <code>--update</code>,
        and more.
      </p>
    </div>
  );
}
