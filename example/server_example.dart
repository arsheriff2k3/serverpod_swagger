import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:serverpod_swagger/serverpod_swagger.dart';

import 'src/generated/endpoints.dart';
import 'src/generated/protocol.dart';

/// Example server setup with Swagger UI
/// 
/// This example shows two scenarios:
/// 1. Default setup (Swagger at /swagger/)
/// 2. Custom path setup (Swagger at custom path with apispec.json at root)

void main(List<String> args) async {
  // Create your Serverpod instance
  final pod = Serverpod(
    args,
    Protocol(),      // Your protocol class
    Endpoints(),     // Your endpoints class
  );

  // Get the project root directory (where apispec.json is located)
  final projectRoot = Directory.current;

  // ============================================================
  // SCENARIO 1: Default Setup (Recommended for most cases)
  // ============================================================
  // Swagger UI at: http://localhost:8082/swagger/
  // API Spec at: http://localhost:8082/swagger/apispec.json
  
  final swaggerRoute = SwaggerUIRoute(projectRoot);
  pod.webServer.addRoute(swaggerRoute, '/swagger/**');

  // ============================================================
  // SCENARIO 2: Custom Path Setup
  // ============================================================
  // Swagger UI at: http://localhost:8082/custom/swagger/
  // API Spec at: http://localhost:8082/apispec.json (root)
  
  // Uncomment these lines to use custom path:
  
  final customSwaggerRoute = SwaggerUIRoute(
    projectRoot,
    mountPath: '/custom/swagger/',
    customSpecPath: '/apispec.json',  // Tell Swagger UI where to find the spec
  );
  pod.webServer.addRoute(customSwaggerRoute, '/custom/swagger/**');

  // IMPORTANT: You MUST also add this route to serve apispec.json at root
  final apiSpecRoute = ApiSpecRoute(projectRoot);
  pod.webServer.addRoute(apiSpecRoute, '/apispec.json');

  // Start the server
  await pod.start();
  
  print('Swagger UI available at: http://localhost:8082/swagger/');
}
