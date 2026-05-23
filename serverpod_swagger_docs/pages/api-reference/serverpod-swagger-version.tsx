import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function ServerpodSwaggerVersion() {
  return (
    <div className="prose dark:prose-invert">
      <h1>ServerpodSwaggerVersion</h1>

      <p>
        Provides version constants for the package.
      </p>

      <h2>Properties</h2>

      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>version</code></td>
            <td><code>static const String</code></td>
            <td><code>&apos;1.0.1&apos;</code></td>
          </tr>
          <tr>
            <td><code>minServerpodVersion</code></td>
            <td><code>static const String</code></td>
            <td><code>&apos;3.4.2&apos;</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Source</h2>

      <CodeBlock
        language="dart"
        code={`class ServerpodSwaggerVersion {
  static const String version = '1.0.1';
  static const String minServerpodVersion = '3.4.2';
}`}
        showLineNumbers={false}
      />

      <h2>Usage</h2>

      <CodeBlock
        language="dart"
        code={`import 'package:serverpod_swagger/serverpod_swagger.dart';

print('Package version: \${ServerpodSwaggerVersion.version}');
print('Min Serverpod: \${ServerpodSwaggerVersion.minServerpodVersion}');`}
        showLineNumbers={false}
      />

      <h2>Related</h2>

      <ul>
        <li><Link href="/docs/installation">Installation</Link></li>
        <li><Link href="/api-reference/swagger-ui-route">SwaggerUIRoute</Link></li>
      </ul>
    </div>
  );
}
