import React from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Auto Generation',
    desc: 'Parses your Serverpod endpoints and models to produce a complete OpenAPI 3.0 specification automatically.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Smart HTTP Methods',
    desc: 'Infers GET, POST, PATCH, DELETE from method names using naming conventions. No manual configuration needed.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Auth Support',
    desc: 'Built-in support for JWT, API Key, Basic, and OAuth2 authentication schemes with per-endpoint control.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Live Reload',
    desc: 'Swagger UI reads the spec on every request during development. See changes instantly without restarting.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Model Parsing',
    desc: 'Automatically parses YAML model files and resolves cross-module dependencies for complete schema generation.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'XSS Safe',
    desc: 'All user-provided URLs are JSON-encoded before injection into HTML, preventing cross-site scripting attacks.',
  },
];

const httpMethods = [
  { method: 'GET', prefixes: 'get, list, find, fetch, search, count, check', color: 'text-emerald-400' },
  { method: 'POST', prefixes: 'create, add, insert, save, login, send', color: 'text-amber-400' },
  { method: 'PATCH', prefixes: 'update, modify, edit, change, rename', color: 'text-blue-400' },
  { method: 'DELETE', prefixes: 'delete, remove, destroy, clear, revoke', color: 'text-red-400' },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-8">
      {/* Hero */}
      <section className="text-center py-16 relative">
        <div className="inline-block mb-6">
          <span className="badge">v1.0.1 Stable Release</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="gradient-text">Swagger UI</span>
          <br />
          <span className="text-white">for Serverpod</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Automatically generate OpenAPI 3.0 specs from your Serverpod endpoints
          and serve interactive API documentation with a single line of code.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/docs/getting-started" className="btn btn-primary">
            Get Started
          </Link>
          <a
            href="https://github.com/arsheriff2k3/serverpod_swagger"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View on GitHub
          </a>
          <a
            href="https://pub.dev/packages/serverpod_swagger"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            pub.dev
          </a>
        </div>
      </section>

      {/* Quick Start */}
      <section className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Quick Start</h2>
        <p className="text-gray-400 mb-8">Up and running in 3 steps.</p>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 text-sm font-bold flex items-center justify-center">1</span>
              <h3 className="text-base font-semibold text-gray-200">Add the dependency</h3>
            </div>
            <CodeBlock
              language="yaml"
              code={`dependencies:
  serverpod: ">=3.4.2 <4.0.0"
  serverpod_swagger: ^1.0.0`}
              fileName="pubspec.yaml"
              showLineNumbers={false}
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 text-sm font-bold flex items-center justify-center">2</span>
              <h3 className="text-base font-semibold text-gray-200">Register the route & generate</h3>
            </div>
            <CodeBlock
              language="dart"
              code={`import 'dart:io';
import 'package:serverpod_swagger/serverpod_swagger.dart';

// In your server setup:
pod.webServer.addRoute(
  SwaggerUIRoute(Directory.current),
  '/swagger/**',
);`}
              fileName="server.dart"
              showLineNumbers={false}
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 text-sm font-bold flex items-center justify-center">3</span>
              <h3 className="text-base font-semibold text-gray-200">Generate & visit</h3>
            </div>
            <CodeBlock
              language="bash"
              code={`dart run serverpod_swagger:generate --base-url=http://localhost:8080`}
              showLineNumbers={false}
            />
            <p className="text-sm text-gray-500 mt-3">
              Then visit <code className="text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded">http://localhost:8082/swagger/</code>
            </p>
          </div>
        </div>
      </section>

      {/* HTTP Method Detection */}
      <section className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Smart HTTP Method Detection</h2>
        <p className="text-gray-400 mb-6">
          HTTP methods are automatically inferred from your endpoint method names.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {httpMethods.map((m) => (
            <div key={m.method} className="glass-light rounded-xl p-4">
              <span className={`text-sm font-mono font-bold ${m.color}`}>{m.method}</span>
              <p className="text-xs text-gray-500 mt-1 font-mono">{m.prefixes}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-4">
          Unrecognized method names default to POST, matching Serverpod&apos;s RPC-style architecture.
        </p>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Features</h2>
          <p className="text-gray-400">Everything you need for API documentation.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl bg-primary-500/15 text-primary-400 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compatibility */}
      <section className="glass-card p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Compatibility</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: 'Serverpod', value: '>=3.4.2' },
            { label: 'Dart SDK', value: '>=3.5.0' },
            { label: 'OpenAPI', value: '3.0.0' },
            { label: 'Swagger UI', value: '5.18.2' },
          ].map((item) => (
            <div key={item.label} className="glass-light rounded-xl px-6 py-4 min-w-[140px]">
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-lg font-mono font-bold text-primary-400">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to document your API?</h2>
        <p className="text-gray-400 mb-8">Get started in minutes with the full documentation.</p>
        <Link href="/docs/getting-started" className="btn btn-primary">
          Read the Docs
        </Link>
      </section>
    </div>
  );
}
