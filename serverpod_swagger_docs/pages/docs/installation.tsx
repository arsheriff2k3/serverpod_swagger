import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function Installation() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Installation</h1>

      <p>
        This guide will walk you through the process of installing and setting up Serverpod Swagger in your Serverpod project.
      </p>

      <h2>Prerequisites</h2>

      <p>Before you begin, make sure you have:</p>

      <ul>
        <li>A Serverpod project set up and running</li>
        <li>Dart SDK 3.0.0 or higher</li>
        <li>Serverpod 3.4.2 or higher</li>
      </ul>

      <h2>Adding the Package Dependency</h2>

      <p>
        To add Serverpod Swagger to your project, you need to add it as a dependency in your <code>pubspec.yaml</code> file.
      </p>

      <CodeBlock
        language="yaml"
        code={`dependencies:
  serverpod: ^3.2.3
  serverpod_swagger: ^0.3.0`}
        fileName="pubspec.yaml"
      />

      <p>Then run the following command to install the package:</p>

      <CodeBlock
        language="bash"
        code={`dart pub get`}
      />

      <h2>Project Structure</h2>

      <p>
        After installing the package, your project structure should look something like this:
      </p>

      <CodeBlock
        language="text"
        code={`your_project/
├── your_project_server/
│   ├── lib/
│   │   ├── src/
│   │   │   ├── endpoints/
│   │   │   ├── generated/
│   │   │   └── ...
│   │   └── server.dart
│   ├── pubspec.yaml
│   └── ...
├── your_project_client/
└── your_project_flutter/`}
      />

      <p>
        You'll be primarily working with the server part of your Serverpod project when integrating Swagger.
      </p>

      <h2>Verifying Installation</h2>

      <p>
        To verify that Serverpod Swagger has been installed correctly, you can import it in your <code>server.dart</code> file:
      </p>

      <CodeBlock
        language="dart"
        code={`import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';`}
        fileName="server.dart"
      />

      <p>
        If there are no errors when importing the package, it means the installation was successful.
      </p>

      <h2>Next Steps</h2>

      <p>
        Now that you have installed Serverpod Swagger, you can proceed to:
      </p>

      <ul>
        <li>
          <Link href="/docs/basic-usage" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Learn about basic usage
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration/openapi-generation" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Configure OpenAPI generation
          </Link>
        </li>
        <li>
          <Link href="/docs/configuration/swagger-ui-options" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Customize Swagger UI options
          </Link>
        </li>
      </ul>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 my-4">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Tip:</strong> If you're upgrading from an older version of Serverpod Swagger, make sure to check the
          <Link href="https://github.com/serverpod/serverpod_swagger/blob/main/CHANGELOG.md" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 ml-1">
            changelog
          </Link> for any breaking changes.
        </p>
      </div>
    </div>
  );
}