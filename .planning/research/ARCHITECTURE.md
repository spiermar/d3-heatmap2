# Architecture Patterns: D3.js Visualization Library

**Domain:** D3.js Heatmap Visualization Library  
**Researched:** 2026-03-07  
**Overall confidence:** HIGH

## Executive Summary

D3.js visualization libraries follow the **reusable chart pattern** pioneered by Mike Bostock. This architecture uses closures with getter-setter methods for configuration, making charts composable and re-renderable. For a heatmap library, the component structure involves distinct responsibilities: data processing, scale creation, axis rendering, cell rendering, legend generation, and interaction handling.

The current d3-heatmap2 implementation follows this pattern correctly. The architecture should evolve to support: (1) testability through dependency injection, (2) additional axis types (band, time) as separate components, and (3) accessibility as a cross-cutting concern.

## Recommended Architecture

### Component Boundaries

The heatmap library operates as a single primary component with several logical sub-components:

```
┌─────────────────────────────────────────────────────────────┐
│                      heatmap()                              │
│                  (main component)                           │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Data Parser  │  │ Scale Engine │  │ Layout Calculator│  │
│  │              │  │              │  │                  │  │
│  │ - columns    │  │ - colorScale │  │ - gridSize       │  │
│  │ - rows       │  │ - xScale     │  │ - margins        │  │
│  │ - max value  │  │ - yScale     │  │ - dimensions     │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Cell Renderer│  │ Axis Renderer│  │ Legend Renderer  │  │
│  │              │  │              │  │                  │  │
│  │ - rects      │  │ - xAxis      │  │ - gradient       │  │
│  │ - highlights │  │ - yAxis      │  │ - ticks          │  │
│  │ - events     │  │ - labels     │  │ - label          │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Interaction Handlers                     │  │
│  │                                                        │  │
│  │  - clickHandler  - mouseOverHandler  - mouseOutHandler│  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────��─────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Public API |
|-----------|---------------|------------|
| **Main Component** | Orchestrates rendering, holds configuration | `heatmap(selection)`, getter/setters |
| **Data Parser** | Extracts dimensions, computes data extent | Internal function |
| **Scale Engine** | Creates D3 scales for color and position | `colorScale`, `xAxisScale`, `yAxisScale` |
| **Layout Calculator** | Computes grid sizes, margins, SVG dimensions | Internal calculations |
| **Cell Renderer** | Draws heatmap cells, handles highlighting | SVG rect elements |
| **Axis Renderer** | Renders x/y axes and labels | D3 axis components |
| **Legend Renderer** | Creates color legend with gradient | SVG gradient + axis |
| **Interaction Handlers** | Manages click, hover events | `.onClick()`, `.onMouseOver()` |

### Data Flow

```
User Data (2D Array)
        │
        ▼
┌───────────────────┐
│   Selection       │
│   .datum(data)    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐     ┌─────────────────┐
│   Data Parser     │────▶│  Scale Engine   │
│  - dimensions     │     │  - domain/range │
│  - extent         │     │  - color mapping│
└─────────┬─────────┘     └────────┬────────┘
          │                        │
          ▼                        ▼
┌───────────────────┐     ┌─────────────────┐
│ Layout Calculator │     │  Cell Renderer  │
│  - gridSize       │────▶│  - rect elements│
│  - margins        │     │  - fill colors  │
└─────────┬─────────┘     └────────┬────────┘
          │                        │
          ▼                        ▼
┌───────────────────┐     ┌─────────────────┐
│   Axis Renderer   │     │ Legend Renderer │
│  - axis elements  │     │  - gradient     │
│  - labels         │     │  - ticks        │
└───────────────────┘     └─────────────────┘
          │                        │
          └────────┬───────────────┘
                   ▼
          ┌───────────────────┐
          │    SVG Output     │
          │  (visualization)  │
          └───────────────────┘
