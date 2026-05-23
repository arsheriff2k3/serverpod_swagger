# Serverpod Swagger Documentation

## Overview

`serverpod_swagger` automatically generates OpenAPI 3.0 specifications from your Serverpod endpoints and serves interactive Swagger UI documentation. It uses the Dart `analyzer` to parse your endpoint classes and YAML model files to produce accurate API schemas.

**Version**: 1.0.1
**Serverpod**: >=3.4.2 <4.0.0
**Dart SDK**: >=3.5.0 <4.0.0

## Quick Start

### 1. Add the dependency

```yaml
# pubspec.yaml
dependencies:
  serverpod: ">=3.4.2 <4.0.0"
  serverpod_swagger: ^1.0.0
```

### 2. Register the route

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

### 3. Generate and visit

```bash
dart run serverpod_swagger:generate --base-url=http://localhost:8080
```

Visit `http://localhost:8082/swagger/` to see your interactive API docs.

---

## Command-Line Reference

| Argument | Description | Example |
| --- | --- | --- |
| `--base-url=<URL>` | Sets the base URL for the API server | `--base-url=http://localhost:8082` |
| `--auth=<TYPE>` | Authentication type (jwt, bearer, apikey, basic, oauth2) | `--auth=jwt` |
| `--auth-description=<TEXT>` | Custom description for the auth method | `--auth-description="API key"` |
| `--secure-endpoints=<LIST>` | Comma-separated endpoints to secure | `--secure-endpoints=users/profile,auth/login` |
| `--unsecure-endpoints=<LIST>` | Comma-separated endpoints to leave unsecured | `--unsecure-endpoints=public/info` |
| `--secure-single-url=<URL>` | Secure a single URL endpoint | `--secure-single-url=/auth/login` |
| `--unsecure-single-url=<URL>` | Leave a single URL endpoint unsecured | `--unsecure-single-url=/public/info` |
| `--http-method=<PATH:METHOD>` | Override HTTP method for an endpoint | `--http-method=users/create:post` |
| `--unauth` / `--disable-auth` | Globally disable authentication | `--disable-auth` |
| `--verbose` | Display detailed generation info | `--verbose` |
| `--update` | Update existing spec instead of regenerating | `--update` |

---

## Smart HTTP Method Detection

HTTP methods are **automatically inferred** from your endpoint method names using naming conventions. This is the default behavior — no configuration needed.

| HTTP Method | Prefixes |
| --- | --- |
| **GET** | get, list, fetch, find, read, retrieve, query, search, show, view, load, count, check, has, is, exists, lookup |
| **POST** | create, add, insert, save, register, execute, run, perform, login, send, submit, upload, import, process, trigger, start, init, generate, compute |
| **PATCH** | update, modify, patch, edit, change, set, put, replace, adjust, rename, move, toggle |
| **DELETE** | delete, remove, destroy, drop, clear, unlink, unregister, revoke, cancel, purge |
| **Default** | POST (Serverpod endpoints are RPC-style POST by default) |

### Parameter Placement

