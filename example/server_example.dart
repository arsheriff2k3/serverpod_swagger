// ignore_for_file: depend_on_referenced_packages
// This example shows how to use serverpod_swagger programmatically.
// For full Serverpod integration, see the README.md in this directory.

import 'package:serverpod_swagger/serverpod_swagger.dart';

void main(List<String> args) async {
  // --- Programmatic spec generation ---
  final spec = SwaggerSpec();
  final endpoint = SwaggerEndpoint('greeting');
  final method = SwaggerMethod('hello');
  method.parameters['name'] = SwaggerParameter(
    name: 'name',
    type: 'String',
    isNullable: false,
  );
  method.returnType = 'String';
  endpoint.methods['hello'] = method;
  spec.endpoints['greeting'] = endpoint;

  final json = generateOpenApiJson(
    spec,
    baseUrl: 'http://localhost:8080',
    customInfo: {'title': 'My API', 'version': '1.0.0'},
  );
  print(json);
}
