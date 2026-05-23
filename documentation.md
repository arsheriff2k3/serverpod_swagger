# Serverpod Swagger Documentation

## Command-Line Reference

The Serverpod Swagger generator supports various command-line arguments to customize your OpenAPI specification. Here's a complete reference of all available options:

| Argument                       | Description                                                            | Example                                         |
| ------------------------------ | ---------------------------------------------------------------------- | ----------------------------------------------- |
| `--base-url=<URL>`             | Sets the base URL for the API server                                   | `--base-url=http://localhost:8082`              |
| `--auth=<TYPE>`                | Specifies the authentication type (jwt, bearer, apikey, basic, oauth2) | `--auth=jwt`                                    |
| `--auth-description=<TEXT>`    | Custom description for the authentication method                       | `--auth-description="Custom API key header"`    |
| `--secure-endpoints=<LIST>`    | Comma-separated list of endpoints to secure                            | `--secure-endpoints=users/profile,auth/login`   |
| `--unsecure-endpoints=<LIST>`  | Comma-separated list of endpoints to explicitly leave unsecured        | `--unsecure-endpoints=public/info,status/check` |
| `--secure-single-url=<URL>`    | Secures a single specific URL endpoint                                 | `--secure-single-url=/auth/login`               |
| `--unsecure-single-url=<URL>`  | Explicitly leaves a single URL endpoint unsecured                      | `--unsecure-single-url=/public/info`            |
| `--http-method=<PATH:METHOD>`  | Sets a specific HTTP method for an endpoint                            | `--http-method=users/create:post`               |
| `--unauth` or `--disable-auth` | Globally disables authentication for all endpoints                     | `--disable-auth`                                |
| `--verbose`                    | Displays detailed information during generation                        | `--verbose`                                     |
| `--update`                     | Updates an existing specification instead of regenerating              | `--update`                                      |

## Authentication and Endpoint Security

### Security Policies and Authentication Types

The Serverpod Swagger generator supports several authentication types and provides flexible security policies for your API endpoints.

#### Authentication Types

You can specify one of the following authentication types using the `--auth=<TYPE>` parameter:

- **jwt**: JSON Web Token authentication with bearer scheme
- **bearer**: Bearer token authentication
- **apikey**: API key authentication using X-API-Key header
- **basic**: Basic HTTP authentication
- **oauth2**: OAuth 2.0 authentication with implicit flow
- **custom**: Any other authentication type (defaults to apiKey in Authorization header)

Example:

```bash
dart run serverpod_swagger:generate --auth=jwt --base-url=http://localhost:8082
```

#### Security Policy Rules

The generator follows these rules when determining which endpoints to secure:

1. **Explicit Overrides**: `--secure-single-url` and `--unsecure-single-url` parameters always take precedence over other security settings.

2. **Priority Order**:
   - `--unsecure-endpoints` list has the highest priority
   - `--secure-endpoints` list is next
   - Global settings are applied last

3. **Default Behavior**:
   - When using `--auth` without any endpoint lists: all endpoints are secured
   - When providing a `--secure-endpoints` list: only those endpoints are secured, others are unsecured
   - When providing only an `--unsecure-endpoints` list: all endpoints are secured except those in the list
   - When using `--disable-auth`: all endpoints are unsecured

### Securing Specific URL Endpoints

The Serverpod Swagger package allows you to secure specific URL endpoints with authentication. This is useful when you want to apply authentication requirements to individual API endpoints while leaving others unsecured.

#### Using the `--secure-single-url` Parameter

To secure a specific URL endpoint, use the `--secure-single-url` parameter when generating your OpenAPI specification:

```bash
dart run serverpod_swagger:generate --auth=jwt --secure-single-url=/jwtAuth/getCurrentUser --base-url=http://localhost:8082
```

This command will:

1. Generate an OpenAPI specification with JWT authentication
2. Apply authentication requirements **only** to the `/jwtAuth/getCurrentUser` endpoint
3. Leave all other endpoints unsecured

#### Example: Securing an Endpoint with JWT Authentication

If you have an endpoint that requires JWT authentication with an authorization token in the header (like `/jwtAuth/getCurrentUser`), you can generate the API specification like this:

```bash
dart run serverpod_swagger:generate --auth=jwt --secure-single-url=/jwtAuth/getCurrentUser --base-url=http://localhost:8082
```

