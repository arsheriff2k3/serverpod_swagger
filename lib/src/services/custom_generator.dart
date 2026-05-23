import 'dart:convert';

import 'package:serverpod_swagger/src/models/swagger.dart';

/// Infers the HTTP method from the endpoint method name using naming conventions.
///
/// - GET: get, list, fetch, find, read, retrieve, query, search, show, view, load
/// - POST: create, add, insert, save, register, execute, run, perform, login, send
/// - PATCH: update, modify, patch, edit, change, set, put, replace, adjust
/// - DELETE: delete, remove, destroy, drop, clear, unlink, unregister
/// - Default: POST (Serverpod endpoints are RPC-style POST by default)
String inferHttpMethod(String methodName) {
  final lower = methodName.toLowerCase();

  const getPrefixes = [
    'get',
    'list',
    'fetch',
    'find',
    'read',
    'retrieve',
    'query',
    'search',
    'show',
    'view',
    'load',
    'count',
    'check',
    'has',
    'is',
    'exists',
    'lookup',
  ];
  const postPrefixes = [
    'create',
    'add',
    'insert',
    'save',
    'register',
    'execute',
    'run',
    'perform',
    'login',
    'send',
    'submit',
    'upload',
    'import',
    'process',
    'trigger',
    'start',
    'init',
    'generate',
    'compute',
  ];
  const patchPrefixes = [
    'update',
    'modify',
    'patch',
    'edit',
    'change',
    'set',
    'put',
    'replace',
    'adjust',
    'rename',
    'move',
    'toggle',
  ];
  const deletePrefixes = [
    'delete',
    'remove',
    'destroy',
    'drop',
    'clear',
    'unlink',
    'unregister',
    'revoke',
    'cancel',
    'purge',
  ];

  for (final prefix in getPrefixes) {
    if (lower == prefix || lower.startsWith(prefix)) return 'get';
  }
  for (final prefix in deletePrefixes) {
    if (lower == prefix || lower.startsWith(prefix)) return 'delete';
  }
  for (final prefix in patchPrefixes) {
    if (lower == prefix || lower.startsWith(prefix)) return 'patch';
  }
  for (final prefix in postPrefixes) {
    if (lower == prefix || lower.startsWith(prefix)) return 'post';
  }

  return 'post';
}

/// Generates an OpenAPI 3.0 JSON map from a [SwaggerSpec].
///
/// Uses naming conventions to determine HTTP methods (GET, POST, PATCH, DELETE).
/// Includes `required` fields in request body schemas for non-nullable parameters.
///
/// Example:
/// ```dart
/// final spec = SwaggerSpec();
/// final endpoint = SwaggerEndpoint('greeting');
/// final method = SwaggerMethod('hello');
/// method.parameters['name'] = SwaggerParameter(
///   name: 'name', type: 'String', isNullable: false,
/// );
/// method.returnType = 'String';
/// endpoint.methods['hello'] = method;
/// spec.endpoints['greeting'] = endpoint;
///
/// final json = generateOpenApiMap(spec, baseUrl: 'http://localhost:8080');
/// ```
Map<String, dynamic> generateOpenApiMap(
  SwaggerSpec spec, {
  String? baseUrl,
  Map<String, dynamic>? customInfo,
}) {
  final paths = <String, dynamic>{};

  for (final endpointEntry in spec.endpoints.entries) {
    final endpointName = endpointEntry.key;
    final endpoint = endpointEntry.value;

    for (final methodEntry in endpoint.methods.entries) {
      final methodName = methodEntry.key;
      final method = methodEntry.value;
      final path = '/$endpointName/$methodName';

      final httpMethod = inferHttpMethod(methodName);
      final useRequestBody = httpMethod != 'get';

      final operation = <String, dynamic>{
        'summary': methodName,
        'operationId': '$endpointName.$methodName',
        'tags': [endpointName],
      };

      if (method.parameters.isNotEmpty) {
        if (useRequestBody) {
          // POST/PATCH/DELETE: put params in request body
          final properties = <String, dynamic>{};
          final requiredFields = <String>[];
          for (final param in method.parameters.values) {
            properties[param.name] = {
              'type': _mapDartTypeToOpenApi(param.type),
            };
            if (!param.isNullable) {
              requiredFields.add(param.name);
            }
          }
          final schema = <String, dynamic>{
            'type': 'object',
            'properties': properties,
          };
          if (requiredFields.isNotEmpty) {
            schema['required'] = requiredFields;
          }
          operation['requestBody'] = {
            'required': true,
            'content': {
              'application/json': {'schema': schema},
            },
          };
        } else {
          // GET: put params in query string
          final parameters = <Map<String, dynamic>>[];
          for (final param in method.parameters.values) {
            parameters.add({
              'name': param.name,
              'in': 'query',
              'required': !param.isNullable,
              'schema': {'type': _mapDartTypeToOpenApi(param.type)},
            });
          }
          operation['parameters'] = parameters;
        }
      }

      operation['responses'] = {
        '200': {
          'description': 'Successful operation',
          if (method.returnType != null)
            'content': {
              'application/json': {
                'schema': {'type': _mapDartTypeToOpenApi(method.returnType!)},
              },
            },
        },
        '400': {'description': 'Bad request'},
        '500': {'description': 'Internal server error'},
      };

      paths[path] = {httpMethod: operation};
    }
  }

  final openApiMap = <String, dynamic>{
    'openapi': '3.0.0',
    'info': customInfo ?? {'title': 'Serverpod API', 'version': '1.0.0'},
    'paths': paths,
  };

  if (baseUrl != null && baseUrl.isNotEmpty) {
    openApiMap['servers'] = [
      {'url': baseUrl, 'description': 'Main API Server'},
    ];
  }

  return openApiMap;
}

/// Serializes an OpenAPI map to a pretty-printed JSON string.
String generateOpenApiJson(
  SwaggerSpec spec, {
  String? baseUrl,
  Map<String, dynamic>? customInfo,
}) {
  final map =
      generateOpenApiMap(spec, baseUrl: baseUrl, customInfo: customInfo);
  return const JsonEncoder.withIndent('  ').convert(map);
}

String _mapDartTypeToOpenApi(String dartType) {
  switch (dartType.toLowerCase()) {
    case 'string':
      return 'string';
    case 'int':
      return 'integer';
    case 'double':
    case 'num':
      return 'number';
    case 'bool':
      return 'boolean';
    case 'datetime':
      return 'string';
    default:
      return 'object';
  }
}
