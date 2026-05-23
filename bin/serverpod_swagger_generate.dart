import 'dart:async';
import 'dart:io';

/// This is the entry point for the serverpod_swagger:generate command.
/// It simply forwards all arguments to the generate.dart script.
Future<void> main(List<String> args) async {
  // Get the path to the generate.dart script
  final scriptPath = Platform.script.resolve('generate.dart').toFilePath();

  // Run the generate.dart script with the provided arguments
  final process = await Process.start(
    Platform.executable, // dart executable
    [scriptPath, ...args],
    mode: ProcessStartMode.inheritStdio,
  );

  // Wait for the process to complete and exit with the same code
  final exitCode = await process.exitCode;
  exit(exitCode);
}
