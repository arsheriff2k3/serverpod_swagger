import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:path/path.dart' as p;

/// A route that serves the apispec.json file.
///
/// This route is useful when you want to serve the API specification
/// at a different path than the Swagger UI (e.g., at the root while
/// Swagger UI is at a custom path).
class ApiSpecRoute extends Route {
  /// The root directory of the project where apispec.json is located.
  final Directory _projectRoot;

  /// Creates a new ApiSpecRoute instance.
  ///
  /// [projectRoot] is the directory where the apispec.json file is located.
  ApiSpecRoute(Directory projectRoot) : _projectRoot = projectRoot;

  /// Handles incoming HTTP requests and serves the API specification.
  @override
  Future<Response> handleCall(Session session, Request request) async {
    session.log('Serving API spec from ${_projectRoot.path}');

    // Read the file from disk ON EVERY REQUEST for live updates
    final specFile = File(p.join(_projectRoot.path, 'apispec.json'));
    if (await specFile.exists()) {
      final content = await specFile.readAsString();

      // Build headers with cache control
      final headers = Headers.build((mh) {
        mh.cacheControl = CacheControlHeader(
          noCache: true,
          noStore: true,
          mustRevalidate: true,
        );
        mh['Pragma'] = ['no-cache'];
        mh['Expires'] = ['0'];
      });

      return Response.ok(
        body: Body.fromString(content, mimeType: MimeType.json),
        headers: headers,
      );
    } else {
      return Response.notFound(
        body: Body.fromString(
          'Error: apispec.json not found at ${specFile.path}',
        ),
      );
    }
  }
}
