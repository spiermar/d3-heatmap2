# AGENTS.md - Agent Coding Guidelines for d3-heatmap2

## Project Overview

A D3.js-based heatmap visualization library. This is a JavaScript library that renders heatmaps using D3 modules (d3-selection, d3-scale, d3-axis, d3-format, d3-array).

## Build, Lint, and Test Commands

### Installation
```bash
npm install
```

### Build
```bash
gulp build
```
- Cleans `dist/` directory
- Runs ESLint
- Bundles with Rollup
- Copies CSS to dist
- Minifies with uglify-es
- Output: `dist/d3-heatmap2.js`, `dist/d3-heatmap2.min.js`, `dist/d3-heatmap2.css`

### Linting
```bash
gulp lint
```
Runs ESLint on `./src/**/*.js` files using the "standard" config.

### Testing
```bash
npm test
```
Runs tape tests. The test command first builds (`gulp build` via pretest), then runs `tape 'test/**/*-test.js'`.

**Note:** There are currently no test files in the test directory. Tests should be added as `test/**/*-test.js` files using the tape framework.

### Running a Single Test
```bash
tape 'test/heatmap-test.js'
```

### Development Server
```bash
gulp serve
```
Starts browser-sync dev server serving `examples/` and `dist/` directories with live reload.

---

## Code Style Guidelines

### Language
- Vanilla JavaScript (ES6+)
- No TypeScript

### Formatting
- 2-space indentation
- Single quotes for strings
- No semicolons (follows StandardJS style)
- Trailing commas where appropriate

### Imports
```javascript
import { select } from 'd3-selection'
import { format } from 'd3-format'
import { scaleLinear } from 'd3-scale'
```

### Project Structure
```
src/
  heatmap.js       # Main heatmap implementation
  heatmap.css      # Styles
index.js           # Entry point (re-exports from src)
dist/              # Build output
test/              # Test files (*-test.js)
examples/          # Example usage
```

### Library Pattern
The library uses the **D3 getter-setter pattern**:

```javascript
export default function () {
  // Private variables
  var width = 960
  var margin = { top: 20, right: 0, bottom: 0, left: 0 }

  // Main draw function
  function heatmap (selection) {
    // D3 rendering code here
  }

  // Getter/setter methods returning 'heatmap' for chaining
  heatmap.width = function (_) {
    if (!arguments.length) return width
    width = _
    return heatmap
  }

  heatmap.margin = function (_) {
    if (!arguments.length) return margin
    margin = _
    return heatmap
  }

  return heatmap
}
```

### Naming Conventions
- **Functions/variables**: camelCase (`clickHandler`, `colorScale`)
- **Constants**: camelCase (follows StandardJS - no ALL_CAPS)
- **CSS classes**: lowercase with hyphens (`.highlight`, `.bordered`)
- **Files**: lowercase with hyphens (`heatmap.js`, `d3-heatmap2.css`)

### Error Handling
- Use `console.log("Error: ...")` for runtime errors (current pattern)
- Check function types before calling: `if (typeof clickHandler === 'function')`

### CSS
- Keep styles in `src/heatmap.css`
- Use descriptive class names following BEM-like patterns (e.g., `.legendWrapper`, `.legendRect`)

### D3 Version
Uses D3 v5 modules:
- d3-selection
- d3-scale
- d3-axis
- d3-format
- d3-array

### External Dependencies
When adding new dependencies:
1. Add to package.json
2. Add to rollup.config.js `only` array if it needs to be externalized
3. Add import to source files

---

## Common Tasks

### Adding a New Configuration Option
1. Add private variable in the closure
2. Add getter/setter method returning the function for chaining
3. Use the variable in the `heatmap` draw function

### Adding a New Event Handler
1. Add handler variable (`var clickHandler = null`)
2. Create internal wrapper function checking if handler is a function
3. Add getter/setter method
4. Attach event listener in the render code

### Running the Build Before Tests
```bash
gulp build && tape 'test/*-test.js'
```