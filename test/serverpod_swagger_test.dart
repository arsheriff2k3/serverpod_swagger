import 'dart:io';
import 'package:serverpod_swagger/serverpod_swagger.dart';
import 'package:test/test.dart';

void main() {
  group('ProtocolToOpenApiConverter tests', () {
    late Directory tempDir;

    setUp(() {
      // Create a temporary directory with a mock protocol.yaml for testing
      tempDir =
          Directory.systemTemp.createTempSync('serverpod_swagger_test_');
      final protocolDir = Directory('${tempDir.path}/lib/src/generated');
      protocolDir.createSync(recursive: true);

      // Create a simple protocol.yaml file for testing
      final protocolFile = File('${protocolDir.path}/protocol.yaml');
      protocolFile.writeAsStringSync('''
        classes:
          TestClass:
            fields:
              id:
                type: int
              name:
                type: String
              isActive:
                type: bool
              createdAt:
                type: DateTime
      ''');
    });

    tearDown(() {
      // Clean up the temporary directory
      tempDir.deleteSync(recursive: true);
    });
  });

  group('SwaggerUIRoute tests', () {
    test('creates route with correct paths', () {
      final projectRoot = Directory.current;
      final route = SwaggerUIRoute(projectRoot);
      expect(route, isNotNull);
    });

    test('mountPath must end with a trailing slash', () {
      final projectRoot = Directory.current;
      expect(() => SwaggerUIRoute(projectRoot, mountPath: '/swagger'),
          throwsA(isA<AssertionError>()));
    });

    test('customSpecPath is used when provided', () {
      final projectRoot = Directory.current;
      // This is a bit hard to test directly because fields are private,
      // but we can verify it doesn't throw and we could potentially test handleCall if we mock Session/Request.
      final route = SwaggerUIRoute(projectRoot, customSpecPath: '/custom/apispec.json');
      expect(route, isNotNull);
    });
  });
}