- **GET with primitive params only**: Parameters placed in **query string**
- **GET with complex params**: Falls back to **POST with request body** (Serverpod can't serve GET with complex body params)
- **POST / PATCH / DELETE**: Parameters placed in **JSON request body**
- Non-nullable parameters are automatically added to the `required` array in request body schemas

### Override

You can override the auto-detected method using `--http-method`:

```bash
dart run serverpod_swagger:generate --http-method=profile/user:post --base-url=http://localhost:8082
```

Multiple overrides:

```bash
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
| custom | API Key | `Authorization` header |

### Security Policy Rules

1. **Explicit overrides** (`--secure-single-url` / `--unsecure-single-url`) always take precedence
2. **Priority order**:
   - `--unsecure-endpoints` list has highest priority
   - `--secure-endpoints` list is next
   - Global settings applied last
3. **Default behavior**:
   - `--auth` alone: all endpoints are secured
   - `--secure-endpoints` provided: only listed endpoints are secured, rest unsecured
   - `--unsecure-endpoints` only: all secured except listed
   - `--disable-auth`: all endpoints unsecured

### Examples

Secure all endpoints with JWT:

```bash
dart run serverpod_swagger:generate --auth=jwt --base-url=http://localhost:8082
```

Secure specific endpoints only:

```bash
dart run serverpod_swagger:generate --auth=jwt --secure-endpoints=users/profile,auth/getCurrentUser --base-url=http://localhost:8082
```

Secure a single URL:

```bash
dart run serverpod_swagger:generate --auth=jwt --secure-single-url=/auth/getCurrentUser --base-url=http://localhost:8082
```

---

## Model Parsing and Schema Generation

### YAML Model Parsing

The generator automatically parses Serverpod's YAML model files (`.yaml` and `.spy.yaml`) from `lib/src/models/`. It extracts:

- Class definitions and field names
- Field types and nullability
- Required vs optional fields

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

When the generator encounters references to models from other Serverpod modules:

1. Identifies the module and class name from the type reference
2. Locates the model file via `package_config.json`
3. Recursively parses the dependency and adds it to schemas

This ensures all referenced models are included in the specification.

### Nullability

- Non-nullable fields are added to the `required` array
- Nullable fields (with `?` suffix) are optional
- Applied consistently to both YAML models and Dart endpoint parameters

---

## Endpoint Detection

### How It Works

The generator uses the Dart `analyzer` to parse files in `lib/src/generated/endpoints/`:

1. Finds classes that extend `Endpoint`
2. Converts class names to camelCase endpoint paths (e.g., `GreetingEndpoint` → `greeting`)
3. Extracts public methods as API operations
4. Analyzes parameter types and return types for schema generation
5. Infers HTTP method from method name

### Excluded Methods

The following are automatically excluded from the specification:

- Private methods (starting with `_`)
- Serverpod lifecycle methods: `initialize`, `streamOpened`, `streamClosed`, `handleStreamMessage`
- The `Session` parameter is always excluded from API params

### Path Format

Each endpoint method generates a path: `/{endpointName}/{methodName}`

- **Operation ID**: `{endpointName}.{methodName}`
- **Tags**: Grouped by endpoint name in Swagger UI

### Response Schema

Return types are automatically mapped to response schemas:

- `Future<T>` is unwrapped to `T`
- `void` / `Null` return types produce no response body
- Complex return types generate `$ref` references to component schemas

---

## Update Mode

Update mode modifies an existing `apispec.json` without regenerating from source. Useful for incremental changes.

```bash
dart run serverpod_swagger:generate --update --http-method=greeting/hello:post
```

### How It Works

1. Loads existing `apispec.json`
2. Applies only the requested changes
3. Preserves all unmodified parts of the specification
4. Falls back to full regeneration if the file doesn't exist

### Combining with Other Flags

```bash
# Update HTTP method and secure an endpoint
dart run serverpod_swagger:generate --update --http-method=users/profile:put --secure-single-url=/users/profile

# Update base URL only
dart run serverpod_swagger:generate --update --base-url=https://api.example.com

# Update authentication type
dart run serverpod_swagger:generate --update --auth=apikey
```

### When to Use

- Changing HTTP methods for specific endpoints
- Modifying authentication requirements
- Updating the base URL
- Any incremental change to an existing spec

### When Not to Use

- When your endpoint code has changed significantly
- When you want a fresh spec from source
- When `apispec.json` doesn't exist yet

---

## Verbose Mode

```bash
dart run serverpod_swagger:generate --base-url=http://localhost:8082 --verbose
```

Displays:
- Path to the generated specification file
- Number of paths in the specification
- Security schemes defined

---

## All Responses

Every generated operation includes standard error responses:

- `200` — Successful operation (with typed response body if applicable)
- `400` — Bad request
- `500` — Internal server error

---

## Version Update Checklist

When bumping the package version, update `1.x.x` in all of these files:

| File | What to change |
| --- | --- |
| `pubspec.yaml` | `version:` field |
| `lib/src/serverpod_swagger_base.dart` | `ServerpodSwaggerVersion.version` constant |
| `CHANGELOG.md` | Add new `## x.x.x` entry at the top |
| `documentation.md` | `**Version**:` line |
| `test/serverpod_swagger_test.dart` | `equals('x.x.x')` assertion |
| `serverpod_swagger_docs/components/Navbar.tsx` | Badge text `vX.X.X` |
| `serverpod_swagger_docs/pages/index.tsx` | Hero badge `vX.X.X Stable Release` |
| `serverpod_swagger_docs/pages/api-reference/index.tsx` | Version in table |
| `serverpod_swagger_docs/pages/api-reference/serverpod-swagger-version.tsx` | Version in table + source code block |

**Do NOT change** `^1.0.0` in dependency constraints (`README.md`, `example/README.md`, `documentation.md`, docs site install pages) — caret syntax already covers patch/minor bumps.

---

## Troubleshooting

| Issue | Solution |
| --- | --- |
| Missing endpoints | Ensure classes extend `Endpoint` and methods are public |
| Wrong HTTP method | Use `--http-method=path:method` to override |
| Auth not working | Verify `--auth` type and check which endpoints are secured |
| Incomplete schemas | Ensure YAML model files are valid and dependencies are accessible |
| Complex params on GET | Auto-falls back to POST — this is expected behavior |
| Swagger UI not loading | Verify route is registered with `/**` pattern and CDN is accessible |
