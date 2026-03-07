# AGENTS.md - Agent Coding Guidelines for d3-heatmap2

## Project Overview
A D3.js-based heatmap visualization library. Renders heatmaps using D3 modules (d3-selection, d3-scale, d3-axis, d3-format, d3-array).

## Build, Lint, and Test Commands
- **Install**: `npm install`
- **Build**: `npm run build` - Uses Vite. Outputs: `dist/d3-heatmap2.es.js`, `dist/d3-heatmap2.umd.js`, `dist/d3-heatmap2.css`
- **Lint**: `npm run lint` - Runs ESLint on `./src` and `./lib`
- **Test**: `npm test` - Runs Vitest. Test files use pattern `test/*-test.js`
- **Single test**: `npx vitest run test/heatmap-color-test.js`
- **Dev server**: `npm run dev` - Starts Vite dev server on port 3000

## Code Style Guidelines
### Language
Vanilla JavaScript (ES6+), No TypeScript

### Formatting
2-space indentation, Single quotes for strings, No semicolons (StandardJS style), Trailing commas where appropriate

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
dist/                # Build output
test/                # Test files (*-test.js)
examples/            # Example usage
public/              # Static assets
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

### Error Handling
Use `console.log("Error: ...")` for runtime errors (current pattern). Check function types before calling: `if (typeof clickHandler === 'function')`

### CSS
Keep styles in `src/heatmap.css`. Use descriptive class names (e.g., `.legendWrapper`, `.legendRect`, `.title`, `.subtitle`)

### D3 Version
Uses D3 v5+ modules: d3-selection, d3-scale, d3-axis, d3-format, d3-array

### External Dependencies
When adding new dependencies: add to package.json, add to vite.config.mjs `rollupOptions.external`, add to `rollupOptions.output.globals` for UMD, add import to source files

## Test Guidelines
### Test Framework
Uses Vitest with expect assertions. Test file naming: `test/*-test.js`. Accessibility tests use `vitest-axe` for a11y validation

### Test Example
```javascript
import { describe, it, expect } from 'vitest'

describe('feature name', () => {
  it('should do something specific', () => {
    const result = someFunction()
    expect(result).toBe(expectedValue)
  })
})
```

### Running Tests
- `npm test`
- `npx vitest run test/heatmap-color-test.js`
- `npx vitest` (watch mode)

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

### Building Before Tests
`npm run build && npm test`