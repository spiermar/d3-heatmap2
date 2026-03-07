# Feature Landscape

**Domain:** D3.js Heatmap Visualization Libraries
**Researched:** 2026-03-07

## Executive Summary

D3.js heatmap libraries occupy a specific niche in the visualization ecosystem—they provide low-level building blocks for custom heatmaps rather than pre-configured chart components. The feature landscape divides clearly into **table stakes** (features users expect as baseline functionality) and **differentiators** (features that set libraries apart). The existing d3-heatmap2 library covers most table stakes but lacks some commonly expected interactive features and accessibility support.

## Current State (d3-heatmap2 v1.1.1)

The library already implements:

- ✓ Heatmap rendering with 2D array data
- ✓ Configurable width, height, and margins
- ✓ Color scale with gradient support (linear interpolation)
- ✓ X and Y axis scales (linear) with categorical label support
- ✓ Legend with color gradient
- ✓ Click, mouseover, mouseout event handlers
- ✓ Highlight ranges for specific cells
- ✓ Null value handling with custom color
- ✓ Title and subtitle support

---

## Table Stakes

Features users expect. Missing these = product feels incomplete or unusable.

| Feature | Why Expected | Complexity | d3-heatmap2 | Notes |
|---------|--------------|------------|-------------|-------|
| **2D data rendering** | Core purpose of heatmap | Low | ✓ Existing | Supports 2D array input |
| **Color scale configuration** | Essential for mapping values to colors | Low | ✓ Existing | Linear scale with 3-point gradient |
| **Axis labels (categorical)** | Context for rows/columns | Low | ✓ Existing | Both X and Y supported |
| **Legend** | Color meaning interpretation | Low | ✓ Existing | Gradient legend with ticks |
| **Responsive/container sizing** | Fits in various layouts | Medium | ⚠ Partial | Fixed width, no auto-resize |
| **Event handlers** | Interactivity for web apps | Low | ✓ Existing | click, mouseover, mouseout |
| **Null/missing value handling** | Real data has gaps | Low | ✓ Existing | Custom null color |
| **Grid cell styling** | Visual clarity | Low | ✓ Existing | Configurable stroke opacity |
| **Highlighting** | Focus attention on regions | Low | ✓ Existing | Column/row range highlighting |

### Missing Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Built-in tooltip** | Users expect to see values on hover without wiring up handlers | Medium | Library provides event handlers, but no default tooltip UI |
| **Responsive resizing** | Modern web apps need fluid layouts | Medium | Currently fixed width; needs resize observer |
| **Band scale support** | Categorical data is common (not just continuous) | Medium | Currently only linear scale |

---

## Differentiators

Features that set products apart. Not expected, but valued. These create competitive advantage.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Cell text annotations** | Show values directly on cells | Medium | Plotly, Seaborn support this; useful for small datasets |
| **Zoom and pan** | Explore large heatmaps | High | Requires d3-zoom integration |
| **Animation/transitions** | Smooth data updates, polished feel | Medium | d3-transition provides this |
| **Time-based axis** | Calendar heatmaps, temporal data | Medium | Currently not supported |
| **Color scale presets** | Quick-start with proven palettes | Low | e.g., Viridis, ColorBrewer integration |
| **Image export (PNG/SVG)** | Easy sharing/reporting | Medium | Requires canvas conversion |
| **Accessibility (ARIA)** | Screen reader support, WCAG compliance | High | Currently not implemented |
| **Keyboard navigation** | Full keyboard accessibility | High | Focus management, arrow keys |
| **Row/column reordering** | Dendrograms, clustering visualizations | High | Complex; often requires external library |
| **Interactive color scale** | Adjust thresholds visually | Medium | Threshold/legend drag interactions |
| **Multiple legends** | Multi-variable heatmaps | Medium | Complex, rarely needed |
| **Cell borders/shapes** | Beyond rectangles | Low | Rounded corners, custom shapes |

### Specific Feature Details

