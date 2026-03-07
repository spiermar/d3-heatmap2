# Technology Stack

**Analysis Date:** 2026-03-07

## Languages

**Primary:**
- JavaScript (ES6+) - All library source code and build tooling

**Secondary:**
- None

## Runtime

**Environment:**
- Node.js (development build and testing)
- Browser (runtime - the library runs in browser environments)

**Package Manager:**
- npm (version not specified in package.json)
- Lockfile: Not present

## Frameworks

**Core:**
- D3.js v5 modules - Visualization library
  - `d3-selection` ^1.3.2
  - `d3-scale` ^2.1.2
  - `d3-axis` ^1.0.12
  - `d3-format` ^1.3.2
  - `d3-array` ^1.2.4

**Build/Dev:**
- Gulp ^4.0.0 - Task runner for build pipeline
- Rollup ^1.24.1 - Module bundler
- Rollup plugins:
  - rollup-plugin-node-resolve ^3.3.0
  - rollup-plugin-commonjs ^8.3.0
- Vinyl streams - For Gulp/Rollup integration

**Testing:**
- Tape ^4.9.1 - Test framework
- No assertion library (tape includes its own)

**Linting:**
- ESLint ^4.0.2 - Code linting
- eslint-config-standard ^11.0.0 - StandardJS style guide
- eslint-plugin-import ^2.14.0
- eslint-plugin-node ^6.0.1
- eslint-plugin-promise ^3.8.0
- eslint-plugin-standard ^3.1.0

**Minification:**
- uglify-es ^3.3.9 - JavaScript minification

**Development Server:**
- browser-sync ^2.24.7 - Live reload development server

## Key Dependencies

**Core Visualization:**
- d3-selection ^1.3.2 - DOM selection and manipulation
- d3-scale ^2.1.2 - Scale functions for data mapping
- d3-axis ^1.0.12 - Axis generation
- d3-format ^1.3.2 - Number formatting
- d3-array ^1.2.4 - Array utilities

**CLI/Tooling:**
- yargs ^11.0.0 - CLI argument parsing (used in `tools/trace2heatmap.js`)

## Configuration

**Environment:**
- No .env files or environment variable configuration
- Library is configuration-driven via getter/setter API

**Build:**
- `gulpfile.js` - Gulp task definitions
- `rollup.config.js` - Rollup bundler configuration
- `.eslintrc.json` - ESLint configuration (extends "standard")

**Project:**
- `package.json` - npm package manifest

## Platform Requirements

**Development:**
- Node.js (version not specified - uses ES6+ features)
- npm for package management
- Git (repository at https://github.com/spiermar/d3-heatmap2)

**Production:**
- Browser environment (any modern browser)
- D3.js v4+ (for running examples; the bundled library includes D3 v5 modules as dependencies)

**Distribution:**
- UMD bundle format (Universal Module Definition)
- Output: `dist/d3-heatmap2.js`, `dist/d3-heatmap2.min.js`, `dist/d3-heatmap2.css`

---

*Stack analysis: 2026-03-07*