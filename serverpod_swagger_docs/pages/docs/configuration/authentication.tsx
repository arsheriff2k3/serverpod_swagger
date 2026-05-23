import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function Authentication() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Authentication Configuration</h1>

      <p>
        The <code>serverpod_swagger</code> generator can add OpenAPI security schemes to your
        API specification via CLI flags. This page explains how to configure authentication
        for your generated documentation.
      </p>

      <h2>Setting an Auth Type</h2>

      <p>
        Use the <code>--auth</code> flag to define a security scheme. When an auth type is set,
        all endpoints are secured by default.
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --auth=jwt`}
        showLineNumbers={false}
      />

      <p>Supported auth types:</p>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-4">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Value</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">OpenAPI Scheme</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>jwt</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">HTTP Bearer with JWT format</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>apikey</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">API Key in header (<code>X-API-Key</code>)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>basic</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">HTTP Basic authentication</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"><code>oauth2</code></td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">OAuth 2.0 implicit flow</td>
          </tr>
        </tbody>
      </table>

      <h2>Custom Auth Description</h2>

      <p>
        You can provide a custom description for the security scheme:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --auth=jwt --auth-description="Provide your JWT token from the /login endpoint"`}
        showLineNumbers={false}
      />

      <h2>Controlling Which Endpoints Are Secured</h2>

      <p>
        By default, when <code>--auth</code> is provided, all endpoints are secured.
        You can control this with the following flags:
      </p>

      <h3>Secure specific endpoints only</h3>

      <p>
        When <code>--secure-endpoints</code> is provided, only the listed endpoints are secured.
        Everything else is left unsecured.
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --auth=jwt --secure-endpoints=admin,user/deleteAccount`}
        showLineNumbers={false}
      />

      <p>
        You can specify an entire endpoint class (e.g., <code>admin</code>) or a specific
        method (e.g., <code>user/deleteAccount</code>).
      </p>

      <h3>Unsecure specific endpoints</h3>

      <p>
        When <code>--unsecure-endpoints</code> is provided, those endpoints are explicitly
        left open while the rest follow the default policy.
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --auth=jwt --unsecure-endpoints=auth/login,auth/register`}
        showLineNumbers={false}
      />

      <h3>Single URL overrides</h3>

      <p>
        For fine-grained control, you can secure or unsecure a single path:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --auth=jwt \\
  --secure-single-url=/admin/dashboard \\
  --unsecure-single-url=/status/health`}
        showLineNumbers={false}
      />

      <h2>Disabling Auth Globally</h2>

      <p>
        To remove all security definitions from every endpoint:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --unauth`}
        showLineNumbers={false}
      />

      <p>
        The <code>--disable-auth</code> flag is an alias for <code>--unauth</code>.
      </p>

      <h2>Updating Auth on an Existing Spec</h2>

      <p>
        Use <code>--update</code> to modify security settings on an existing <code>apispec.json</code>
        without regenerating the entire spec from source:
      </p>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate --update --auth=apikey --unsecure-endpoints=public`}
        showLineNumbers={false}
      />

      <h2>Testing Authentication in Swagger UI</h2>

      <p>
        Once your spec includes a security scheme, the Swagger UI will show an "Authorize"
        button. Click it, enter your credentials, and test authenticated endpoints directly
        from the browser.
      </p>

      <h2>Next Steps</h2>

      <ul>
        <li>
          <Link href="/docs/configuration/openapi-generation" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            OpenAPI generation options
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration/swagger-ui-options" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Swagger UI route configuration
          </Link>
        </li>
      </ul>
    </div>
  );
}
