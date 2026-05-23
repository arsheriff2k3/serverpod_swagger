import 'dart:convert';
import 'dart:io';
import 'package:serverpod_swagger/serverpod_swagger.dart';
import 'package:test/test.dart';

void main() {
  group('SwaggerUIRoute', () {
    test('creates route with default settings', () {
      final route = SwaggerUIRoute(Directory.current);
      expect(route, isNotNull);
    });

    test('mountPath must end with a trailing slash', () {
      expect(
        () => SwaggerUIRoute(Directory.current, mountPath: '/swagger'),
        throwsA(isA<AssertionError>()),
      );
    });

    test('accepts custom mountPath with trailing slash', () {
      final route = SwaggerUIRoute(
        Directory.current,
        mountPath: '/docs/',
      );
      expect(route, isNotNull);
    });

    test('accepts customSpecPath', () {
      final route = SwaggerUIRoute(
        Directory.current,
        customSpecPath: '/custom/apispec.json',
      );
      expect(route, isNotNull);
    });

    test('matchesMountPath normalizes paths correctly', () {
      final route = SwaggerUIRoute(Directory.current);
      expect(route.matchesMountPath('/swagger/', '/swagger/'), isTrue);
      expect(route.matchesMountPath('/swagger', '/swagger/'), isTrue);
      expect(route.matchesMountPath('/other/', '/swagger/'), isFalse);
    });
  });

  group('SwaggerSpec models', () {
    test('SwaggerSpec starts with empty endpoints', () {
      final spec = SwaggerSpec();
      expect(spec.endpoints, isEmpty);
    });

    test('SwaggerEndpoint can hold methods', () {
      final endpoint = SwaggerEndpoint('users');
      expect(endpoint.name, equals('users'));
      expect(endpoint.methods, isEmpty);

      final method = SwaggerMethod('getUser');
      endpoint.methods['getUser'] = method;
      expect(endpoint.methods, hasLength(1));
    });

    test('SwaggerMethod can hold parameters and returnType', () {
      final method = SwaggerMethod('createUser');
      expect(method.name, equals('createUser'));
      expect(method.parameters, isEmpty);
      expect(method.returnType, isNull);

      method.returnType = 'User';
      method.parameters['name'] = SwaggerParameter(
        name: 'name',
        type: 'String',
        isNullable: false,
      );
      expect(method.returnType, equals('User'));
      expect(method.parameters, hasLength(1));
    });

    test('SwaggerParameter toString includes type info', () {
      final param = SwaggerParameter(
        name: 'age',
        type: 'int',
        isNullable: true,
      );
      expect(param.toString(), contains('age'));
      expect(param.toString(), contains('int'));
      expect(param.toString(), contains('true'));
    });
  });

  group('inferHttpMethod', () {
    test('GET for read-like methods', () {
      expect(inferHttpMethod('getUser'), equals('get'));
      expect(inferHttpMethod('listUsers'), equals('get'));
      expect(inferHttpMethod('fetchAll'), equals('get'));
      expect(inferHttpMethod('findById'), equals('get'));
      expect(inferHttpMethod('readConfig'), equals('get'));
      expect(inferHttpMethod('searchProducts'), equals('get'));
      expect(inferHttpMethod('countItems'), equals('get'));
      expect(inferHttpMethod('checkStatus'), equals('get'));
      expect(inferHttpMethod('hasPermission'), equals('get'));
      expect(inferHttpMethod('isActive'), equals('get'));
      expect(inferHttpMethod('existsInDb'), equals('get'));
    });

    test('POST for create-like methods', () {
      expect(inferHttpMethod('createUser'), equals('post'));
      expect(inferHttpMethod('addItem'), equals('post'));
      expect(inferHttpMethod('insertRecord'), equals('post'));
      expect(inferHttpMethod('saveData'), equals('post'));
      expect(inferHttpMethod('registerUser'), equals('post'));
      expect(inferHttpMethod('login'), equals('post'));
      expect(inferHttpMethod('sendEmail'), equals('post'));
      expect(inferHttpMethod('submitForm'), equals('post'));
      expect(inferHttpMethod('uploadFile'), equals('post'));
    });

    test('PATCH for update-like methods', () {
      expect(inferHttpMethod('updateUser'), equals('patch'));
      expect(inferHttpMethod('modifySettings'), equals('patch'));
      expect(inferHttpMethod('editProfile'), equals('patch'));
      expect(inferHttpMethod('changePassword'), equals('patch'));
      expect(inferHttpMethod('renameFile'), equals('patch'));
      expect(inferHttpMethod('toggleFeature'), equals('patch'));
    });

    test('DELETE for delete-like methods', () {
      expect(inferHttpMethod('deleteUser'), equals('delete'));
      expect(inferHttpMethod('removeItem'), equals('delete'));
      expect(inferHttpMethod('destroySession'), equals('delete'));
      expect(inferHttpMethod('clearCache'), equals('delete'));
      expect(inferHttpMethod('revokeToken'), equals('delete'));
      expect(inferHttpMethod('cancelOrder'), equals('delete'));
    });

    test('defaults to POST for unrecognized methods', () {
      expect(inferHttpMethod('hello'), equals('post'));
      expect(inferHttpMethod('doSomething'), equals('post'));
      expect(inferHttpMethod('handleWebhook'), equals('post'));
      expect(inferHttpMethod('greet'), equals('post'));
    });
  });

  group('generateOpenApiMap', () {
    test('produces valid OpenAPI 3.0 structure', () {
      final spec = SwaggerSpec();
      final result = generateOpenApiMap(spec);

      expect(result['openapi'], equals('3.0.0'));
      expect(result['info'], isA<Map>());
      expect(result['info']['title'], isNotEmpty);
      expect(result['paths'], isA<Map>());
    });

    test('includes server when baseUrl is provided', () {
      final spec = SwaggerSpec();
      final result = generateOpenApiMap(spec, baseUrl: 'http://localhost:8080');

      expect(result['servers'], isA<List>());
      expect(result['servers'][0]['url'], equals('http://localhost:8080'));
    });

    test('does not include servers when baseUrl is null', () {
      final spec = SwaggerSpec();
      final result = generateOpenApiMap(spec);

      expect(result.containsKey('servers'), isFalse);
    });

    test('uses customInfo when provided', () {
      final spec = SwaggerSpec();
      final result = generateOpenApiMap(
        spec,
        customInfo: {'title': 'My API', 'version': '2.0.0'},
      );

      expect(result['info']['title'], equals('My API'));
      expect(result['info']['version'], equals('2.0.0'));
    });

    test('GET method uses query parameters for read endpoints', () {
      final spec = SwaggerSpec();
      final endpoint = SwaggerEndpoint('users');
      final method = SwaggerMethod('listUsers');
      method.parameters['limit'] = SwaggerParameter(
        name: 'limit',
        type: 'int',
        isNullable: true,
      );
      method.returnType = 'String';
      endpoint.methods['listUsers'] = method;
      spec.endpoints['users'] = endpoint;

      final result = generateOpenApiMap(spec);
      expect(result['paths'], contains('/users/listUsers'));

      final pathItem = result['paths']['/users/listUsers'];
      expect(pathItem, contains('get'));

      final operation = pathItem['get'];
      expect(operation['tags'], contains('users'));
      expect(operation['parameters'], hasLength(1));
      expect(operation['parameters'][0]['name'], equals('limit'));
      expect(operation['parameters'][0]['required'], isFalse);
    });

    test('POST method uses request body for create endpoints', () {
      final spec = SwaggerSpec();
      final endpoint = SwaggerEndpoint('users');
      final method = SwaggerMethod('createUser');
      method.parameters['name'] = SwaggerParameter(
        name: 'name',
        type: 'String',
        isNullable: false,
      );
      method.parameters['email'] = SwaggerParameter(
        name: 'email',
        type: 'String',
        isNullable: true,
      );
      endpoint.methods['createUser'] = method;
      spec.endpoints['users'] = endpoint;

      final result = generateOpenApiMap(spec);
      final pathItem = result['paths']['/users/createUser'];
      expect(pathItem, contains('post'));

      final operation = pathItem['post'];
      final requestBody = operation['requestBody'] as Map;
      expect(requestBody['required'], isTrue);

      final schema =
          requestBody['content']['application/json']['schema'] as Map;
      expect(schema['properties'], contains('name'));
      expect(schema['properties'], contains('email'));
      // Only non-nullable params are required
      expect(schema['required'], contains('name'));
      expect(schema['required'], isNot(contains('email')));
    });

    test('DELETE method uses request body for delete endpoints', () {
      final spec = SwaggerSpec();
      final endpoint = SwaggerEndpoint('users');
      final method = SwaggerMethod('deleteUser');
      method.parameters['id'] = SwaggerParameter(
        name: 'id',
        type: 'int',
        isNullable: false,
      );
      endpoint.methods['deleteUser'] = method;
      spec.endpoints['users'] = endpoint;

      final result = generateOpenApiMap(spec);
      final pathItem = result['paths']['/users/deleteUser'];
      expect(pathItem, contains('delete'));
    });

    test('PATCH method for update endpoints', () {
      final spec = SwaggerSpec();
      final endpoint = SwaggerEndpoint('users');
      final method = SwaggerMethod('updateUser');
      method.parameters['id'] = SwaggerParameter(
        name: 'id',
        type: 'int',
        isNullable: false,
      );
      endpoint.methods['updateUser'] = method;
      spec.endpoints['users'] = endpoint;

      final result = generateOpenApiMap(spec);
      final pathItem = result['paths']['/users/updateUser'];
      expect(pathItem, contains('patch'));
    });

    test('includes error responses', () {
      final spec = SwaggerSpec();
      final endpoint = SwaggerEndpoint('test');
      final method = SwaggerMethod('hello');
      endpoint.methods['hello'] = method;
      spec.endpoints['test'] = endpoint;

      final result = generateOpenApiMap(spec);
      final operation = result['paths']['/test/hello']['post'];
      final responses = operation['responses'] as Map;
      expect(responses, contains('200'));
      expect(responses, contains('400'));
      expect(responses, contains('500'));
    });

    test('maps Dart types to OpenAPI types correctly', () {
      final spec = SwaggerSpec();
      final endpoint = SwaggerEndpoint('test');
      final method = SwaggerMethod('getData');
      method.parameters['s'] = SwaggerParameter(
        name: 's',
        type: 'String',
        isNullable: false,
      );
      method.parameters['i'] = SwaggerParameter(
        name: 'i',
        type: 'int',
        isNullable: false,
      );
      method.parameters['b'] = SwaggerParameter(
        name: 'b',
        type: 'bool',
        isNullable: false,
      );
      method.parameters['d'] = SwaggerParameter(
        name: 'd',
        type: 'double',
        isNullable: false,
      );
      endpoint.methods['getData'] = method;
      spec.endpoints['test'] = endpoint;

      final result = generateOpenApiMap(spec);
      // getData -> GET method, uses query parameters
      final params =
          result['paths']['/test/getData']['get']['parameters'] as List;

      final schemaTypes =
          params.map((p) => (p as Map)['schema']['type']).toList();
      expect(
          schemaTypes, containsAll(['string', 'integer', 'boolean', 'number']));
    });

    test('marks non-nullable params as required in GET query params', () {
      final spec = SwaggerSpec();
      final endpoint = SwaggerEndpoint('test');
      final method = SwaggerMethod('findItem');
      method.parameters['required'] = SwaggerParameter(
        name: 'required',
        type: 'String',
        isNullable: false,
      );
      method.parameters['optional'] = SwaggerParameter(
        name: 'optional',
        type: 'String',
        isNullable: true,
      );
      endpoint.methods['findItem'] = method;
      spec.endpoints['test'] = endpoint;

      final result = generateOpenApiMap(spec);
      final params =
          result['paths']['/test/findItem']['get']['parameters'] as List;

      final requiredParam = params.firstWhere((p) => p['name'] == 'required');
      final optionalParam = params.firstWhere((p) => p['name'] == 'optional');
      expect(requiredParam['required'], isTrue);
      expect(optionalParam['required'], isFalse);
    });

    test('marks non-nullable params as required in POST request body', () {
      final spec = SwaggerSpec();
      final endpoint = SwaggerEndpoint('test');
      final method = SwaggerMethod('createItem');
      method.parameters['name'] = SwaggerParameter(
        name: 'name',
        type: 'String',
        isNullable: false,
      );
      method.parameters['desc'] = SwaggerParameter(
        name: 'desc',
        type: 'String',
        isNullable: true,
      );
      endpoint.methods['createItem'] = method;
      spec.endpoints['test'] = endpoint;

      final result = generateOpenApiMap(spec);
      final body = result['paths']['/test/createItem']['post']['requestBody'];
      final schema = body['content']['application/json']['schema'] as Map;
      expect(schema['required'], equals(['name']));
    });
  });

  group('generateOpenApiJson', () {
    test('produces valid JSON string', () {
      final spec = SwaggerSpec();
      final json = generateOpenApiJson(spec);
      final parsed = jsonDecode(json);
      expect(parsed, isA<Map>());
      expect(parsed['openapi'], equals('3.0.0'));
    });

    test('JSON is pretty-printed', () {
      final spec = SwaggerSpec();
      final json = generateOpenApiJson(spec);
      expect(json, contains('\n'));
      expect(json, contains('  '));
    });
  });

  group('ServerpodSwaggerVersion', () {
    test('has correct version', () {
      expect(ServerpodSwaggerVersion.version, equals('1.0.0'));
    });

    test('has correct min serverpod version', () {
      expect(ServerpodSwaggerVersion.minServerpodVersion, equals('3.4.2'));
    });
  });
}