When accessing the Swagger UI, you'll need to:

1. Click the "Authorize" button
2. Enter your JWT token in the format: `Bearer your_token_here`
3. The authorization header will only be applied to the `/jwtAuth/getCurrentUser` endpoint

#### Multiple Secure URLs

If you need to secure multiple specific URL endpoints, you can use the `--secure-endpoints` parameter instead:

```bash
dart run serverpod_swagger:generate --auth=jwt --secure-endpoints=jwtAuth/getCurrentUser,users/profile --base-url=http://localhost:8082
```

### Customizing HTTP Methods

By default, all endpoints in the OpenAPI specification are generated with the HTTP GET method. However, you can customize the HTTP method for specific endpoints using the `--http-method` parameter.

#### Using the `--http-method` Parameter

To specify a custom HTTP method for an endpoint, use the following format:

```bash
dart run serverpod_swagger:generate --http-method=endpoint/method:HTTP_METHOD --base-url=http://localhost:8082
```

Where:

- `endpoint/method` is the path to your endpoint (with or without a leading slash)
- `HTTP_METHOD` is the HTTP method you want to use (e.g., POST, PUT, DELETE, PATCH)

### Verbose Output

If you want to see detailed information about the OpenAPI specification generation process, you can use the `--verbose` flag:

```bash
dart run serverpod_swagger:generate --base-url=http://localhost:8082 --verbose
```

This will display additional information such as:

- The path to the generated specification file
- The number of endpoints included in the specification
- Security schemes defined in the specification

### Update Mode

The generator provides an efficient update mode that allows you to modify an existing OpenAPI specification without regenerating it from scratch. This is particularly useful for making incremental changes to your API documentation.

#### Using the `--update` Flag

To use update mode, add the `--update` flag to your command along with the specific changes you want to make:

```bash
dart run serverpod_swagger:generate --update --http-method=greeting/hello:post
```

This command will:

1. Read the existing `apispec.json` file
2. Apply the specified changes (in this case, changing the HTTP method for the `greeting/hello` endpoint to POST)
3. Save the updated specification back to the file

#### How Update Mode Works

When running in update mode, the generator:

1. Attempts to load the existing `apispec.json` file
2. If successful, applies only the requested changes to the loaded specification
3. If the file doesn't exist or can't be read, falls back to full regeneration
4. Preserves all other aspects of the specification that weren't explicitly changed

The update process is designed to be non-destructive, meaning it won't remove or modify parts of your specification that aren't directly affected by your changes.

#### Benefits of Using the Update Mode

- **Efficiency**: No need to reprocess all endpoints when making small changes
- **Convenience**: You don't need to remember and specify all original parameters
- **Consistency**: Maintains other aspects of your API specification while updating specific parts
- **Time-saving**: Particularly useful in large projects with many endpoints

#### When to Use Update Mode

- When modifying HTTP methods for specific endpoints
- When changing authentication requirements
- When updating the base URL
- When making any incremental changes to an existing specification

#### When to Avoid Update Mode

- When your endpoints.dart file has changed significantly
- When you want to regenerate the entire specification from scratch
- When the apispec.json file doesn't exist yet

#### Combining with Other Parameters

The `--update` flag can be combined with any other parameter to modify specific aspects of your API documentation:

````bash
# Update HTTP method and secure a specific endpoint```bash
dart run serverpod_swagger:generate --update --http-method=users/profile:put --secure-single-url=/users/profile
````

# Update base URL only

dart run serverpod_swagger:generate --update --base-url=https://api.example.com

# Update authentication type

dart run serverpod_swagger:generate --update --auth=apikey

````

This approach is more efficient and convenient for making incremental changes to your API documentation.

#### Example: Setting a POST Method for a Profile Endpoint

