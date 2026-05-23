// data_models.dart

/// Represents the complete OpenAPI specification structure.
///
/// Contains a collection of endpoints that will be converted to OpenAPI paths.
class SwaggerSpec {
  /// Map of endpoint names to their corresponding endpoint objects.
  final Map<String, SwaggerEndpoint> endpoints = {};
}

/// Represents a Serverpod endpoint class in the OpenAPI specification.
///
/// Each endpoint contains multiple methods that will be converted to OpenAPI operations.
class SwaggerEndpoint {
  /// The name of the endpoint, typically derived from the class name.
  final String name;

  /// Map of method names to their corresponding method objects.
  final Map<String, SwaggerMethod> methods = {};

  /// Creates a new SwaggerEndpoint with the given name.
  SwaggerEndpoint(this.name);
}

/// Represents a method in a Serverpod endpoint class.
///
/// Each method will be converted to an OpenAPI operation with parameters
/// and a response schema based on the return type.
class SwaggerMethod {
  /// The name of the method.
  final String name;

  /// Map of parameter names to their corresponding parameter objects.
  final Map<String, SwaggerParameter> parameters = {};

  /// The return type of the method, used to generate the response schema.
  ///
  /// This is determined by analyzing the method's return type in the AST.
  String? returnType;

  /// Creates a new SwaggerMethod with the given name.
  SwaggerMethod(this.name);
}

/// Represents a parameter in a Serverpod endpoint method.
///
/// Each parameter will be converted to an OpenAPI parameter or request body
/// property depending on its type.
class SwaggerParameter {
  /// The name of the parameter.
  final String name;

  /// The type of the parameter as a string.
  final String type;

  /// Whether the parameter is nullable.
  final bool isNullable;

  /// Creates a new SwaggerParameter with the given properties.
  SwaggerParameter({
    required this.name,
    required this.type,
    required this.isNullable,
  });

  @override
  String toString() => 'Param($name: $type, nullable: $isNullable)';
}