```

### Current d3-heatmap2 Architecture (as implemented)

The current implementation follows Mike Bostock's reusable chart pattern:

```javascript
export default function () {
  // Private variables (configuration state)
  var width = 960
  var margin = { top: 20, right: 0, bottom: 0, left: 0 }
  var colorScale = null
  // ... more config

  // Main draw function - called with a D3 selection
  function heatmap (selection) {
    selection.each(function(data) {
      // Rendering logic here
    })
  }

  // Getter/setter methods (chainable)
  heatmap.width = function (_) {
    if (!arguments.length) return width
    width = _
    return heatmap
  }

  // ... more getters/setters

  return heatmap
}
```

This pattern enables:
- Method chaining: `heatmap().width(500).height(300)`
- Data binding: `d3.select('#chart').datum(data).call(heatmap())`
- Re-rendering with new config: Call `.call(heatmap())` again

### Communication Patterns

| Pattern | Usage | Example |
|---------|-------|---------|
| **Getter/Setter** | Configuration | `heatmap.width(800)` |
| **D3 Selection** | DOM manipulation | `selection.append('svg')` |
| **Callback** | Event handling | `.onClick(handler)` |
| **Shared State** | Internal (closure) | `colorScale` variable |

## Patterns to Follow

### Pattern 1: Reusable Chart (Bostock Pattern)

**What:** A closure-based component with chainable getter/setter methods

**When:** Default for all D3 reusable components

**Example:**
```javascript
export default function () {
  var width = 960
  var height = 500

  function chart (selection) {
    selection.each(function (data) {
      // Render using width, height, data
    })
  }

  chart.width = function (_) {
    if (!arguments.length) return width
    width = _
    return chart
  }

  return chart
}
```

### Pattern 2: Update Pattern for Reactivity

**What:** Support re-rendering when data or config changes

**When:** Charts need to update dynamically

**Example:**
```javascript
function heatmap (selection) {
  selection.each(function (data) {
    var svg = d3.select(this).selectAll('svg').data([data])
    
    var svgEnter = svg.enter().append('svg')
    // Create elements
    
    var svgMerge = svg.merge(svgEnter)
    // Update elements with transitions
  })
}
```

### Pattern 3: Sub-component Extraction

**What:** Extract complex rendering into separate functions

**When:** A function exceeds ~50 lines or handles distinct visual elements

**Example:**
```javascript
function heatmap (selection) {
  selection.each(function (data) {
    renderAxes(this, data)
    renderCells(this, data)
    renderLegend(this, data)
  })
}

function renderAxes (context, data) { /* ... */ }
function renderCells (context, data) { /* ... */ }
function renderLegend (context, data) { /* ... */ }
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Monolithic Rendering Function

**What:** Putting all rendering in one 500+ line function

**Why bad:** Hard to test, maintain, and understand

**Instead:** Extract logical components (axes, cells, legend)

### Anti-Pattern 2: Direct DOM Manipulation Outside Selection

**What:** Using `document.querySelector` or `document.getElementById`

**Why bad:** Breaks D3's data binding paradigm, makes testing difficult

**Instead:** Always use D3 selections passed to the component

### Anti-Pattern 3: Hard-coded D3 Dependencies

**What:** Importing D3 modules at module level for direct use

**Why bad:** Makes testing impossible without a DOM

**Instead:** Inject D3 as optional dependency or use JSDOM in tests

### Anti-Pattern 4: State Mutation in Render

**Why bad:** Breaks immutability, causes unpredictable behavior

**Instead:** Compute derived values in render, keep config immutable

## Scalability Considerations

| Concern | At 100 cells | At 10K cells | At 1M cells |
|---------|--------------|--------------|-------------|
| **DOM nodes** | ~100 rects | ~10K rects | Too many for SVG |
| **Rendering** | Instant | Instant | Use Canvas or WebGL |
| **Interaction** | Direct events | Event delegation | Virtual scrolling |
| **Memory** | Low | Moderate | Release unused data |

### Current Limitations

- **SVG-only**: No Canvas support for large datasets
- **Full re-render**: No incremental updates when data changes
- **Single instance**: No faceted/multiple heatmaps per page

## Build Order Recommendations

Based on component dependencies, implement in this order:

### Phase 1: Core Structure (existing)
- Main component with getter/setter pattern ✓
- Basic cell rendering ✓
- Color scale support ✓

### Phase 2: Testability
- Extract pure functions from render logic
- Make scale creation injectable
- Create unit tests for data processing

### Phase 3: Additional Axis Types
1. **Scale Factory** — Create scale based on type (linear, band, time)
2. **Axis Component** — Switch on scale type for rendering
3. **Labels Component** — Support categorical labels for band scales

### Phase 4: Accessibility
1. **ARIA Manager** — Add roles to SVG and elements
2. **Keyboard Navigation** — Make cells focusable
3. **Screen Reader Support** — Add title, description, data table

### Phase 5: Performance (if needed)
1. **Update Pattern** — Implement enter/update/exit
2. **Canvas Renderer** — Alternative to SVG for large data
3. **Web Workers** — Offload data processing

## Sources

- [Towards Reusable Charts - Mike Bostock](https://bost.ocks.org/mike/chart/) — HIGH
- [D3 Reusability - Interactive Information Visualization](https://info474-s17.github.io/book/d3-reusability.html) — HIGH
- [Stack Overflow: D3 Reusable Chart Pattern](https://stackoverflow.com/questions/44836411/) — MEDIUM
- [Unit Testing D3 Code](https://glebbahmutov.com/blog/unit-testing-d3-code-without-browser/) — HIGH
- [SVG Accessibility/ARIA Roles - W3C](https://www.w3.org/wiki/SVG_Accessibility/ARIA_roles_for_charts) — HIGH
- [D3 Graph Gallery - Heatmap](https://d3-graph-gallery.com/graph/heatmap_style.html) — MEDIUM
- [Accessible Data Viz with D3.js](https://fossheim.io/writing/posts/accessible-dataviz-d3-intro/) — HIGH