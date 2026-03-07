# Coding Conventions

**Analysis Date:** 2026-03-07

## Naming Patterns

**Files:**
- Use lowercase with hyphens: `heatmap.js`, `heatmap.css`, `d3-heatmap2.css`
- Test files: `*-test.js` pattern in `test/` directory

**Functions:**
- camelCase: `clickHandler`, `mouseOver`, `updateHighlight`, `getHighlightFrames`
- Private helper functions also camelCase: `cantorPair`, `click`, `mouseOver`, `mouseOut`

**Variables:**
- camelCase: `width`, `margin`, `colorScale`, `gridSize`, `clickHandler`
- Private variables declared with `var` in closure scope

**Constants:**
- camelCase (follows StandardJS - no ALL_CAPS)
- Example from code: `nullValueColor`, `highlightOpacity`

**Types/Classes:**
- Not applicable (vanilla JS, no classes)

## Code Style

**Formatting:**
- Tool: StandardJS (ESLint config `"extends": ["standard"]`)
- 2-space indentation
- Single quotes for strings
- No semicolons
- Trailing commas where appropriate
- Template literals for string interpolation: `` `translate(${legendMargin.left + 8}, ${legendMargin.top})` ``

**Linting:**
- Tool: ESLint with `eslint-config-standard`
- Config: `.eslintrc.json` extends "standard"
- Run via: `gulp lint` or `npm test` (lint runs as part of pretest)

**Key StandardJS Rules Enforced:**
- No semicolons
- Single quotes
- No unused variables
- Arrow function consistency
- Import sorting (natural)

## Import Organization

**Order:**
1. External D3 modules
2. Local imports (if any)

**Example from `src/heatmap.js`:**
```javascript
import { select } from 'd3-selection'
import { format } from 'd3-format'
import { scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import { axisLeft, axisTop, axisBottom } from 'd3-axis'
```

**No path aliases configured** - use relative paths from source files.

## Error Handling

**Patterns:**
- Use `console.log("Error: ...")` for runtime errors
- Check function types before calling:
```javascript
if (typeof clickHandler === 'function') {
  clickHandler(d, i, j)
}
```
- Examples in code:
  - Line 103: `console.log('Error: Start row is higher than end row. No reverse range highlight.')`
  - Line 161: `console.log("Error: Can't update highlight. Heatmap was not initialized.")`

**Validation:**
- Type checking for function handlers
- Argument length check for getter/setters: `if (!arguments.length) return width`

## Logging

**Framework:** `console.log`

**When to Log:**
- Error conditions that prevent operation but don't throw
- Debug information during development

**Patterns:**
```javascript
console.log('Error: <descriptive message>')
```

## Comments

**When to Comment:**
- Complex logic sections (e.g., highlight frame calculation)
- Incomplete implementations (e.g., commented interpolateHcl on line 198)
- TODO comments not currently found in codebase

**JSDoc/TSDoc:**
- Not used in this codebase

## Function Design

**Size:**
- Main heatmap function is large (~400 lines) - accepts this pattern
- Helper functions are focused: `cantorPair` (3 lines), `click` (4 lines), `getHighlightFrames` (~60 lines)

**Parameters:**
- Use `arguments` array for getter/setter pattern
- D3 selection pattern: `function heatmap(selection)`

**Return Values:**
- Getter/setter methods return the heatmap function for chaining: `return heatmap`
- Main draw function returns nothing (operates on D3 selection)

## Module Design

**Exports:**
- Default export for main library: `export default function ()`
- Named export in index.js: `export {default as heatmap} from './src/heatmap'`

**Barrel Files:**
- `index.js` serves as re-export barrel

**Library Pattern - D3 Getter/Setter:**

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

**Key Pattern Elements:**
1. Closure with private variables
2. Main render function accepting D3 selection
3. Getter/setter methods with `!arguments.length` check
4. Methods return the function for chaining
5. Event handlers checked with `typeof` before invocation

---

*Convention analysis: 2026-03-07*