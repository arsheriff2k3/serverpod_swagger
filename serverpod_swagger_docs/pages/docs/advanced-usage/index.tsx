import React from 'react';
import Link from 'next/link';

export default function AdvancedUsage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Advanced Usage</h1>

      <p>
        Learn how the generator handles schemas, responses, and cross-module dependencies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 not-prose">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Schema Generation</h3>
          <p className="text-gray-400 text-sm mb-4">
            How YAML models and Dart types are automatically converted to OpenAPI schemas,
            including type mapping and cross-module resolution.
          </p>
          <Link href="/docs/advanced-usage/custom-schemas" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
            Learn more &rarr;
          </Link>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Responses &amp; Request Bodies</h3>
          <p className="text-gray-400 text-sm mb-4">
            How responses (200, 400, 500) and request bodies with required fields
            are generated from your endpoint method signatures.
          </p>
          <Link href="/docs/advanced-usage/response-examples" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
            Learn more &rarr;
          </Link>
        </div>
      </div>

      <h2>Related</h2>

      <ul>
        <li><Link href="/docs/configuration/authentication">Authentication</Link> &mdash; Configure auth schemes via CLI</li>
        <li><Link href="/api-reference/cli-options">CLI Options</Link> &mdash; All available generator flags</li>
        <li><Link href="/examples">Examples</Link> &mdash; Practical usage examples</li>
      </ul>
    </div>
  );
}
