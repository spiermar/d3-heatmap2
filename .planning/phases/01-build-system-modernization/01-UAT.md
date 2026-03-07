---
status: diagnosed
phase: 01-build-system-modernization
source: 01-01-SUMMARY.md
started: 2026-03-07T21:00:00Z
updated: 2026-03-07T21:06:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Build produces UMD and ESM files
expected: Running `npm run build` generates dist/d3-heatmap2.umd.js, dist/d3-heatmap2.es.js, and their minified variants.
result: pass

### 2. Dev server starts on port 3000
expected: Running `npm run dev` starts a development server accessible on port 3000
result: issue
reported: "dev server starts, but fails to render with the following error: Uncaught TypeError: heatmap(...).width(...).height is not a function at basic.js:19:4"
severity: major

### 3. CSS is properly extracted
expected: Running `npm run build` generates dist/d3-heatmap2.css with styles from the heatmap library
result: pass

### 4. D3 modules are externalized
expected: Build output files reference d3 modules externally (import statements remain), not bundled into the output
result: pass

### 5. Build output structure matches d3-flame-graph
expected: dist/d3-heatmap2.umd.js, dist/d3-heatmap2.es.js, dist/d3-heatmap2.css files exist
result: pass

## Summary

total: 5
passed: 4
issues: 1
pending: 0
skipped: 0

## Gaps

- truth: "Dev server starts and renders example without errors"
  status: failed
  reason: "User reported: dev server starts, but fails to render with the following error: Uncaught TypeError: heatmap(...).width(...).height is not a function at basic.js:19:4"
  severity: major
  test: 2
  root_cause: "src/lib/heatmap.js missing height getter/setter method"
  artifacts:
    - path: "src/lib/heatmap.js"
      issue: "heatmap.height function not defined"
  missing:
    - "Add height getter/setter method following same pattern as width"
    - "Add height variable to closure"
    - "Use height variable in heatmap draw function"
  debug_session: ""