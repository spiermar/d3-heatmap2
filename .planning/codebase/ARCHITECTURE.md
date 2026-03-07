# Architecture

**Analysis Date:** 2026-03-07

## Pattern Overview

**Overall:** D3 Getter-Setter Pattern (Closure/Factory Pattern)

**Key Characteristics:**
- Single exported factory function that creates a heatmap instance
- Configuration via chained getter/setter methods returning `this` for method chaining
- Private state encapsulated in function closure
- D3 selection receives the rendered visualization via `.call(chart)`

## Layers

**Core Library:**
- Purpose: Renders heatmap visualizations using D3 modules
- Location: `src/heatmap.js`
- Contains: Main `heatmap()` factory function with 25+ configuration methods
- Depends on: d3-selection, d3-scale, d3-axis, d3-format, d3-array
- Used by: Any consumer via the public API

**Entry Point:**
- Purpose: Re-export the heatmap module for module consumers
- Location: `index.js`
- Contains: Single re-export statement
- Depends on: `src/heatmap.js`

**Build/Bundling:**
- Purpose: Transform source into distribution format
- Location: `rollup.config.js`, `gulpfile.js`
- Contains: Rollup bundling configuration and Gulp build tasks
- Depends on: Rollup, CommonJS plugin, Node resolve plugin

## Data Flow

**Initialization Flow:**

1. Consumer calls `d3.heatmap()` to create a heatmap instance
2. Consumer configures via chained methods: `.width(960).colorScale(...)`
3. Consumer loads data (typically via `d3.json()`)
4. Consumer creates selection: `d3.select("#chart").datum(data)`
5. Consumer invokes chart: `.call(chart)`

**Rendering Flow:**

1. `heatmap(selection)` receives D3 selection
2. Extracts data via `selection.datum()`
3. Calculates grid dimensions from data and configured width
4. Creates color scale (or uses configured one)
5. Appends SVG element with proper margins
6. Renders Y-axis (labels or scale)
7. Renders X-axis (labels or scale)
8. Renders heatmap cells (rectangles) with color mapping
9. Renders highlight overlays if configured
10. Renders title/subtitle if configured
11. Renders legend if `legendElement` is set

**Event Handling Flow:**

1. User interacts (click/hover)
2. Event handlers (`click`, `mouseOver`, `mouseOut`) check if handler function is set
3. If handler exists, it receives `(value, columnIndex, rowIndex)` arguments
4. Consumer can call `chart.updateHighlight()` to refresh highlight overlays

## Key Abstractions

**Heatmap Factory:**
- Purpose: Creates configurable heatmap instances
- Examples: `src/heatmap.js` (lines 12-583)
- Pattern: Factory function returning configured heatmap with getter/setter methods

**Configuration Methods:**
- Purpose: Allow consumers to customize heatmap appearance and behavior
- Examples: `.width()`, `.margin()`, `.colorScale()`, `.onClick()`, `.setHighlight()`
- Pattern: Getter returns current value when called without args; setter assigns and returns `this` for chaining

**Private State Variables:**
- Purpose: Encapsulate internal state not exposed to consumers
- Examples: `svg`, `columns`, `rows`, `gridSize`, `colorScale`
- Pattern: Declared with `var` in the closure scope, accessed only via methods

**D3 Selection Receiver:**
- Purpose: Entry point for D3 to render the visualization
- Examples: `function heatmap(selection)` at line 165
- Pattern: Function receives a D3 selection, extracts data, performs DOM manipulation

## Entry Points

**Module Entry:**
- Location: `index.js`
- Triggers: When imported via ES6 imports
- Responsibilities: Re-export the heatmap module

**Browser Entry:**
- Location: `dist/d3-heatmap2.js`
- Triggers: When script tag loaded in browser
- Responsibilities: UMD bundle exposing `d3.heatmap()` globally

**Rendering Entry:**
- Location: `src/heatmap.js` - the exported default function
- Triggers: When consumer calls `.call(chart)` on a D3 selection
- Responsibilities: Accept D3 selection, render SVG visualization

## Error Handling

**Strategy:** Console logging with descriptive messages

**Patterns:**
- Type checking before calling handlers: `if (typeof clickHandler === 'function')`
- Console errors for invalid highlight ranges (lines 103, 117, 138)
- Console error when heatmap not initialized (line 161)

## Cross-Cutting Concerns

**Logging:** Console.log used for errors; no structured logging framework

**Validation:** Runtime checks for handler types; no input schema validation

**D3 Integration:**
- Uses d3-selection for DOM manipulation
- Uses d3-scale for color mapping
- Uses d3-axis for axis rendering
- Uses d3-format for number formatting

---

*Architecture analysis: 2026-03-07*