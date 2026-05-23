import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function CLIOptions() {
  return (
    <div className="prose dark:prose-invert">
      <h1>CLI Options</h1>

      <p>
        Generate an OpenAPI specification from your Serverpod endpoints using the CLI tool.
      </p>

      <h2>Basic Usage</h2>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate [options]`}
        showLineNumbers={false}
      />

      <h2>Available Options</h2>

      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--base-url</code></td>
            <td>Sets the server URL for &quot;Try it out&quot; in Swagger UI</td>
            <td><code>--base-url=http://localhost:8080</code></td>
          </tr>
          <tr>
            <td><code>--auth</code></td>
            <td>Authentication type: <code>jwt</code>, <code>apikey</code>, <code>basic</code>, <code>oauth2</code></td>
            <td><code>--auth=jwt</code></td>
          </tr>
          <tr>
            <td><code>--auth-description</code></td>
            <td>Custom description for the auth scheme</td>
            <td><code>--auth-description=&quot;Bearer token&quot;</code></td>
          </tr>
          <tr>
            <td><code>--secure-endpoints</code></td>
            <td>Comma-separated list of endpoints to secure (others left unsecured)</td>
            <td><code>--secure-endpoints=users,admin</code></td>
          </tr>
          <tr>
            <td><code>--unsecure-endpoints</code></td>
            <td>Comma-separated list of endpoints to exclude from security</td>
            <td><code>--unsecure-endpoints=health,public</code></td>
          </tr>
          <tr>
            <td><code>--secure-single-url</code></td>
            <td>Secure a single specific path</td>
            <td><code>--secure-single-url=/users/getProfile</code></td>
          </tr>
          <tr>
            <td><code>--unsecure-single-url</code></td>
            <td>Unsecure a single specific path</td>
            <td><code>--unsecure-single-url=/health/check</code></td>
          </tr>
          <tr>
            <td><code>--http-method</code></td>
            <td>Override the HTTP method for a specific path</td>
            <td><code>--http-method=/users/create:post</code></td>
          </tr>
          <tr>
            <td><code>--unauth</code></td>
            <td>Globally disable authentication on all endpoints</td>
            <td><code>--unauth</code></td>
          </tr>
          <tr>
            <td><code>--update</code></td>
            <td>Update existing <code>apispec.json</code> instead of regenerating</td>
            <td><code>--update</code></td>
          </tr>
          <tr>
            <td><code>--verbose</code></td>
            <td>Show detailed output during generation</td>
            <td><code>--verbose</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Examples</h2>

      <h3>Generate with JWT Auth</h3>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate \\
  --base-url=http://localhost:8080 \\
  --auth=jwt`}
        showLineNumbers={false}
      />

      <h3>Secure Specific Endpoints Only</h3>

      <CodeBlock
        language="bash"
        code={`dart run serverpod_swagger:generate \\
  --base-url=http://localhost:8080 \\
  --auth=jwt \\
  --secure-endpoints=users,admin \\
  --unsecure-endpoints=health`}
        showLineNumbers={false}
      />

      <h3>Update Existing Spec</h3>

      <CodeBlock
        language="bash"
        code={`# Change base URL without regenerating
dart run serverpod_swagger:generate --update --base-url=https://api.example.com

# Add auth to existing spec
dart run serverpod_swagger:generate --update --auth=jwt

# Override HTTP method for a path
dart run serverpod_swagger:generate --update --http-method=/users/create:post`}
        showLineNumbers={false}
      />

      <h2>HTTP Method Detection</h2>

      <p>
        By default, HTTP methods are inferred from endpoint method names:
      </p>

      <table>
        <thead>
          <tr>
            <th>HTTP Method</th>
            <th>Method Name Prefixes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>GET</code></td>
            <td><code>get</code>, <code>list</code>, <code>find</code>, <code>fetch</code>, <code>search</code>, <code>count</code>, <code>check</code>, <code>has</code>, <code>is</code>, <code>exists</code></td>
          </tr>
          <tr>
            <td><code>POST</code></td>
            <td><code>create</code>, <code>add</code>, <code>insert</code>, <code>save</code>, <code>login</code>, <code>send</code>, <code>submit</code>, <code>upload</code></td>
          </tr>
          <tr>
            <td><code>PATCH</code></td>
            <td><code>update</code>, <code>modify</code>, <code>edit</code>, <code>change</code>, <code>rename</code>, <code>toggle</code></td>
          </tr>
          <tr>
            <td><code>DELETE</code></td>
            <td><code>delete</code>, <code>remove</code>, <code>destroy</code>, <code>clear</code>, <code>revoke</code>, <code>cancel</code></td>
          </tr>
        </tbody>
      </table>

      <p>
        Unrecognized names default to <code>POST</code>. Use <code>--http-method</code> to override.
      </p>

      <h2>Related</h2>

      <ul>
        <li><Link href="/api-reference/swagger-ui-route">SwaggerUIRoute</Link></li>
        <li><Link href="/docs/configuration/authentication">Authentication</Link></li>
      </ul>
    </div>
  );
}
