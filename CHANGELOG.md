## 0.3.0

- **BREAKING**: Upgraded to Serverpod 3.2.3 (from 2.9.0)
- Updated analyzer package to 10.0.1 (from 7.5.2)
- Migrated from deprecated analyzer APIs (element3→element, Element2→Element, library2→library, name3→name)
- Updated all dependencies to latest versions (path 1.9.0, test 1.29.0, lints 6.0.0)
- Improved compatibility with modern Dart analyzer
- Requires Serverpod 3.2.3 or higher

## 0.1.7

- Updated version number for maintenance release

## 0.1.6

- Updated version number for maintenance release

## 0.2.1

- Fixed critical issue with package URI resolution that caused "Cannot extract a file path from a package URI" error
- Improved static file path resolution with multiple fallback strategies
- Added detailed logging for easier troubleshooting
- Added user-friendly error pages when static files cannot be found
- Fixed path handling to require trailing slash in route definition
- Added better error handling for file serving

## 0.2.0

- Updated for Serverpod 2.8.0 compatibility
- Updated example to use the correct constructor format for Serverpod 2.8.0
- Removed dependency on shelf and shelf_static packages
- Improved static file handling
- Fixed path resolution for static files

## 0.1.5

- Updated command format from `dart serverpod_swagger:generate` to `dart run serverpod_swagger:generate` for better compatibility with modern Dart projects
added homepage docs

## 0.1.4

- Added documentation for ServerpodSwaggerVersion constructor
- Updated example directory with simplified server.dart and improved README.md
- Fixed formatting in documentation
- Completed renaming from serverpod_swagger_ui to serverpod_swagger

## 0.1.3

- Renamed library file from serverpod_swagger_ui.dart to serverpod_swagger.dart to match package name
- Fixed minor issues for package publishing compliance

## 0.1.0

- Initial beta release
- Automatically generate OpenAPI 3.0 specification from Serverpod protocol definitions
- Serve Swagger UI directly from your Serverpod server
- Support for all Serverpod data types and custom classes
