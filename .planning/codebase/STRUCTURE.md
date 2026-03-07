# Codebase Structure

**Analysis Date:** 2026-03-07

## Directory Layout

```
/Users/mspier/Workspace/d3-heatmap2/
├── index.js              # Entry point (re-exports)
├── src/                  # Source code
│   ├── heatmap.js        # Main implementation
│   └── heatmap.css       # Styles
├── dist/                 # Build output (generated)
├── examples/             # Example usage files
├── test/                 # Test files (placeholder)
├── rollup.config.js      # Rollup bundler config
├── gulpfile.js           # Build tasks
├── package.json          # Package manifest
└── .eslintrc.json        # Linter config
```

## Directory Purposes

**Root (`/`):**
- Purpose: Project configuration and entry points
- Contains: package.json, build configs, git files
- Key files: `index.js`, `package.json`, `rollup.config.js`, `gulpfile.js`

**Source (`src/`):**
- Purpose: Source code for the heatmap library
- Contains: Main JavaScript implementation and CSS styles
- Key files: `src/heatmap.js` (583 lines), `src/heatmap.css` (34 lines)

**Distribution (`dist/`):**
- Purpose: Build output - ready for consumption
- Contains: Bundled JS, minified JS, CSS
- Key files: `dist/d3-heatmap2.js`, `dist/d3-heatmap2.min.js`, `dist/d3-heatmap2.css`
- Generated: Yes (created by `gulp build`)

**Examples (`examples/`):**
- Purpose: Demonstrates library usage
- Contains: HTML page and sample data
- Key files: `examples/index.html`, `examples/data.json`

**Tests (`test/`):**
- Purpose: Unit test files
- Contains: Tape test files matching `*-test.js` pattern
- Key files: Currently only `.gitkeep` placeholder

## Key File Locations

**Entry Points:**
- `index.js`: ES6 module entry - single re-export statement
- `dist/d3-heatmap2.js`: UMD browser bundle

**Configuration:**
- `package.json`: Dependencies, scripts, metadata
- `rollup.config.js`: Module bundling configuration
- `gulpfile.js`: Build tasks (clean, lint, rollup, uglify, style, serve)
- `.eslintrc.json`: Linting rules (extends "standard")

**Core Logic:**
- `src/heatmap.js`: Main heatmap implementation (the entire library)

**Styling:**
- `src/heatmap.css`: Heatmap visual styles

## Naming Conventions

**Files:**
- JavaScript: lowercase with hyphens (`heatmap.js`, `gulpfile.js`)
- CSS: lowercase with hyphens (`heatmap.css`)
- Entry point: `index.js` (not `main.js`)

**Directories:**
- lowercase, no special characters (`src/`, `dist/`, `examples/`)

**Functions/Variables:**
- camelCase (`heatmap`, `colorScale`, `gridSize`)
- Private variables use simple names: `var svg`, `var width`, `var margin`

**Constants:**
- camelCase (follows StandardJS - no ALL_CAPS): `var highlightColor = '#936EB5'`

**CSS Classes:**
- lowercase with hyphens (`.columnLabel`, `.rowLabel`, `.legendWrapper`, `.legendRect`)
- BEM-like patterns: `.legendWrapper`, `.legendRect`, `.legendTitle`

## Where to Add New Code

**New Configuration Option:**
- Primary code: `src/heatmap.js`
- Add private variable in the closure (around line 13-65)
- Add getter/setter method following pattern (around line 394-580)
- Use the variable in the `heatmap(selection)` draw function (line 165-392)

**New Event Handler:**
- Primary code: `src/heatmap.js`
- Add handler variable (e.g., around line 53-55)
- Create wrapper function checking type (e.g., lines 67-83)
- Add getter/setter method
- Attach event listener in render code

**New Styling:**
- Add to: `src/heatmap.css`
- Follow existing class naming: `.className { property: value; }`

**New Test:**
- Create: `test/heatmap-test.js` (or other `*-test.js` files)
- Use tape framework (already in dependencies)
- Follow pattern: `test('description', function(t) { ... })`

**Build Configuration Changes:**
- Bundler: `rollup.config.js`
- Tasks: `gulpfile.js`

## Special Directories

**dist/:**
- Purpose: Build output - generated distribution files
- Generated: Yes (by `gulp build`)
- Committed: Yes (published to npm/CDN)

**node_modules/:**
- Purpose: Dependencies
- Generated: Yes (by `npm install`)
- Committed: No (in .gitignore)

**test/:**
- Purpose: Test files
- Generated: No
- Committed: Yes
- Note: Currently empty (only .gitkeep), needs test files added

---

*Structure analysis: 2026-03-07*