```bash
dart run serverpod_swagger:generate --http-method=profile/user:post --base-url=http://localhost:8082
````

### Automatic HTTP Method Detection

The generator intelligently determines the appropriate HTTP methods for your endpoints based on their parameter types:

- **POST Detection**: Endpoints are automatically set as POST methods when they have:
  - Parameters that are Maps
  - Parameters with types containing 'Map', 'Post', or 'Request' in their names
  - Any non-primitive parameter types

- **Parameter Handling**:
  - Complex type parameters are included in the JSON request body
  - Primitive type parameters (string, int, bool, etc.) are included as query parameters for GET requests
  - Map-type parameters are included ONLY in the request body, not as query parameters

- **Override Capability**: This automatic detection can be overridden by explicitly specifying a method using the `--http-method` parameter

- **Detection Logic**: The code analyzes each endpoint method's parameters and determines if any parameter requires a POST request based on its type complexity

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

The generated request body in Swagger UI will look like this:

```json
{
  "userPost": {
    "name": "Alice",
    "email": "alice@example.com",
    "age": 30
  }
}
```

This structure matches the expected format for Serverpod endpoint methods, where the parameter name is used as the key in the request body.

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
| -------------- | ------------------- |
| String         | string              |
| int            | integer (int64)     |
| double         | number (double)     |
| bool           | boolean             |
| DateTime       | string (date-time)  |
| ByteData       | string (byte)       |
| Duration       | string              |
| Uri            | string (uri)        |
| List<T>        | array               |
| Map<K,V>       | object              |
| Custom classes | $ref to schema      |

#### Dependency Resolution

When the generator encounters references to models from other Serverpod modules:

1. It identifies the module and class name
2. Locates the model file in the appropriate package
3. Parses the model and adds it to the schema definitions

This ensures that all referenced models are properly included in the OpenAPI specification.

### Dynamic Property Generation

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

This will configure the `/profile/user` endpoint to use the POST method instead of the default GET method.

#### Multiple HTTP Method Customizations

You can specify multiple `--http-method` parameters to customize different endpoints:

```bash
dart run serverpod_swagger:generate \
  --http-method=profile/user:post \
  --http-method=users/create:put \
  --http-method=documents/delete:delete \
  --base-url=http://localhost:8082
```

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

### Integrating with Your Serverpod Server

After generating the API specification with secured endpoints, make sure to add the SwaggerUIRoute to your server:

```dart
// In your bin/server.dart file
import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

void main(List<String> args) async {
  // Create your Serverpod server
  final pod = Serverpod(
    args,
    Protocol(),
    Endpoints(),
  );

  // Get the project root directory
  final projectRoot = Directory(Directory.current.path);

  // Create a SwaggerUIRoute
  final swaggerRoute = SwaggerUIRoute(projectRoot);

  // Add the route to your web server
  // IMPORTANT: For Serverpod 3.2.3+, use '/**' for the tail match
  // and ensure this is added BEFORE any catch-all static routes ('/*').
  pod.webServer.addRoute(swaggerRoute, '/swagger/**');

  // Start the server
  await pod.start();
}
```

Access the Swagger UI at `http://localhost:8082/swagger/` to test your secured endpoint.

## Best Practices and Tips

### Optimizing Your OpenAPI Generation

- **Use Update Mode for Incremental Changes**: When making small changes to your API, use the `--update` flag to avoid regenerating the entire specification.

- **Leverage Automatic HTTP Method Detection**: Let the generator determine the appropriate HTTP methods based on your parameter types, and only override when necessary.

- **Organize Endpoints with Security Groups**: Use `--secure-endpoints` and `--unsecure-endpoints` to create logical security groups rather than securing endpoints individually.

- **Provide Meaningful Base URLs**: Set the `--base-url` parameter to match your actual API server URL for better developer experience.

- **Use Verbose Mode During Development**: Enable the `--verbose` flag during development to get detailed information about the generation process.

### Troubleshooting

- **Missing Endpoints**: If endpoints are missing from your specification, ensure that your endpoint classes properly extend `Endpoint` and that methods are public.

- **Incorrect HTTP Methods**: If endpoints have incorrect HTTP methods, use the `--http-method` parameter to override the automatic detection.

- **Authentication Issues**: If authentication isn't working as expected, check that you've specified the correct `--auth` type and applied security to the right endpoints.

- **Schema Problems**: If schemas are incomplete or incorrect, ensure that your model files are properly formatted and that all dependencies are accessible.

## Conclusion

The Serverpod Swagger generator provides a powerful and flexible way to create OpenAPI specifications for your Serverpod applications. By leveraging the various command-line arguments and features described in this documentation, you can create comprehensive API documentation that accurately reflects your endpoints, models, and security requirements.
