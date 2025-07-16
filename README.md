# Serverpod Swagger

A package to automatically generate and serve Swagger UI for a Serverpod backend. This package makes it easy to add interactive API documentation to your Serverpod project.

## Features

- Automatically generates OpenAPI 3.0 specification from Serverpod protocol definitions
- Serves Swagger UI directly from your Serverpod server
- Provides an interactive interface for exploring and testing your API endpoints
- Supports all Serverpod data types and custom classes
- Intelligent HTTP method detection based on parameter types
- Comprehensive model parsing and schema generation
- Flexible authentication configuration
- Compatible with Serverpod 2.8.0

## Requirements

- Serverpod 2.8.0 or higher
- Dart 3.0.0 or higher

## Installation

Add the package to your `pubspec.yaml` file:

```yaml
dependencies:
  serverpod_swagger: ^0.1.3
```

Then run:

```bash
dart pub get
```

## Usage

### Direct Package Execution

The recommended way to generate an OpenAPI specification for your Serverpod project is to run the following command from your server project root directory:

```bash
dart run serverpod_swagger:generate --base-url=http://localhost:8080
```

This will create an `apispec.json` file in your project root directory. The `--base-url` parameter specifies the base URL for your API endpoints.

#### Command-Line Arguments

The generator supports various command-line arguments to customize your OpenAPI specification:

| Argument | Description | Example |
|----------|-------------|--------|
| `--base-url` | Sets the base URL for your API server | `--base-url=https://api.example.com` |
| `--auth` | Specifies the authentication type (jwt, apikey, basic, oauth2) | `--auth=jwt` |
| `--auth-description` | Provides a custom description for the authentication scheme | `--auth-description="JWT token from /auth endpoint"` |
| `--secure-endpoints` | Comma-separated list of endpoints to secure | `--secure-endpoints=users,posts/create` |
| `--unsecure-endpoints` | Comma-separated list of endpoints to exclude from security | `--unsecure-endpoints=health,status` |
| `--secure-single-url` | Secures a specific URL endpoint | `--secure-single-url=/jwtAuth/getCurrentUser` |
| `--http-method` | Sets the HTTP method for a specific endpoint | `--http-method=profile/user:post` |
| `--update` | Updates an existing specification instead of regenerating | `--update` |
| `--unauth` or `--disable-auth` | Disables authentication while preserving configuration | `--unauth` |
| `--verbose` | Displays detailed information about the generation process | `--verbose` |

If you want to see detailed information about the specification generation process, you can use the `--verbose` flag:

```bash
dart run serverpod_swagger:generate --base-url=http://localhost:8080 --verbose
```

The `--verbose` flag will display additional information such as the path to the generated file, the number of endpoints included, and security schemes defined.

### Updating Existing Specifications

Instead of regenerating the entire OpenAPI specification from scratch each time, you can use the `--update` flag to modify an existing specification file:

```bash
dart run serverpod_swagger:generate --update --http-method=greeting/hello:post
```

This allows you to make incremental changes to your API documentation without having to specify all parameters again.

**Common update scenarios:**

```bash
# Update HTTP method for an endpoint
dart run serverpod_swagger:generate --update --http-method=greeting/hello:post

# Update base URL
dart run serverpod_swagger:generate --update --base-url=https://api.example.com

# Update authentication settings
dart run serverpod_swagger:generate --update --auth=jwt
```

The update mode is particularly useful for large projects where regenerating the entire specification would be time-consuming.

