/// A package to automatically generate and serve Swagger UI for a Serverpod backend.
///
/// This package provides a simple way to add Swagger UI documentation to your
/// Serverpod project, making it easy for developers to explore and test your API.
///
/// ## Quick Start
///
/// 1. Generate the OpenAPI spec:
///    ```bash
///    dart run serverpod_swagger:generate --base-url=http://localhost:8080
///    ```
///
/// 2. Register the route in your server:
///    ```dart
///    pod.webServer.addRoute(SwaggerUIRoute(Directory.current), '/swagger/');
///    ```
library;

export 'src/serverpod_swagger_base.dart';
export 'src/swagger_ui_route.dart';
export 'src/apispec_route.dart';
export 'src/models/swagger.dart';
export 'src/services/custom_generator.dart'
    show generateOpenApiMap, generateOpenApiJson, inferHttpMethod;
