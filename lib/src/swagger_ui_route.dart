// lib/serverpod_swagger.dart
import 'dart:io';
import 'package:serverpod/serverpod.dart';
import 'package:path/path.dart' as p;

/// A development-friendly route that serves a live-reloading Swagger UI.
///
/// It re-reads the apispec.json on every request to show changes instantly.
/// This route is designed to be used during development to provide an
/// interactive API documentation interface that updates as you modify your code.
class SwaggerUIRoute extends Route {
  /// The root directory of the project where apispec.json is located.
  final Directory _projectRoot;

  /// The pre-generated HTML content for the Swagger UI page.
  final String _swaggerHtml;

  /// The base path where the Swagger UI will be mounted (e.g., '/swagger/').
  final String _mountPath;

  /// The path without trailing slash that will redirect to _mountPath.
  // final String _redirectPath;

  /// The full path to the API specification JSON file.
  final String _specPath;

  /// Creates a new SwaggerUIRoute instance.
  ///
  /// [projectRoot] is the directory where the apispec.json file is located.
  /// [mountPath] is the URL path where the Swagger UI will be served, must end with a slash.
  SwaggerUIRoute(Directory projectRoot, {String mountPath = '/swagger/'})
      : assert(mountPath.endsWith('/'),
            'mountPath must end with a trailing slash.'),
        _projectRoot = projectRoot,
        _mountPath = mountPath,
        // _redirectPath = mountPath.substring(0, mountPath.length - 1),
        _specPath = p.join(mountPath, 'apispec.json'),
        // The HTML is static, so we can generate it once.
        _swaggerHtml = _getSwaggerHtml();

  bool matchesMountPath(String path, String mountPath) {
    // Remove any trailing slash for comparison
    String normalizedMount = mountPath.endsWith('/') && mountPath.length > 1
        ? mountPath.substring(0, mountPath.length - 1)
        : mountPath;
    String normalizedPath = path.endsWith('/') && path.length > 1
        ? path.substring(0, path.length - 1)
        : path;
    return normalizedPath == normalizedMount;
  }

  /// Handles incoming HTTP requests and serves the Swagger UI or API specification.
  ///
  /// Returns a Response indicating how the request was handled.
  @override
  Future<Response> handleCall(Session session, Request request) async {
    final path = request.url.path;

    // --- ORDER IS CRITICAL: Most specific paths first ---

    // 1. Handle the request for the JSON spec file.
    if (path == _specPath) {
      session.log('Serving LIVE version of API spec at $path');

      // Read the file from disk ON EVERY REQUEST. This solves server-side caching.
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

    // 2. Handle the request for the main UI page.
    if (matchesMountPath(path, _mountPath)) {
      session.log('Serving Swagger UI main page at $path');
      return Response.ok(
        body: Body.fromString(_swaggerHtml, mimeType: MimeType.html),
      );
    }

    // // 3. Handle the redirect from '/swagger' to '/swagger/'.
    // if (path == _redirectPath) {
    //   session.log('Redirecting from $path to $_mountPath');
    //   return Response.movedPermanently(Uri.parse(_mountPath));
    // }

    return Response.notFound();
  }

  /// Generates the HTML content for the Swagger UI page.
  ///
  /// This helper is static and can be called from the constructor.
  /// Returns a complete HTML document with the Swagger UI configured to load
  /// the API specification from the relative path 'apispec.json'.
  static String _getSwaggerHtml() {
    return '''
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Serverpod API - Swagger UI</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: "apispec.json", // Relative URL is robust
        dom_id: '#swagger-ui',
        deepLinking: true,
        // Enable all OAuth-related functionality
        oauth2RedirectUrl: window.location.origin + window.location.pathname + 'oauth2-redirect.html',
        // Show auth buttons at the top
        displayOperationId: true,
        // Persist auth data in localStorage
        persistAuthorization: true,
        // Improve the auth UX
        withCredentials: true,
        // Enable the try it out feature by default
        tryItOutEnabled: true,
      });
      window.ui = ui;
    };
  </script>
</body>
</html>''';
  }
}
