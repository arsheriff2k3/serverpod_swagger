# Serverpod Swagger

A package to automatically generate and serve Swagger UI for a Serverpod backend. This package makes it easy to add interactive API documentation to your Serverpod project.

## Features

- Automatically generates OpenAPI 3.0 specification from Serverpod endpoint classes and YAML models
- Serves Swagger UI directly from your Serverpod server (CDN-based, no bundled assets)
- Smart HTTP method detection from naming conventions:
  - **GET**: `get*`, `list*`, `find*`, `fetch*`, `search*`, `count*`, `check*`, `has*`, `is*`, `exists*`, `lookup*`
  - **POST**: `create*`, `add*`, `insert*`, `save*`, `login*`, `send*`, `submit*`, `upload*`, `generate*`
  - **PATCH**: `update*`, `modify*`, `edit*`, `change*`, `set*`, `rename*`, `toggle*`
  - **DELETE**: `delete*`, `remove*`, `destroy*`, `clear*`, `revoke*`, `cancel*`, `purge*`
  - **Default**: POST (Serverpod endpoints are RPC-style)
- Comprehensive model parsing with enum support, cross-module dependency resolution
- Flexible authentication configuration (JWT, API Key, Basic, OAuth2)
- XSS-safe HTML generation
- Live reload during development (re-reads apispec.json on every request)

## Requirements

- Serverpod >=3.4.2
- Dart SDK >=3.5.0

## Installation

Add the package to your `pubspec.yaml` file:

```yaml
dependencies:
  serverpod_swagger: ^1.0.0
```

Then run:

```bash
dart pub get
```

## Quick Start

### 1. Register the Swagger UI route

In your server's main file (typically `bin/server.dart`):

```dart
import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void main(List<String> args) async {
  final pod = Serverpod(args, Protocol(), Endpoints());

  pod.webServer.addRoute(
    SwaggerUIRoute(Directory.current),
    '/swagger/**',
  );

  await pod.start();
}
```

### 2. Generate the OpenAPI specification

```bash
dart run serverpod_swagger:generate --base-url=http://localhost:8082
```

This creates an `apispec.json` file in your project root.

### 3. Visit the Swagger UI

```
http://localhost:8082/swagger/
```

The package automatically handles redirection from `/swagger` to `/swagger/`.

---

## Command-Line Reference

| Argument | Description | Example |
| --- | --- | --- |
| `--base-url` | Base URL for your API server | `--base-url=https://api.example.com` |
| `--auth` | Authentication type (jwt, bearer, apikey, basic, oauth2) | `--auth=jwt` |
| `--auth-description` | Custom description for the auth scheme | `--auth-description="JWT from /auth"` |
| `--secure-endpoints` | Comma-separated endpoints to secure | `--secure-endpoints=users,posts/create` |
| `--unsecure-endpoints` | Comma-separated endpoints to exclude from security | `--unsecure-endpoints=health,status` |
| `--secure-single-url` | Secure a specific URL endpoint | `--secure-single-url=/auth/getCurrentUser` |
| `--unsecure-single-url` | Unsecure a specific URL endpoint | `--unsecure-single-url=/public/info` |
| `--http-method` | Override HTTP method for an endpoint | `--http-method=profile/user:post` |
| `--update` | Update existing spec instead of regenerating | `--update` |
| `--unauth` / `--disable-auth` | Disable authentication globally | `--unauth` |
| `--verbose` | Display detailed generation info | `--verbose` |

---

## HTTP Method Detection

HTTP methods are **automatically inferred** from endpoint method names using naming conventions. No manual configuration is needed for most cases.

### How It Works

| HTTP Method | Detected When Method Name Starts With |
| --- | --- |
| **GET** | get, list, fetch, find, read, retrieve, query, search, show, view, load, count, check, has, is, exists, lookup |
| **POST** | create, add, insert, save, register, execute, run, perform, login, send, submit, upload, import, process, trigger, start, init, generate, compute |
| **PATCH** | update, modify, patch, edit, change, set, put, replace, adjust, rename, move, toggle |
| **DELETE** | delete, remove, destroy, drop, clear, unlink, unregister, revoke, cancel, purge |
| **Default** | POST (for unrecognized names — Serverpod endpoints are RPC-style) |

### Parameter Placement

- **GET with primitive params**: Parameters placed in **query string**
- **GET with complex params**: Automatically falls back to **POST with request body**
- **POST / PATCH / DELETE**: Parameters placed in **JSON request body**
- Non-nullable parameters are marked as `required` in request body schemas

### Override

```bash
# Override a single endpoint
dart run serverpod_swagger:generate --http-method=profile/user:post --base-url=http://localhost:8082

# Override multiple endpoints
dart run serverpod_swagger:generate \
  --http-method=profile/user:post \
  --http-method=users/create:put \
  --http-method=documents/delete:delete \
  --base-url=http://localhost:8082
```

---

## Authentication

### Supported Auth Types

| Type | OpenAPI Scheme | Details |
| --- | --- | --- |
| `jwt` | HTTP Bearer (JWT) | Bearer token with JWT format |
| `bearer` | HTTP Bearer | Generic bearer token |
| `apikey` | API Key | `X-API-Key` header |
| `basic` | HTTP Basic | Username/password |
| `oauth2` | OAuth 2.0 | Implicit flow with read/write scopes |

### Examples

