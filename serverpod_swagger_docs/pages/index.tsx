import React from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Serverpod Swagger
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Automatically generate and serve Swagger UI for your Serverpod backend
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/docs/getting-started" className="btn btn-primary">
            Get Started
          </Link>
          <a
            href="https://github.com/arsheriff2k3/serverpod_swagger"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="card">
        <h2 className="heading-2">What is Serverpod Swagger?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Serverpod Swagger is a package that automatically generates OpenAPI specifications from your Serverpod protocol definitions and serves a Swagger UI interface directly from your Serverpod server. This makes it easy to document and test your API endpoints during development.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Automatic Generation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automatically generates OpenAPI 3.0 specifications from your Serverpod protocol definitions.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Interactive UI</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Serves Swagger UI directly from your Serverpod server for interactive API documentation and testing.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Easy Integration</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simple to integrate with just a few lines of code in your Serverpod server setup.
            </p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="heading-2">Quick Start</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get started with Serverpod Swagger in just a few steps:
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Add the package to your pubspec.yaml</h3>
            <CodeBlock
              language="yaml"
              code={`dependencies:
  serverpod: ^3.2.3
  serverpod_swagger: ^0.3.0`}
              fileName="pubspec.yaml"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">2. Add the Swagger UI route to your server</h3>
            <CodeBlock
              language="dart"
              code={`import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(
    args,
    Protocol(),
    Endpoints(),
  );
  
  // Add the Swagger UI route
  final swaggerRoute = SwaggerUIRoute(Directory.current);
  pod.webServer.addRoute(swaggerRoute, '/swagger/**');
  
  // Start the server
  await pod.start();
}`}
              fileName="main.dart"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">3. Generate the OpenAPI specification</h3>
            <CodeBlock
              language="bash"
              code={`dart run serverpod_swagger:generate`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">4. Access the Swagger UI</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Start your Serverpod server and navigate to <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">http://localhost:8082/swagger/</code> in your browser.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/docs/getting-started" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
            Learn more in the documentation →
          </Link>
        </div>
      </section>

      <section className="card">
        <h2 className="heading-2">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Automatic OpenAPI 3.0 specification generation from Serverpod protocol definitions</li>
          <li>Support for all Serverpod data types and custom classes</li>
          <li>Interactive Swagger UI for testing endpoints</li>
          <li>Customizable authentication schemes</li>
          <li>HTTP method customization</li>
          <li>Live-reloading during development</li>
          <li>Compatible with Serverpod 3.4.2 and higher</li>
        </ul>
      </section>
    </div>
  );
}