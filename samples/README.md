# Clippy Code Tips Test Samples

This directory contains sample files in multiple languages to test the Clippy code tips system with positional placeholders.

## Test Coverage

Each file is designed to trigger various pattern detections:

### Regex Patterns (TypeScript/JavaScript)
- `console.log/warn/error` - Logging pattern → tip uses `{0}` for symbolName
- `debugger` - Debugging pattern
- `TODO` comments - TODO pattern
- `FIXME` comments - FIXME pattern
- `function` declarations - Function pattern → tip uses `{0}` for symbolName
- Arrow functions - Arrow function pattern
- `class` declarations - Class pattern
- `async/await` - Async pattern
- `try/catch` - Error handling pattern
- Magic numbers (3+ digits) - Magic number pattern

### Symbol-Based Patterns (All Languages)
These patterns work across all languages via VS Code's DocumentSymbolProvider:

- **Class** (`symbol.class`) → `{0}` = symbolName, `{1}` = childCount
- **Method** (`symbol.method`) → `{0}` = symbolName, `{1}` = parentName
- **Function** (`symbol.function`) → `{0}` = symbolName
- **Interface** (`symbol.interface`) → `{0}` = symbolName, `{1}` = childCount
- **Property** (`symbol.property`) → `{0}` = symbolName, `{1}` = parentName
- **Field** (`symbol.field`) → `{0}` = symbolName, `{1}` = parentName
- **Variable** (`symbol.variable`) → `{0}` = symbolName
- **Constant** (`symbol.constant`) → `{0}` = symbolName
- **Constructor** (`symbol.constructor`) → `{0}` = symbolName, `{1}` = parentName
- **Enum** (`symbol.enum`) → `{0}` = symbolName, `{1}` = childCount
- **Enum Member** (`symbol.enumMember`) → `{0}` = symbolName
- **Type Parameter** (`symbol.typeParameter`) → `{0}` = symbolName

## Files

- `test-patterns.ts` - TypeScript (most comprehensive)
- `test-patterns.js` - JavaScript
- `test-patterns.py` - Python
- `test-patterns.java` - Java
- `test-patterns.go` - Go
- `test-patterns.rs` - Rust
- `test-patterns.cs` - C#

## How to Test

1. **Enable Clippy Tips** in VS Code settings:
   ```json
   {
     "vscode-pets.clippyHover.enabled": true,
     "vscode-pets.clippyHover.personality": "helpful",
     "vscode-pets.clippyHover.frequency": "always",
     "vscode-pets.clippyHover.enabledLanguages": ["*"]
   }
   ```

2. **Open a sample file** and move your cursor over different code elements:
   - Classes
   - Methods
   - Functions
   - Variables
   - Console.log statements
   - TODO/FIXME comments
   - etc.

3. **Check the Pet Panel** to see Clippy show tips in speech bubbles

4. **Verify placeholders** are correctly replaced:
   - Class tips should show the class name in `{0}` and member count in `{1}`
   - Method tips should show method name in `{0}` and parent class in `{1}`
   - Function tips should show function name in `{0}`
   - General tips should show file name in `{0}`

## Expected Behavior

When you hover over or place your cursor on:
- A class with 5 members → "A class with 5 members. Is it getting too big?"
- A method `greet` in class `TestClass` → "Method 'greet' in TestClass - clear and purposeful?"
- A function `calculateSum` → "Consider adding a docstring to explain what 'calculateSum' does."
- Console.log → "Logging {symbolName}? Make sure sensitive data isn't exposed!"
- Saving a file → "Saved {fileName}! Remember to commit your changes regularly."

## Troubleshooting

If tips aren't appearing:
1. Make sure VS Code Pets extension is active (spawn a pet)
2. Check frequency setting (set to "always" for testing)
3. Verify Clippy tips are enabled in settings
4. Check that the language is in enabledLanguages list
5. Look at VS Code Developer Tools console for errors

## Note on Language Support

Symbol-based patterns rely on VS Code's language server providing DocumentSymbol support. Most major languages have good support, but availability may vary.
