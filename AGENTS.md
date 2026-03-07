# AGENTS.md - Agent Coding Guidelines for d3-heatmap2

## Project Overview
A D3.js-based heatmap visualization library. Renders heatmaps using D3 modules (d3-selection, d3-scale, d3-axis, d3-format, d3-array).

## Build, Lint, and Test Commands
- **Install**: `npm install`
- **Build**: `npm run build` - Uses Vite. Outputs: `dist/d3-heatmap2.es.js`, `dist/d3-heatmap2.umd.js`, `dist/d3-heatmap2.css`. Also builds minified version via `vite.config.min.mjs`
- **Lint**: `npm run lint` - Runs ESLint on `./src` and `./lib`
- **Test**: `npm test` - Runs Vitest. Test files use pattern `test/*-test.js`
- **Single test**: `npx vitest run test/heatmap-color-test.js` (replace with specific test file)
- **Single test (watch mode)**: `npx vitest test/heatmap-color-test.js`
- **Dev server**: `npm run dev` - Starts Vite dev server on port 3000

## Code Style Guidelines
### Language
Vanilla JavaScript (ES6+), No TypeScript

### Formatting
- 2-space indentation
- Single quotes for strings
- No semicolons (StandardJS style)
- Trailing commas where appropriate
- Variable declarations: use `var` for private variables in the closure pattern (see Library Pattern below)

### Imports
```javascript
import { select } from 'd3-selection'
import { format } from 'd3-format'
import { scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import { axisLeft, axisTop, axisBottom } from 'd3-axis'
import './path/to/styles.css'
```

### Project Structure
```
lib/heatmap.js       # Main library (D3 getter-setter pattern)
src/main.js          # Demo/entry point
src/heatmap.css      # Styles
index.js             # Root entry point
dist/                # Build output (ES, UMD, CSS)
test/                # Test files (*-test.js)
examples/            # Example usage
public/              # Static assets
vite.config.mjs      # Vite config for ES/UMD builds
vite.config.min.mjs  # Vite config for minified build
```

### Library Pattern
The library uses the **D3 getter-setter pattern**:

```javascript
export default function () {
  var width = 960
  var margin = { top: 20, right: 0, bottom: 0, left: 0 }
  var clickHandler = null

  function click (d, i, j) {
    if (typeof clickHandler === 'function') {
      clickHandler(d, i, j)
    }
  }

  function heatmap (selection) {
    // D3 rendering code here
    // Use selection.each() to iterate over selections
    // Use selection.selectAll() to create nested selections
  }

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

  heatmap.onClick = function (_) {
    if (!arguments.length) return clickHandler
    clickHandler = _
    return heatmap
  }

  return heatmap
}
```

### Naming Conventions
- **Functions/variables**: camelCase (`clickHandler`, `colorScale`)
- **Constants**: camelCase (follows StandardJS - no ALL_CAPS)
- **CSS classes**: lowercase with hyphens (`.highlight`, `.bordered`, `.legendWrapper`)
- **Files**: lowercase with hyphens (`heatmap.js`, `d3-heatmap2.css`)
- **Test files**: `*-test.js` pattern (e.g., `heatmap-color-test.js`)

### Error Handling
- Use `console.log("Error: ...")` for runtime errors (current pattern)
- Check function types before calling: `if (typeof clickHandler === 'function')`
- Validate inputs early in public methods

### CSS
Keep styles in `src/heatmap.css`. Use descriptive class names (e.g., `.legendWrapper`, `.legendRect`, `.title`, `.subtitle`)

### D3 Version
Uses D3 v5+ modules: d3-selection, d3-scale, d3-axis, d3-format, d3-array

### External Dependencies
When adding new dependencies:
1. Add to package.json dependencies or devDependencies
2. Add to vite.config.mjs `rollupOptions.external` array
3. Add to `rollupOptions.output.globals` for UMD (maps to global `d3` object)
4. Add import to source files

## Test Guidelines
### Test Framework
Uses Vitest with expect assertions. Test file naming: `test/*-test.js`. Accessibility tests use `vitest-axe` for a11y validation.

### Test Example
```javascript
import { describe, it, expect } from 'vitest'
import { scaleLinear } from 'd3-scale'

describe('feature name', () => {
  it('should do something specific', () => {
    const result = someFunction()
    expect(result).toBe(expectedValue)
  })
})
```

### Running Tests
- `npm test` - Run all tests
- `npx vitest run test/heatmap-color-test.js` - Run single test file
- `npx vitest` - Watch mode
- `npm run build && npm test` - Build before testing (recommended)

### Accessibility Testing
Tests in `test/heatmap-accessibility-test.js` use vitest-axe to validate accessibility. Run specifically:
```bash
npx vitest run test/heatmap-accessibility-test.js
```

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

### Adding a New D3 Dependency
1. Install: `npm install <package> --save` (or --save-dev)
2. Add to vite.config.mjs rollupOptions.external
3. Add to vite.config.mjs rollupOptions.output.globals
4. Import in relevant source files

## Debugging Tips
- Use `npm run dev` to start dev server on port 3000
- Open browser console to see D3 and library logs
- Check `dist/d3-heatmap2.es.js` for transpiled output
- Use Vitest watch mode for rapid test iteration: `npx vitest`

## Key Files Reference
- `lib/heatmap.js` (591 lines) - Main library with all visualization logic
- `src/main.js` - Demo entry point that uses the heatmap
- `src/heatmap.css` - All styling including legend, axes, tooltips
- Test files in `test/` - Unit and accessibility tests