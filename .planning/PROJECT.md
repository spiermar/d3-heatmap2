# d3-heatmap2

## What This Is

A D3.js plugin that produces heatmaps. It's a JavaScript library that renders heatmaps using D3 modules (d3-selection, d3-scale, d3-axis, d3-format, d3-array). Published as an npm package.

## Core Value

A reusable D3.js heatmap component with configurable axes, color scales, legends, and interactive event handlers.

## Requirements

### Validated

- ✓ Heatmap rendering with 2D array data — existing (v1.1.1)
- ✓ Configurable width and margins — existing
- ✓ Color scale with gradient support — existing
- ✓ X and Y axis scales (linear) — existing
- ✓ X and Y axis labels (categorical) — existing
- ✓ Legend with color gradient — existing
- ✓ Click, mouseover, mouseout event handlers — existing
- ✓ Highlight ranges for specific cells — existing
- ✓ Null value handling with custom color — existing

### Active

- [ ] Migrate from Gulp/Rollup to Vite for build
- [ ] Migrate from Tape to Vitest with jsdom
- [ ] Add comprehensive tests for heatmap functionality
- [ ] Restructure project similar to d3-flame-graph (src/lib/, test/, examples/)
- [ ] Support additional axis types (band, time)
- [ ] Improve accessibility (ARIA labels)

### Out of Scope

- [Server-side rendering] — Client-only D3 visualization
- [Mobile app wrapper] — Web library only
- [Data export] — Visualization only, not data manipulation

## Context

This is an existing npm package (d3-heatmap2) that has been published to npm. The library uses the D3 getter-setter pattern for configuration. Currently has no test suite. Uses Gulp for build, Rollup for bundling, and ESLint with StandardJS config.

## Constraints

- **Tech Stack**: D3 v5/v7 modules, Vanilla JavaScript (ES6+), no TypeScript
- **Build**: Vite (targeting d3-flame-graph structure)
- **Testing**: Vitest with jsdom
- **Style**: ESLint flat config (similar to d3-flame-graph)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| D3 getter-setter pattern | Follows D3 conventions for configurability | ✓ Good |
| No TypeScript | Simple library, ES6 sufficient | ✓ Good |
| Vite for build | Modern, fast, used by d3-flame-graph | — Pending |
| Vitest for testing | Modern, fast, jsdom support, used by d3-flame-graph | — Pending |

## Context

Modernizing to match d3-flame-graph structure:
- Source in `src/lib/` 
- Tests in `test/`
- Examples in `src/examples/` and `src/index.html`
- UMD and ESM builds via Vite
- CSS injected via vite-plugin-lib-inject-css

---
*Last updated: 2026-03-07 after modernization request*