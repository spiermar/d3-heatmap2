# d3-heatmap2

## What This Is

A D3.js plugin that produces heatmaps. It's a JavaScript library that renders heatmaps using D3 modules (d3-selection, d3-scale, d3-axis, d3-format, d3-array). Published as an npm package.

## Core Value

A reusable D3.js heatmap component with configurable axes, color scales, legends, and interactive event handlers.

## Requirements

### Validated (v2.0)

- ✓ Heatmap rendering with 2D array data — v2.0
- ✓ Configurable width and margins — v2.0
- ✓ Color scale with gradient support — v2.0
- ✓ X and Y axis scales (linear) — v2.0
- ✓ X and Y axis labels (categorical) — v2.0
- ✓ Legend with color gradient — v2.0
- ✓ Click, mouseover, mouseout event handlers — v2.0
- ✓ Highlight ranges for specific cells — v2.0
- ✓ Null value handling with custom color — v2.0
- ✓ Vite build system (UMD + ESM) — v2.0
- ✓ Vitest testing infrastructure with jsdom — v2.0
- ✓ 27 unit tests covering color, scale, highlight, accessibility — v2.0
- ✓ Project structure (src/lib/, test/, examples/) — v2.0

### Active (v2.0)

- [ ] Support additional axis types (band, time)
- [ ] Improve accessibility (ARIA labels)
- [ ] ResizeObserver responsiveness
- [ ] Built-in tooltip

### Out of Scope

- [Server-side rendering] — Client-only D3 visualization
- [Mobile app wrapper] — Web library only
- [Data export] — Visualization only, not data manipulation

## Context

**Shipped v2.0** with:
- Modern Vite build system (UMD + ESM outputs)
- 27 Vitest tests with jsdom environment
- Project restructured to match d3-flame-graph layout
- D3 modules upgraded to v3/v4
- ESLint v10 with flat config

**Tech Stack:** D3 v3/v4 modules, Vanilla JavaScript (ES6+), Vite, Vitest, ESLint v10

## Constraints

- **Tech Stack**: D3 v3/v4 modules, Vanilla JavaScript (ES6+), no TypeScript
- **Build**: Vite library mode (UMD + ESM)
- **Testing**: Vitest with jsdom
- **Style**: ESLint flat config

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| D3 getter-setter pattern | Follows D3 conventions for configurability | ✓ Good |
| No TypeScript | Simple library, ES6 sufficient | ✓ Good |
| Vite for build | Modern, fast, used by d3-flame-graph | ✓ Good |
| Vitest for testing | Modern, fast, jsdom support | ✓ Good |
| Project restructure to src/lib/ | Matches d3-flame-graph pattern | ✓ Good |

---
*Last updated: 2026-03-07 after v2.0 milestone*