#### Tooltips
- **Current:** Event handlers (`onMouseOver`, `onMouseOut`) allow custom tooltip implementation
- **Expected:** Built-in tooltip that shows cell value + coordinates on hover
- **Implementation:** Add a floating div that follows mouse, populated from cell data

#### Zoom/Pan
- **Value:** Essential for large datasets (1000+ cells)
- **Implementation:** Integrate `d3-zoom` on the SVG container
- **Challenge:** Must sync zoom transform across cells, axes, and legend

#### Animation
- **Value:** Smooth transitions when data updates
- **Implementation:** Use `d3-transition` for entering/updating cells
- **Challenge:** Performance with large datasets

#### Time Axis
- **Value:** Calendar heatmaps (GitHub contribution graph style)
- **Implementation:** Add `d3.scaleTime` support alongside existing linear scale

---

## Anti-Features

Features to explicitly NOT build. These either:
- Fall outside the library's scope
- Contradict the project's constraints
- Are better handled by other tools

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Server-side rendering** | Client-only D3; SSR would require headless browser | Let users handle via Puppeteer/Playwright if needed |
| **Data export/import** | Visualization only, not data manipulation | User handles data before passing to library |
| **Mobile native wrapper** | Web library scope | Not applicable |
| **Built-in data aggregation** | Outside visualization scope | Users aggregate before passing data |
| **Server-side calculations** | Client-only library | Not applicable |
| **Real-time streaming data** | Would require significant architecture changes | Users rebuild on each update |

---

## Feature Dependencies

Some features depend on others being implemented first:

```
Axis Types (band, time)
    ↑
    └── Accessible keyboard navigation (depends on axis structure)

Built-in Tooltip
    ↑
    └── Responsive sizing (tooltip needs container reference)

Zoom/Pan
    ↑
    └── Responsive sizing (zoom needs proper container bounds)

Animation
    ↑
    └── Data update API (transition triggers on data change)

Accessibility (ARIA)
    ↑
    └── Semantic structure (needs proper role attributes on SVG elements)
```

---

## MVP Recommendation

Based on research, prioritize in this order:

### Priority 1: Table Stakes Gaps
1. **Built-in tooltip** — Low effort, high impact; users shouldn't need to wire up handlers
2. **Responsive resizing** — Critical for modern web integration; use ResizeObserver
3. **Band scale support** — Common use case; straightforward D3 integration

### Priority 2: High-Value Differentiators
4. **Animation/transitions** — Polish; valuable for data update scenarios
5. **Time axis support** — Enables calendar heatmap use cases

### Priority 3: Accessibility
6. **ARIA labels** — Important for inclusive products; manageable scope
7. **Keyboard navigation** — Significant effort; defer unless required

### Priority 4: Nice-to-Have Differentiators
8. **Image export** — Useful but not critical
9. **Cell annotations** — Only for small datasets; may not justify complexity
10. **Zoom/pan** — Only if supporting large datasets is a goal

---

## Confidence Assessment

| Area | Confidence | Reason |
|------|------------|--------|
| Table stakes | HIGH | Based on D3 Graph Gallery examples, Plotly comparison, existing library analysis |
| Differentiators | MEDIUM | Derived from library feature comparisons; market research on Plotly, ECharts, Seaborn |
| Anti-features | HIGH | Based on project constraints explicitly stated in PROJECT.md |

---

## Sources

- D3 Graph Gallery: https://d3-graph-gallery.com/heatmap.html
- Plotly Heatmap Documentation: https://plotly.com/python/heatmaps/
- Observable D3 Gallery: https://observablehq.com/@d3/gallery
- D3-zoom Documentation: https://d3js.org/d3-zoom
- D3-transition Documentation: https://d3js.org/d3-transition
- Accessibility in D3: https://moldstud.com/articles/p-how-to-use-d3js-for-creating-accessible-data-visualizations
- Awesome D3 List: https://github.com/wbkd/awesome-d3