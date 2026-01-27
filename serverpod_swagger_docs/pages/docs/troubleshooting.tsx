import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function Troubleshooting() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Troubleshooting</h1>

      <p>
        This page provides solutions to common issues you might encounter when using Serverpod Swagger.
      </p>

      <h2>Swagger UI Not Loading</h2>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 my-4">
        <p className="text-red-800 dark:text-red-200 text-sm font-medium">
          Problem: Swagger UI page shows a blank screen or doesn't load properly.
        </p>
      </div>

      <h3>Possible Causes and Solutions</h3>

      <h4>1. Missing trailing slash in the URL</h4>

      <p>
        Make sure you're accessing Swagger UI with a trailing slash in the URL.
      </p>

      <div className="flex items-center space-x-2 my-2">
        <span className="text-red-500">✗</span>
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">http://localhost:8082/swagger</code>
      </div>

      <div className="flex items-center space-x-2 my-2">
        <span className="text-green-500">✓</span>
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">http://localhost:8082/swagger/</code>
      </div>

      <h4>2. Missing or incorrect API specification file</h4>

      <p>
        Ensure that the <code>apispec.json</code> file exists in the correct location and is properly formatted.
      </p>

      <ul>
        <li>Run <code>dart run serverpod_swagger:generate</code> to generate the API specification file.</li>
        <li>Check that the file is created in the project root directory (or the location specified in your configuration).</li>
        <li>Verify that the file contains valid JSON by opening it in a text editor.</li>
      </ul>

      <h4>3. Incorrect route path configuration</h4>

      <p>
        Ensure that the route path in your <code>addRoute</code> call matches the URL you're trying to access.
      </p>

      <CodeBlock
        language="dart"
        code={`final swaggerRoute = SwaggerUIRoute(Directory.current);
pod.webServer.addRoute(swaggerRoute, '/swagger/**');  // This must match the URL path you're accessing`}
        fileName="main.dart"
      />

      <h4>4. Server not running or accessible</h4>

      <p>
        Make sure your Serverpod server is running and accessible at the expected port.
      </p>

      <ul>
        <li>Check that the server is running by accessing other endpoints or the default Serverpod health check endpoint.</li>
        <li>Verify that there are no firewall or network issues preventing access to the server.</li>
      </ul>

      <h2>API Specification Not Found (Custom Paths)</h2>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 my-4">
        <p className="text-red-800 dark:text-red-200 text-sm font-medium">
          Problem: Swagger UI shows "Failed to load API definition" or "Not Found /apispec.json" when using custom mount paths.
        </p>
      </div>

      <h3>Possible Causes and Solutions</h3>

      <h4>1. Missing ApiSpecRoute when using customSpecPath</h4>

      <p>
        If you're using a custom mount path and specified <code>customSpecPath</code>, you must also add an <code>ApiSpecRoute</code> to serve the file at that path.
      </p>

      <CodeBlock
        language="dart"
        code={`// ❌ INCORRECT - Missing ApiSpecRoute
final swaggerRoute = SwaggerUIRoute(
  Directory.current,
  mountPath: '/api/docs/',
  customSpecPath: '/apispec.json',
);
pod.webServer.addRoute(swaggerRoute, '/api/docs/**');

// ✅ CORRECT - Includes ApiSpecRoute
final swaggerRoute = SwaggerUIRoute(
  Directory.current,
  mountPath: '/api/docs/',
  customSpecPath: '/apispec.json',
);
pod.webServer.addRoute(swaggerRoute, '/api/docs/**');

// Add this route to serve apispec.json at root
final apiSpecRoute = ApiSpecRoute(Directory.current);
pod.webServer.addRoute(apiSpecRoute, '/apispec.json');`}
        fileName="main.dart"
      />

      <h4>2. Incorrect projectRoot directory</h4>

      <p>
        The <code>projectRoot</code> parameter should point to the directory containing your <code>apispec.json</code> file.
      </p>

      <ul>
        <li>Verify that <code>apispec.json</code> exists in the directory you're passing to <code>SwaggerUIRoute</code></li>
        <li>Use <code>Directory.current</code> if the file is in your project root</li>
        <li>Check server logs to see what path it's trying to read from</li>
      </ul>

      <h4>3. Route pattern mismatch</h4>

      <p>
        Ensure your route pattern matches your mount path configuration.
      </p>

      <CodeBlock
        language="dart"
        code={`// ❌ INCORRECT - Pattern doesn't match mountPath
final swaggerRoute = SwaggerUIRoute(
  Directory.current,
  mountPath: '/api/docs/',
);
pod.webServer.addRoute(swaggerRoute, '/swagger/**'); // Wrong!

// ✅ CORRECT - Pattern matches mountPath
final swaggerRoute = SwaggerUIRoute(
  Directory.current,
  mountPath: '/api/docs/',
);
pod.webServer.addRoute(swaggerRoute, '/api/docs/**'); // Correct!`}
        fileName="main.dart"
      />

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-4">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Tip:</strong> For most cases, use the default configuration without custom paths. Only use custom paths if you have a specific requirement. See the{' '}
          <Link href="/docs/configuration/custom-paths" className="underline">
            Custom Paths documentation
          </Link>{' '}
          for more details.
        </p>
      </div>

      <h2>OpenAPI Generation Issues</h2>


      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 my-4">
        <p className="text-red-800 dark:text-red-200 text-sm font-medium">
          Problem: Errors when running the OpenAPI generation script or missing endpoints in the generated specification.
        </p>
      </div>

      <h3>Possible Causes and Solutions</h3>

      <h4>1. Syntax errors in protocol definitions</h4>

      <p>
        Check your protocol definition files for syntax errors or unsupported constructs.
      </p>

      <ul>
        <li>Run <code>dart analyze</code> to check for syntax errors in your code.</li>
        <li>Fix any reported issues and try generating the specification again.</li>
      </ul>

      <h4>2. Missing or incorrect annotations</h4>

      <p>
        Ensure that your endpoints have the required annotations for proper OpenAPI generation.
      </p>

      <CodeBlock
        language="dart"
        code={`// Missing @Route annotation\nFuture<User> getUser(Session session, int id); // This won't be included in the OpenAPI spec\n\n// Correct annotation\n@Route('/users/:id')\nFuture<User> getUser(Session session, int id); // This will be included`}
        fileName="example.dart"
      />

      <h4>3. Unsupported data types</h4>

      <p>
        Some complex or custom data types might not be automatically handled by the generator.
      </p>

      <ul>
        <li>Define custom schemas for complex types in an <code>openapi_schemas.yaml</code> file.</li>
        <li>Use simpler data types where possible.</li>
        <li>Check the generator output for warnings about unsupported types.</li>
      </ul>

      <h4>4. Generator script not finding protocol files</h4>

      <p>
        The generator might not be finding your protocol files due to incorrect paths or project structure.
      </p>

      <ul>
        <li>Ensure your protocol files are in the expected location (usually <code>lib/protocol</code>).</li>
        <li>Run the generator with verbose output to see which files it's processing.</li>
        <li>Check that your project structure follows the standard Serverpod conventions.</li>
      </ul>

      <h2>Authentication Issues</h2>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 my-4">
        <p className="text-red-800 dark:text-red-200 text-sm font-medium">
          Problem: Authentication not working in Swagger UI or missing authentication options.
        </p>
      </div>

      <h3>Possible Causes and Solutions</h3>

      <h4>1. Missing security definitions</h4>

      <p>
        Ensure that you've defined the security schemes in your OpenAPI specification.
      </p>

      <ul>
        <li>Create an <code>openapi_security.yaml</code> file with your security definitions.</li>
        <li>Regenerate the OpenAPI specification to include the security definitions.</li>
      </ul>

      <h4>2. Incorrect security configuration</h4>

      <p>
        Check that your security configuration is correctly formatted and uses supported schemes.
      </p>

      <CodeBlock
        language="yaml"
        code={`# Incorrect format (missing type)\nsecurity:\n  - BearerAuth: []\n\ncomponents:\n  securitySchemes:\n    BearerAuth:\n      scheme: bearer\n      bearerFormat: JWT\n\n# Correct format\nsecurity:\n  - BearerAuth: []\n\ncomponents:\n  securitySchemes:\n    BearerAuth:\n      type: http\n      scheme: bearer\n      bearerFormat: JWT`}
        fileName="openapi_security.yaml"
      />

      <h4>3. CORS issues</h4>

      <p>
        Cross-Origin Resource Sharing (CORS) issues might prevent authentication from working properly.
      </p>

      <ul>
        <li>Ensure your server has appropriate CORS headers configured.</li>
        <li>Check the browser console for CORS-related errors.</li>
        <li>Consider using a CORS proxy for testing if needed.</li>
      </ul>

      <h4>4. Missing implementation in server code</h4>

      <p>
        Remember that Swagger UI only provides the interface for authentication; you need to implement the actual authentication logic in your server code.
      </p>

      <ul>
        <li>Implement appropriate authentication interceptors in your Serverpod server.</li>
        <li>Ensure your server code validates the authentication credentials properly.</li>
      </ul>

      <h2>Try-It-Out Feature Not Working</h2>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 my-4">
        <p className="text-red-800 dark:text-red-200 text-sm font-medium">
          Problem: The "Try it out" feature in Swagger UI doesn't work or returns errors.
        </p>
      </div>

      <h3>Possible Causes and Solutions</h3>

      <h4>1. CORS issues</h4>

      <p>
        Cross-Origin Resource Sharing (CORS) issues are a common cause of problems with the "Try it out" feature.
      </p>

      <ul>
        <li>Configure your server to allow CORS requests from the Swagger UI origin.</li>
        <li>Add appropriate CORS headers to your server responses.</li>
      </ul>

      <CodeBlock
        language="dart"
        code={`// Add CORS headers to your server responses\nsession.response.headers.add('Access-Control-Allow-Origin', '*');\nsession.response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');\nsession.response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');`}
        fileName="example_endpoint.dart"
      />

      <h4>2. Incorrect server URL</h4>

      <p>
        The server URL in your OpenAPI specification might be incorrect or inaccessible from the browser.
      </p>

      <ul>
        <li>Check the server URL in your OpenAPI specification.</li>
        <li>Ensure the URL is accessible from the browser where you're using Swagger UI.</li>
        <li>Update the server URL if needed and regenerate the specification.</li>
      </ul>

      <h4>3. Authentication issues</h4>

      <p>
        If your endpoints require authentication, make sure you've properly authenticated in Swagger UI before using the "Try it out" feature.
      </p>

      <ul>
        <li>Click the "Authorize" button in Swagger UI and provide the required credentials.</li>
        <li>Check that the authentication is working properly by examining the request headers in the browser's developer tools.</li>
      </ul>

      <h4>4. Endpoint implementation issues</h4>

      <p>
        The endpoint implementation in your server might have issues that prevent it from working properly.
      </p>

      <ul>
        <li>Test the endpoint directly using a tool like cURL or Postman to verify it works outside of Swagger UI.</li>
        <li>Check your server logs for errors when the endpoint is called.</li>
        <li>Ensure the endpoint implementation matches the OpenAPI specification.</li>
      </ul>

      <h2>Still Having Issues?</h2>

      <p>
        If you're still experiencing problems after trying the solutions above, you can:
      </p>

      <ul>
        <li>
          <a href="https://github.com/arsheriff2k3/serverpod_swagger/issues" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Open an issue on GitHub
          </a>
        </li>
        <li>
          <a href="https://serverpod.dev/community" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Ask for help in the Serverpod community
          </a>
        </li>
        <li>
          <Link href="/docs/getting-started" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Review the getting started guide
          </Link>
        </li>
      </ul>
    </div>
  );
}