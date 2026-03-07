# Codebase Concerns

**Analysis Date:** 2026-03-07

## Tech Debt

### No Test Coverage
- **Issue:** The `test/` directory contains zero test files (only `.gitkeep`)
- **Files:** `test/` directory is empty
- **Impact:** No way to verify correctness, no regression detection, high risk of breaking changes
- **Fix approach:** Add unit tests using tape framework for core functionality (data transformation, color scaling, highlight logic)

### Hardcoded Legend Gradient ID
- **Issue:** Legend gradient ID `legend-traffic` is hardcoded in both JS and CSS
- **Files:** `src/heatmap.js` (lines 336-364)
- **Impact:** Breaks if multiple heatmaps are rendered on the same page (SVG gradient IDs must be unique)
- **Fix approach:** Generate unique ID based on instance or use a configurable prefix

### Global CSS Selectors
- **Issue:** CSS rules apply to generic element selectors like `text {}` 
- **Files:** `src/heatmap.css` (lines 24-28)
- **Impact:** Can affect other SVG elements on the page unintentionally
- **Fix approach:** Scope CSS with more specific selectors (e.g., `.heatmap-container text`)

### Magic Numbers Throughout Code
- **Issue:** Hardcoded values without explanation: `+ 3`, `+ 50`, `-60`, `-40`, etc.
- **Files:** `src/heatmap.js` (multiple locations)
- **Impact:** Difficult to understand layout calculations, fragile when adjusting spacing
- **Fix approach:** Extract to named constants or make configurable via options

### Yargs as Dev Dependency
- **Issue:** `yargs` is listed in `dependencies` but used only in `tools/trace2heatmap.js`
- **Files:** `package.json` (line 51)
- **Impact:** Unnecessary bundle size for library consumers
- **Fix approach:** Move `yargs` to `devDependencies`

---

## Known Bugs

### Data Validation Missing
- **Issue:** No validation that input data is valid 2D array structure
- **Files:** `src/heatmap.js` (line 169) - `rows = data[0].length`
- **Trigger:** Passing `null`, undefined, or non-array data causes cryptic errors
- **Workaround:** Consumers must ensure valid data format before passing

### Version Mismatch D3
- **Issue:** Library uses D3 v5 modules, but example HTML loads D3 v4
- **Files:** `examples/index.html` (line 61) vs `package.json` (lines 46-50)
- **Trigger:** Running examples may cause undefined behavior
- **Workaround:** Update example to use D3 v5 or ensure version compatibility

### Cantor Pair Collision Risk
- **Issue:** `cantorPair` function used for unique keys could have collisions with large datasets
- **Files:** `src/heatmap.js` (lines 7-10)
- **Trigger:** Large number of cells (coordinates > 1000)
- **Workaround:** Use more robust key generation (e.g., string concatenation)

---

## Security Considerations

### No Input Sanitization
- **Issue:** User-provided labels and data are rendered without sanitization
- **Files:** `src/heatmap.js` (lines 226, 254, 296, 305, 372)
- **Current mitigation:** None
- **Recommendations:** Consider escaping HTML entities if labels could contain user input

### No X-UA-Compatible Meta Tag Effect
- **Issue:** Example has `X-UA-Compatible` meta tag but IE8 support code
- **Files:** `examples/index.html` (lines 43-47)
- **Current mitigation:** IE8 is deprecated
- **Recommendations:** Remove legacy IE support code

---

## Performance Bottlenecks

### Inefficient Highlight Calculation
- **Issue:** `getHighlightFrames()` iterates with nested loops and multiple conditionals
- **Files:** `src/heatmap.js` (lines 85-142)
- **Cause:** Complex logic runs on every highlight update
- **Improvement path:** Pre-calculate or simplify highlight frame logic

### Redundant Data Iteration
- **Issue:** Data is iterated twice - once for max calculation, once for rendering
- **Files:** `src/heatmap.js` (lines 187-192, 264-283)
- **Cause:** Separate passes over data
- **Improvement path:** Combine iterations or use single-pass aggregation

---

## Fragile Areas

### Highlight Frame Logic
- **Files:** `src/heatmap.js` (lines 85-142)
- **Why fragile:** Extremely complex conditional logic with many edge cases; reverse range, inverted rows, same column handling
- **Safe modification:** Add comprehensive test cases before any changes
- **Test coverage:** None - needs tests

### Legend Scale Calculation
- **Files:** `src/heatmap.js` (lines 320-349)
- **Why fragile:** Modifies `countRange` array directly (`countRange[2] = countRange[1] - countRange[0]`)
- **Safe modification:** Clone array before mutation
- **Test coverage:** None - needs tests

---

## Scaling Limits

### Grid Size Calculation
- **Current capacity:** Depends on DOM performance, typically 10,000+ cells
- **Limit:** Large grids (100x100+) may cause browser performance issues
- **Scaling path:** Consider virtualization for large datasets or canvas-based rendering

### SVG DOM Complexity
- **Current capacity:** Each cell is a separate `<rect>` element
- **Limit:** Browsers struggle with 50,000+ DOM nodes
- **Scaling path:** Use canvas or implement cell bundling for large datasets

---

## Dependencies at Risk

### Outdated ESLint Config
- **Risk:** `eslint-config-standard@11.0.0` is extremely outdated (current v17+)
- **Impact:** Missing modern linting rules, potential security issues in tooling
- **Migration plan:** Upgrade to eslint-config-standard@17+

### Outdated Tape
- **Risk:** `tape@4.9.1` is outdated (current v5+)
- **Impact:** Missing features, potential bugs
- **Migration plan:** Upgrade to latest tape version

### Outdated Yargs
- **Risk:** `yargs@11.0.0` is outdated (current v17+)
- **Impact:** Missing features in CLI tool
- **Migration plan:** Upgrade to yargs@17+

### Gulp Plugins Deprecated
- **Risk:** Multiple gulp plugins are very old (`gulp-eslint`, `gulp-uglify-es`, etc.)
- **Impact:** Some show deprecation warnings
- **Migration plan:** Consider migrating build to npm scripts or modern bundlers

---

## Missing Critical Features

### No Destroy/Cleanup Method
- **Problem:** No way to remove heatmap from DOM or clean up event listeners
- **Blocks:** Single-page applications that need to remove components

### No Responsive Sizing
- **Problem:** Width must be set before rendering; no resize handling
- **Blocks:** Responsive layouts

### No TypeScript Types
- **Problem:** No type definitions
- **Blocks:** Type-safe usage in TypeScript projects

### No React/Vue/Angular Wrappers
- **Problem:** No framework-specific integrations
- **Blocks:** Easier integration with modern frameworks

---

## Test Coverage Gaps

### No Unit Tests
- **What's not tested:** All core functionality
- **Files:** Entire `src/heatmap.js` has zero test coverage
- **Risk:** Any refactoring could silently break functionality
- **Priority:** High

### No Integration Tests
- **What's not tested:** End-to-end rendering with sample data
- **Files:** No example test coverage
- **Risk:** Rendering bugs could go unnoticed
- **Priority:** Medium

---

*Concerns audit: 2026-03-07*