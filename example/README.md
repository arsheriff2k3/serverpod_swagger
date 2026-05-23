# Serverpod Swagger Example

## Quick Start

### 1. Add the dependency

```yaml
dependencies:
  serverpod: ">=3.4.2 <4.0.0"
  serverpod_swagger: ^1.0.0
```

### 2. Register the Swagger UI route

```dart
import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(args, Protocol(), Endpoints());

  pod.webServer.addRoute(
    SwaggerUIRoute(Directory.current),
    '/swagger/**',
  );

  await pod.start();
}
```

### 3. Generate the OpenAPI specification

```bash
dart run serverpod_swagger:generate --base-url=http://localhost:8080
```

### 4. Open Swagger UI

Visit `http://localhost:8082/swagger/` in your browser.

## CLI Options

```bash
# Basic generation
dart run serverpod_swagger:generate

# With base URL (recommended for "Try it out")
dart run serverpod_swagger:generate --base-url=http://localhost:8080

# With JWT authentication
dart run serverpod_swagger:generate --auth=jwt --base-url=http://localhost:8080

# Secure specific endpoints only
dart run serverpod_swagger:generate --auth=jwt --secure-endpoints=users,admin

# Unsecure specific endpoints
dart run serverpod_swagger:generate --auth=jwt --unsecure-endpoints=health,public

# Override HTTP methods
dart run serverpod_swagger:generate --http-method=/users/create:post

# Update existing spec (preserves paths, applies new flags)
dart run serverpod_swagger:generate --update --base-url=http://prod.example.com

# Verbose output
dart run serverpod_swagger:generate --verbose
```

## Custom Path Setup

```dart
// Swagger UI at /docs/, spec at /apispec.json
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

## Programmatic Spec Generation

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
