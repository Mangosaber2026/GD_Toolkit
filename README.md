# GD_Toolkit

A TypeScript-based development toolkit for the **GeometricalDomination** ecosystem.

GD_Toolkit provides utilities for inspecting and validating the local development environment required by GeometricalDomination.

## Features

- **Python Detection:** Detects the installed Python interpreter and retrieves its version.
- **Version Compatibility:** Checks whether the detected Python version satisfies GD's requirements.
- **Environment Validation:** Checks whether the GeometricalDomination environment is correctly installed and accessible.
- **Terminal Output:** Provides structured, informative console messages.

## Requirements

- Node.js
- npm
- TypeScript 7.0.2 or newer (globally installed)
- Python 3.15.0 or newer
- GeometricalDomination

## Development

Compile the TypeScript source:

```powershell
tsc
```

Run the compiled application:

```powershell
node dist/index.js
```

## Project Structure

```text
GD_Toolkit/
├── src/       # TypeScript source code
├── dist/      # Compiled JavaScript
├── package.json
├── package-lock.json
└── tsconfig.json
```

## License

No open-source license has currently been assigned to this project. All rights are reserved by the copyright holder.