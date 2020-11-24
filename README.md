# C++ Helper

![Screen Shot](/images/screenshot.gif)
C++ Helper extension for [VSCode](https://code.visualstudio.com/).

## Features
* Generating implementation for c++ declarations.
* Generating header guard for headers.

## Configuration

### GodotCppHelper.SourcePattern:
The array of possible patterns to find the source of a header file.

Example:
```json
"GodotCppHelper.SourcePattern": [
    "{FILE}.cpp",
    "{FILE}.c",
    "{FILE}.inl",
    "/src/{FILE}.cpp"
]
```
Where {FILE} is your active header file name.
> If you don't want a relative pattern then put a `/` as first character.

### GodotCppHelper.HeaderGuardPattern:
The pattern of header guard.
Example:
```json
"GodotCppHelper.HeaderGuardPattern": "{FILE}_H"
```
Where {FILE} is your active header file name in UPPERCASE format.

### GodotCppHelper.ContextCreateImplementation
Show or hide "Create Implementation" in context menu.

### GodotCppHelper.ContextCreateImplementationHere
Show or hide "Create Implementation Here" in context menu.

### GodotCppHelper.ContextCopyImplementation
Show or hide "Copy Implementation" in context menu.

### GodotCppHelper.ContextCreateHeaderGuard
Show or hide "Create Header Guard" in context menu.

### GodotCppHelper.SourceNotFoundBehavior
What happen if source file of a header file not found.
* Implement in same file
* Create source file

## Known Issues
If you implement a previously implemented function duplicate implementation will happen.

This extension created using regex and there is no parser/compiler.
so any wrong implementation may happen.
If you found any wrong implementation please let me know in [issues](https://github.com/amir9480/vscode-cpp-helper/issues) and also don't forget to send your code sample.

## Change Log

### 0.2.1
* Fix code indent bug when EOL was `LF`.
* Fix member `operator +`, `operator -` bug.
* Cast operator support added.

### 0.2.0
* Fix bugs (#12, #13).
* `Copy Implementation` to clipboard command added (#11).
* Create source file if not found (#14).
* Improved order of implementation.

### 0.1.0
* Add `Create Implementation Here` command. (#7)
* Add setting to hide context menu items.

### 0.0.7
* Bug #5 fixed.

### 0.0.6
* Bug #4 fixed.

### 0.0.5
* Fix bug in Linux. (#1, #2)

### 0.0.4
* Argument with default value implementation bug fixed.
* Class template specialization support added.
* Regex to find previous implementation improved.
* Bug with `operator()` fixed.
* `SourcePattern` configuration bug fixed.

### 0.0.3
* Keeping the order of implementations synced to declarations as much as possible.
