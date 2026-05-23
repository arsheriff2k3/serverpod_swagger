## 1.0.1

- **Updated**: Widened `analyzer` constraint to `>=10.2.0 <14.0.0` for better pub.dev scoring
- **Updated**: README and documentation refreshed to match current codebase
- **Added**: SEO metadata and favicon for documentation site

## 1.0.0

- **Stable release** for Serverpod >=3.4.2 (tested up to 3.4.8)
- **Security**: Fixed XSS vulnerability in Swagger UI HTML generation by encoding the spec URL
- **Breaking**: HTTP method detection now uses naming conventions (GET for `get*`/`list*`/`find*`, POST for `create*`/`add*`, PATCH for `update*`/`edit*`, DELETE for `delete*`/`remove*`, default POST) instead of parameter-type-based detection
- **Added**: `required` field in POST/PATCH/DELETE request body schemas for non-nullable parameters
- **Added**: 400 and 500 error responses on all operations
- **Added**: `num`, `Duration`, `UuidValue` type mapping and enum value extraction in generated specs
- **Added**: Export `SwaggerSpec`, `SwaggerEndpoint`, `SwaggerMethod`, `SwaggerParameter` models from public API
- **Added**: Export `generateOpenApiMap`, `generateOpenApiJson`, and `inferHttpMethod` for programmatic spec generation
- **Removed**: 858 lines of dead commented-out code in `parser.dart`
- **Removed**: Unused static HTML file and placeholder protocol.yaml
- **Removed**: Internal `package:analyzer/src/` import (replaced with public API + deprecation suppression)
- **Updated**: Swagger UI from v5.11.0 to v5.18.2
- **Fixed**: Version constants now correctly reflect package version (was stuck at 0.1.7) and minimum Serverpod version (was stuck at 2.8.0)
- **Improved**: `custom_generator.dart` is now a fully functional utility instead of a stub

## 0.4.0

- **BREAKING**: Upgraded to Serverpod 3.4.2 (from 3.2.3)

## 0.3.1

- **NEW**: Added `customSpecPath` parameter to `SwaggerUIRoute` for custom API specification URLs
- **NEW**: Added `ApiSpecRoute` class for serving `apispec.json` at custom paths
- **IMPROVED**: Automatic redirection from mount path without trailing slash to with trailing slash
- **IMPROVED**: Better support for mounting Swagger UI at custom paths
- **FIXED**: Issue where Swagger UI couldn't locate `apispec.json` when mounted at custom paths
- Updated documentation with examples for both default and custom path configurations

## 0.3.0

- **BREAKING**: Upgraded to Serverpod 3.2.3 (from 2.9.0)
- Updated analyzer package to 10.0.1 (from 7.5.2)
- Migrated from deprecated analyzer APIs
- Updated all dependencies to latest versions
- Improved compatibility with modern Dart analyzer

## 0.2.1

- Fixed critical issue with package URI resolution
- Improved static file path resolution with multiple fallback strategies
- Added detailed logging for easier troubleshooting
- Added user-friendly error pages when static files cannot be found

## 0.2.0

- Updated for Serverpod 2.8.0 compatibility
- Removed dependency on shelf and shelf_static packages
- Improved static file handling

## 0.1.5

- Updated command format to `dart run serverpod_swagger:generate`

## 0.1.4

- Added documentation for ServerpodSwaggerVersion constructor
- Completed renaming from serverpod_swagger_ui to serverpod_swagger

## 0.1.3

- Renamed library file to match package name

## 0.1.0

- Initial beta release
- Automatically generate OpenAPI 3.0 specification from Serverpod protocol definitions
- Serve Swagger UI directly from your Serverpod server
- Support for all Serverpod data types and custom classes
