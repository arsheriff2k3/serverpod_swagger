# Serverpod Swagger Example

This example demonstrates how to integrate Serverpod Swagger into your Serverpod project.

## Getting Started

1. Add the `serverpod_swagger` package to your `pubspec.yaml` file:

```yaml
dependencies:
  serverpod_swagger: ^0.1.7
```

2. Run `dart pub get` to install the package.

3. Add the Swagger UI route to your server file as shown in `server.dart`:

```dart
import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void run(List<String> args) async {
  final pod = Serverpod(
    args,
    // Your protocol and endpoints classes
  );

  // Add the Swagger UI route
  final swaggerRoute = SwaggerUIRoute(Directory.current);
  pod.webServer.addRoute(swaggerRoute, '/swagger*');

  await pod.start();
}
```

4. Generate the OpenAPI specification for your Serverpod project:

```bash
dart run serverpod_swagger:generate --base-url=http://localhost:8082
```

5. Start your Serverpod server and access the Swagger UI at:

```
http://localhost:8082/swagger/
```

## Additional Configuration

You can customize the OpenAPI specification generation with various command-line arguments:

```bash
# Specify authentication type
dart run serverpod_swagger:generate --auth=jwt

# Specify HTTP methods for endpoints
dart run serverpod_swagger:generate --method=post:createUser,get:getUser

# Secure specific endpoints
dart run serverpod_swagger:generate --secure=createUser,updateUser
```

See the main package documentation for more details on available options.

## Automating Specification Generation

You can add a script to your project to automate the generation of the OpenAPI specification for different environments. For example, create a `scripts/generate_api_docs.dart` file:

```dart
import 'dart:io';

void main(List<String> args) async {
  final environment = args.isNotEmpty ? args[0] : 'dev';

  switch (environment) {
    case 'prod':
      await Process.run('dart', [
        'run',
        'serverpod_swagger:generate',
        '--auth=jwt',
        '--base-url=https://api.example.com',
      ]);
      break;
    case 'test':
      await Process.run('dart', [
        'run',
        'serverpod_swagger:generate',
        '--auth=jwt',
        '--secure-endpoints=users,posts',
        '--base-url=https://test-api.example.com',
      ]);
      break;
    case 'dev':
    default:
      await Process.run('dart', [
        'run',
        'serverpod_swagger:generate',
        '--auth=jwt',
        '--unauth',
        '--base-url=http://localhost:8082',
      ]);
      break;
  }

  print('Generated OpenAPI specification for $environment environment');
}
```

Then run it with:

```bash
dart scripts/generate_api_docs.dart prod
```

This approach allows you to generate the OpenAPI specification directly from your server project without needing to access the package's bin directory.

## Advanced Customization

For more advanced customization, you can modify the `generateOpenApiMap` function in the `generate.dart` script to include additional information:

```dart
// Example of how you might customize the OpenAPI generation
Map<String, dynamic> generateOpenApiMap(SwaggerSpec spec, {String? baseUrl}) {
  final openApiMap = {
    'openapi': '3.0.0',
    'info': {
      'title': 'My Custom API Title',
      'version': '2.0.0',
      'description': 'Detailed documentation for my API'
    },
    // ... rest of the implementation
  };

  // ... add servers section if baseUrl is provided

  return openApiMap;
}
```

## Creating a Custom Generator

For even more control, you can create a custom generator script that imports the necessary components from the `serverpod_swagger` package. Here's an example of a custom generator script:

```dart
// custom_generator.dart
import 'dart:convert';
import 'dart:io';
import 'package:serverpod_swagger/src/services/parser.dart'; // Import the parser

void main(List<String> args) async {
  // Parse your command line arguments here
  String? baseUrl;
  // ... other argument parsing

  // Create your own SwaggerSpec or use the existing parser to generate one
  final spec = SwaggerSpec(); // You'll need to populate this

  // Call the customized version of generateOpenApiMap
  final openApiJson = generateOpenApiMap(
    spec,
    baseUrl: baseUrl,
    // Add your customizations here
    // For example, customize the info section:
    customInfo: {
      'title': 'My Custom API',
      'version': '2.0.0',
      'description': 'My detailed API documentation'
    },
  );

  // Write the output
  final outputFile = File('apispec.json');
  final prettyJson = JsonEncoder.withIndent('  ').convert(openApiJson);
  outputFile.writeAsStringSync(prettyJson);
}

// Your customized version of generateOpenApiMap
Map<String, dynamic> generateOpenApiMap(
  SwaggerSpec spec, {
  String? baseUrl,
  String? authType,
  String? authDescription,
  List<String>? securedEndpoints,
  List<String>? unsecuredEndpoints,
  String? secureSingleUrl,
  bool disableAuthGlobally = false,
  Map<String, String>? customHttpMethods,
  Map<String, dynamic>? customInfo,
}) {
  final paths = <String, dynamic>{};
  // ... copy the implementation from parser.dart

  // Customize the OpenAPI map
  final openApiMap = {
    'openapi': '3.0.0',
    'info': customInfo ?? {'title': 'Serverpod API', 'version': '1.0.0'},
    'paths': paths
  };

  // ... rest of the implementation

  return openApiMap;
}
```