```bash
# Secure all endpoints with JWT
dart run serverpod_swagger:generate --auth=jwt --base-url=https://api.example.com

# With custom description
dart run serverpod_swagger:generate --auth=jwt --auth-description="JWT from /auth endpoint" --base-url=https://api.example.com

# Secure specific endpoints only
dart run serverpod_swagger:generate --auth=jwt --secure-endpoints=users,posts/create,comments/delete

# Secure a single URL
dart run serverpod_swagger:generate --auth=jwt --secure-single-url=/auth/getCurrentUser --base-url=http://localhost:8082

# Unsecure specific endpoints (rest are secured)
dart run serverpod_swagger:generate --auth=jwt --unsecure-endpoints=health,status,public/posts

# Disable auth globally (preserves config)
dart run serverpod_swagger:generate --auth=jwt --unauth
```

### Security Priority

1. `--secure-single-url` / `--unsecure-single-url` — highest priority
2. `--unsecure-endpoints` — next highest
3. `--secure-endpoints` — next
4. Global default — if `--auth` is set with no lists, all endpoints are secured

---

## Model Parsing and Schema Generation

The generator parses Serverpod's YAML model files (`.yaml` and `.spy.yaml`) from `lib/src/models/` to create accurate OpenAPI schemas.

### Type Mapping

| Dart/YAML Type | OpenAPI Schema |
| --- | --- |
| `String` | `string` |
| `int` | `integer` (int64) |
| `double` | `number` (double) |
| `num` | `number` |
| `bool` | `boolean` |
| `DateTime` | `string` (date-time) |
| `ByteData` | `string` (byte) |
| `Duration` | `string` (ISO 8601) |
| `Uri` | `string` (uri) |
| `UuidValue` | `string` (uuid) |
| `List<T>` | `array` (with typed items) |
| `Map<K,V>` | `object` (additionalProperties) |
| Enum types | `string` with `enum` values |
| Custom classes | `$ref` to schema definition |

### Cross-Module Dependencies

When the generator encounters references to models from other Serverpod modules, it automatically:

1. Identifies the module and class name
2. Locates the model file via `package_config.json`
3. Recursively parses the dependency and adds it to schemas

### Nullability

- Non-nullable fields → added to `required` array
- Nullable fields (with `?` suffix) → optional
- Applied consistently to YAML models and Dart endpoint parameters

---

## Endpoint Detection

The generator uses the Dart `analyzer` to parse files in `lib/src/generated/endpoints/`:

1. Finds classes extending `Endpoint`
2. Converts class names to camelCase paths (e.g., `GreetingEndpoint` → `greeting`)
3. Extracts public methods as API operations
4. Analyzes parameter types and return types
5. Infers HTTP method from method name
6. Generates paths as `/{endpointName}/{methodName}`

### Excluded Methods

- Private methods (starting with `_`)
- Serverpod lifecycle methods: `initialize`, `streamOpened`, `streamClosed`, `handleStreamMessage`
- The `Session` parameter is always excluded

### Response Schema

- `Future<T>` is unwrapped to `T`
- `void` / `Null` return types produce no response body
- Complex return types generate `$ref` references to component schemas
- All operations include `400` and `500` error responses

---

## Update Mode

Modify an existing `apispec.json` without regenerating from source:

```bash
# Update HTTP method
dart run serverpod_swagger:generate --update --http-method=greeting/hello:post

# Update base URL
dart run serverpod_swagger:generate --update --base-url=https://api.example.com

# Update authentication
dart run serverpod_swagger:generate --update --auth=apikey
```

Falls back to full regeneration if `apispec.json` doesn't exist.

---

## Custom Path Setup

Mount Swagger UI at a custom path with a separate spec route:

```dart
// Swagger UI at /docs/, spec served from /apispec.json
pod.webServer.addRoute(
  SwaggerUIRoute(
    Directory.current,
    mountPath: '/docs/',
    customSpecPath: '/apispec.json',
  ),
  '/docs/**',
);
pod.webServer.addRoute(
  ApiSpecRoute(Directory.current),
  '/apispec.json',
);
```

---

## Programmatic Spec Generation

You can also generate specs programmatically using the exported API:

```dart
import 'package:serverpod_swagger/serverpod_swagger.dart';

final spec = SwaggerSpec();
final endpoint = SwaggerEndpoint('greeting');
final method = SwaggerMethod('hello');
method.parameters['name'] = SwaggerParameter(
  name: 'name', type: 'String', isNullable: false,
);
method.returnType = 'String';
endpoint.methods['hello'] = method;
spec.endpoints['greeting'] = endpoint;

final json = generateOpenApiJson(
  spec,
  baseUrl: 'http://localhost:8080',
  customInfo: {'title': 'My API', 'version': '1.0.0'},
);
```

---

## Environment-Specific Generation

```bash
# Development (auth disabled)
dart run serverpod_swagger:generate --auth=jwt --unauth --base-url=http://localhost:8082

# Testing (specific endpoints secured)
dart run serverpod_swagger:generate --auth=jwt --secure-endpoints=users,posts --base-url=https://test-api.example.com

# Production (everything secured except health)
dart run serverpod_swagger:generate --auth=jwt --unsecure-endpoints=health,status --base-url=https://api.example.com
```

---

## Troubleshooting

| Issue | Solution |
| --- | --- |
| "localhost page can't be found" | Verify server is running on the correct port (usually 8082) |
| Swagger UI can't load apispec.json at custom path | Provide `customSpecPath: '/apispec.json'` and add an `ApiSpecRoute` |
| Empty API documentation | Verify `apispec.json` exists and the correct project root is passed |
| "Try it out" sends to wrong host | Regenerate with `--base-url` matching your server |
| Missing endpoints | Ensure classes extend `Endpoint` and methods are public |
| Wrong HTTP method | Use `--http-method=path:method` to override |
| Auth not working | Verify `--auth` type and check which endpoints are secured |
| Incomplete schemas | Ensure YAML model files are valid and dependencies accessible |
| Complex params on GET | Auto-falls back to POST — this is expected behavior |

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