See the [detailed documentation](documentation.md#updating-existing-specifications) for more information on when and how to use this feature.

### Alternative: Using the Script

Alternatively, you can run the script directly from the package:

```bash
dart run serverpod_swagger:generate
```

This will also create an `apispec.json` file in your project root directory.

### Adding Swagger UI to Your Server

In your Serverpod server's `server.dart` file, add the SwaggerUIRoute to your server's routes:

```dart
import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

Future<void> run(List<String> args) async {
  // Create the server
  final pod = Serverpod(
    args,
    Protocol(), // Your protocol class
    Endpoints(), // Your endpoints class
    // Optional configuration
  );

  // Get the project root directory
  final projectRoot = Directory.current;
  
  // Create a SwaggerUIRoute
  final swaggerRoute = SwaggerUIRoute(projectRoot);
  
  // Add the route to your server
  // IMPORTANT: The path must end with a trailing slash
  pod.webServer.addRoute(swaggerRoute, '/swagger*');

  // Start the server
  await pod.start();
}
```

After starting your server, you can access the Swagger UI at:

```
http://localhost:8082/swagger/
```

**IMPORTANT: Note the trailing slash in the URL - this is required for the Swagger UI to work correctly.**

## How it works

The package works by:

1. Reading your Serverpod endpoints.dart file to understand your API structure
2. Parsing your project's data models to create accurate OpenAPI schemas
3. Converting the protocol definitions to OpenAPI 3.0 format
4. Serving the Swagger UI interface with your API documentation

### Model Parsing and Schema Generation

The generator performs comprehensive parsing of your project's data models to create accurate OpenAPI schemas:

#### YAML Model Parsing

The generator parses Serverpod's YAML model files (`.yaml` or `.spy.yaml`) to extract:

- Class definitions and properties
- Field types and nullability
- Relationships between models

This information is used to create detailed OpenAPI schema definitions that accurately represent your data models.

#### Type Mapping

The generator maps Dart and YAML types to OpenAPI schema types:

| Dart/YAML Type | OpenAPI Schema Type |
|----------------|---------------------|
| String | string |
| int | integer (int64) |
| double | number (double) |
| bool | boolean |
| DateTime | string (date-time) |
| ByteData | string (byte) |
| Duration | string |
| Uri | string (uri) |
| List<T> | array |
| Map<K,V> | object |
| Custom classes | $ref to schema |

#### Dependency Resolution

When the generator encounters references to models from other Serverpod modules:

1. It identifies the module and class name
2. Locates the model file in the appropriate package
3. Parses the model and adds it to the schema definitions

This ensures that all referenced models are properly included in the OpenAPI specification.

## Generating API Specification

The package includes a script to generate the OpenAPI specification file (`apispec.json`) from your Serverpod endpoints:

```bash
dart run serverpod_swagger:generate [--base-url=<your-api-base-url>]
```

Options:
- `--base-url`: Specifies the base URL for your API server. This is important for the "Try it out" feature in Swagger UI to work correctly. Example: `--base-url=https://api.example.com`

The script will:
1. Parse your Serverpod endpoints from the generated code
2. Create an OpenAPI 3.0 specification
3. Save it as `apispec.json` in your project root

### Endpoint Detection and Path Generation

The generator automatically detects and processes your Serverpod endpoints to create OpenAPI paths:

#### Endpoint Class Detection

The generator scans your project's Dart files to find classes that extend `Endpoint`. For each endpoint class:

1. The class name is converted to camelCase and used as the endpoint name
2. Public methods in the class are identified as API operations
3. Method parameters are analyzed to determine request structure
4. Return types are analyzed to determine response structure

#### Path Generation

For each endpoint method, the generator creates an OpenAPI path with:

- **Path**: `/{endpointName}/{methodName}`
- **Operation ID**: `{endpointName}.{methodName}`
- **Tags**: Based on the endpoint name for grouping in Swagger UI
- **Parameters**: Generated from method parameters (excluding Session)
- **Request Body**: Generated for POST methods
- **Responses**: Based on the method's return type

#### Special Method Handling

The generator automatically excludes certain special methods from the API documentation:

- Methods starting with underscore (`_`)
- Standard Serverpod lifecycle methods: `initialize`, `streamOpened`, `streamClosed`, `handleStreamMessage`

This ensures that only your actual API methods are included in the documentation.

## Best Practices and Tips

### Optimizing Your OpenAPI Generation

- **Use Update Mode for Incremental Changes**: When making small changes to your API, use the `--update` flag to avoid regenerating the entire specification.

- **Leverage Automatic HTTP Method Detection**: Let the generator determine the appropriate HTTP methods based on your parameter types, and only override when necessary.

- **Organize Endpoints with Security Groups**: Use `--secure-endpoints` and `--unsecure-endpoints` to create logical security groups rather than securing endpoints individually.

- **Provide Meaningful Base URLs**: Set the `--base-url` parameter to match your actual API server URL for better developer experience.

- **Use Verbose Mode During Development**: Enable the `--verbose` flag during development to get detailed information about the generation process.

## Troubleshooting

### Common Issues

1. **"This localhost page can't be found" error**:
   - Make sure you're accessing the URL with a trailing slash: `/swagger/` not `/swagger`
   - Verify that your server is running and the web server port is correct (usually 8082)
   - Check server logs for any error messages related to file paths

2. **Static files not found**:
   - If you see errors about missing static files in the logs, make sure the package is properly installed
   - Try running `dart pub get` again to ensure all dependencies are correctly resolved

3. **Empty API documentation**:
   - Verify that your protocol.yaml file exists and contains valid endpoint definitions
   - Check that you're passing the correct project root directory to the SwaggerUIRoute constructor
   
4. **"Try it out" feature not working**:
   - If the "Try it out" feature sends requests to the wrong host, regenerate your API spec with the `--base-url` parameter
   - Run `dart run serverpod_swagger:generate --base-url=http://localhost:8082` (adjust the URL to match your server)

5. **Missing Endpoints**: 
   - If endpoints are missing from your specification, ensure that your endpoint classes properly extend `Endpoint` and that methods are public.

6. **Incorrect HTTP Methods**: 
   - If endpoints have incorrect HTTP methods, use the `--http-method` parameter to override the automatic detection.

7. **Authentication Issues**: 
   - If authentication isn't working as expected, check that you've specified the correct `--auth` type and applied security to the right endpoints.

8. **Schema Problems**: 
   - If schemas are incomplete or incorrect, ensure that your model files are properly formatted and that all dependencies are accessible.

## Customization

You can customize the OpenAPI specification by modifying the `generate.dart` script or by providing command-line arguments:

### Using Command-Line Arguments

The simplest way to customize your API documentation is by using the `--base-url` parameter when generating the specification:

```bash
dart run serverpod_swagger:generate --base-url=https://api.example.com
```

### Authentication Support

You can add authentication support to your API specification by using the `--auth` parameter when running the `generate.dart` script. The following authentication types are supported:

- `jwt` - JWT/Bearer authentication
- `apikey` - API Key authentication
- `basic` - Basic authentication
- `oauth2` - OAuth2 authentication

Example:
```bash
dart run serverpod_swagger:generate --auth=jwt --base-url=https://api.example.com
```

You can also provide a custom description for the authentication scheme using the `--auth-description` parameter:

```bash
dart run serverpod_swagger:generate --auth=jwt --auth-description="JWT token obtained from /auth endpoint" --base-url=https://api.example.com
```

### Securing Specific Endpoints

By default, when you enable authentication with `--auth`, all endpoints will require authentication. If you want to secure only specific endpoints, you can use the `--secure-endpoints` parameter with a comma-separated list of endpoints or methods to secure:

```bash
dart run serverpod_swagger:generate --auth=jwt --secure-endpoints=users,posts/create,comments/delete
```

This will only apply authentication requirements to the specified endpoints or methods, while leaving others unsecured.

### Securing a Single URL Endpoint

If you need to secure a specific URL endpoint (like an endpoint with authorization token in header), you can use the `--secure-single-url` parameter:

```bash
dart run serverpod_swagger:generate --auth=jwt --secure-single-url=/jwtAuth/getCurrentUser --base-url=http://localhost:8080
```

This will only apply authentication requirements to the exact URL path specified, which is useful for endpoints that require authorization tokens in headers.

### Customizing HTTP Methods

By default, all endpoints are generated with the HTTP GET method. If you need to specify a different HTTP method for a particular endpoint, you can use the `--http-method` parameter:

```bash
dart run serverpod_swagger:generate --http-method=profile/user:post --base-url=http://localhost:8080
```

This will set the HTTP method for the `/profile/user` endpoint to POST instead of the default GET. You can specify any valid HTTP method (get, post, put, delete, patch, etc.).

You can also use multiple `--http-method` parameters to set different methods for different endpoints:

```bash
dart run serverpod_swagger:generate --http-method=profile/user:post --http-method=users/create:put --base-url=http://localhost:8080
```

#### Automatic HTTP Method Detection

The generator intelligently determines the appropriate HTTP methods for your endpoints based on their parameter types:

- **POST Detection**: Endpoints are automatically set as POST methods when they have:
  - Parameters that are Maps
  - Parameters with types containing 'Map', 'Post', or 'Request' in their names
  - Any non-primitive parameter types

- **Parameter Handling**:
  - Complex type parameters are included in the JSON request body
  - Primitive type parameters (string, int, bool, etc.) are included as query parameters for GET requests
  - Map-type parameters are included ONLY in the request body, not as query parameters

- **Request Body Structure**: Request bodies are structured with parameter names as keys (e.g., `{"userPost": {...}}`) 

- **Override Capability**: This automatic detection can be overridden by explicitly specifying a method using the `--http-method` parameter

For example, if you have an endpoint method like this:

```dart
Future<void> postUser(Session session, UserPost request) async {
  // Implementation
}
```

The generator will automatically:
1. Set this as a POST method
2. Include the `request` parameter in the JSON request body
3. Exclude the `request` parameter from query parameters
4. Create a proper OpenAPI specification with a structured request body schema

#### Dynamic Property Generation

The generator intelligently creates structured request body schemas based on parameter types:

- For parameters with types containing 'User', it generates properties like 'name', 'email', and 'age'
- For parameters with types containing 'Post', it generates properties like 'title', 'content', and 'tags'
- For parameters with types containing 'Request', it generates generic properties like 'data' and 'options'
- For other Map types, it generates default properties like 'id' and 'data'

This dynamic property generation makes your API documentation more informative and accurate, showing the expected structure of request bodies based on parameter types.

#### Nullability and Required Fields

The generator respects Dart's nullability system:

- Non-nullable parameters are marked as required in the OpenAPI specification
- Nullable parameters (with `?` suffix) are optional
- The generator automatically marks non-nullable Map parameters as required in the request body

This ensures that your API documentation correctly reflects your endpoint's requirements.

See the [detailed documentation](documentation.md#dynamic-property-generation) for more information.

### Explicitly Unsecuring Endpoints

If you want to secure most endpoints but explicitly exclude some from requiring authentication, you can use the `--unsecure-endpoints` parameter with a comma-separated list of endpoints or methods to exclude:

```bash
dart run serverpod_swagger:generate --auth=jwt --unsecure-endpoints=health,status,public/posts
```

This is useful when you want to secure most of your API but have a few public endpoints.

Note: If both `--secure-endpoints` and `--unsecure-endpoints` are provided, `--unsecure-endpoints` takes precedence. This means that if an endpoint is listed in both parameters, it will be unsecured.

### Globally Disabling Authentication

If you need to temporarily disable authentication for all endpoints while preserving your authentication configuration, you can use the `--unauth` or `--disable-auth` flag:

```bash
dart run serverpod_swagger:generate --auth=jwt --unauth
```

This will include the authentication scheme definition in the OpenAPI specification but won't apply security requirements to any endpoints. This is useful for testing or development environments where you want to disable authentication without removing the configuration.

## Using Authentication in Your Serverpod Project

To use the authentication features in your Serverpod project, follow these steps:

### 1. Generate the OpenAPI Specification with Authentication

First, generate your OpenAPI specification with the desired authentication configuration. You can do this in two ways:

#### Option A: Using the package directly from your server project

```bash
# From your server project root directory
dart run serverpod_swagger:generate --auth=jwt --base-url=https://api.example.com
```

#### Option B: Using the script from the package

```bash
# From your project root directory
dart run serverpod_swagger:generate --auth=jwt --base-url=https://api.example.com
```

Both methods will create an `apispec.json` file in your project root directory with JWT authentication enabled for all endpoints.

### 2. Add the SwaggerUIRoute to Your Serverpod Server

In your server's main file (typically `bin/server.dart`), add the SwaggerUIRoute to your Serverpod server:

```dart
import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

// Your existing server setup code...

void main(List<String> args) async {
  // Create your Serverpod server
  final pod = Serverpod(
    args,
    Protocol(),
    Endpoints(),
    // Your server configuration...
  );
  
  // Get the project root directory
  final projectRoot = Directory(Directory.current.path);
  
  // Create a SwaggerUIRoute
  final swaggerRoute = SwaggerUIRoute(projectRoot);
  
  // Add the route to your web server
  pod.webServer.addRoute(swaggerRoute, '/swagger/');
  
  // Start the server
  await pod.start();
}
```

### 3. Access the Swagger UI

Once your server is running, you can access the Swagger UI at:

```
http://your-server-host:web-server-port/swagger/
```

For example, with default settings:

```
http://localhost:8082/swagger/
```

### 4. Authentication Options for Different Environments

You can create different OpenAPI specifications for different environments. Here are examples using the direct package execution method:

#### Development Environment

```bash
dart run serverpod_swagger:generate --auth=jwt --unauth --base-url=http://localhost:8080
```

#### Testing Environment with Specific Endpoints Secured

```bash
dart run serverpod_swagger:generate --auth=jwt --secure-endpoints=users,posts --base-url=https://test-api.example.com
```

#### Production Environment

```bash
dart run serverpod_swagger:generate --auth=jwt --unsecure-endpoints=health,status --base-url=https://api.example.com
```

### 5. Automating Specification Generation

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
        '--base-url=http://localhost:8080',
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

### Modifying the OpenAPI Generation

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

### Creating a Custom Generator

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


## Conclusion:

The Serverpod Swagger generator provides a powerful and flexible way to create OpenAPI specifications for your Serverpod applications. By leveraging the various command-line arguments and features described in this documentation, you can create comprehensive API documentation that accurately reflects your endpoints, models, and security requirements.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
