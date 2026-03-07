# Roadmap: d3-heatmap2

**Created:** 2026-03-07
**Updated:** 2026-03-07 (modernization)
**Granularity:** coarse
**Phases:** 5

---

## Phases

- [ ] **Phase 1: Build System Modernization** - Migrate from Gulp/Rollup to Vite
- [ ] **Phase 2: Test Infrastructure** - Migrate from Tape to Vitest with jsdom and comprehensive tests
- [ ] **Phase 3: Project Restructure** - Restructure to match d3-flame-graph (src/lib/, test/, examples/)
- [ ] **Phase 4: Axis Type Expansion** - Support band and time scales for categorical and temporal data
- [ ] **Phase 5: Accessibility** - Implement ARIA labels and screen reader support
- [ ] **Phase 6: Polish & Responsiveness** - Add resize handling and built-in tooltips

---

## Phase Details

### Phase 1: Build System Modernization

**Goal:** Migrate from Gulp/Rollup to Vite for modern, fast builds

**Depends on:** Nothing (first phase)

**Requirements:** BUILD-01, BUILD-02

**Success Criteria** (what must be TRUE):
1. `npm run build` produces UMD and ESM builds via Vite
2. `npm run dev` starts development server with hot reload
3. CSS is properly extracted/injected in builds
4. D3 modules are externalized in builds (not bundled)
5. Build outputs match d3-flame-graph structure (d3-heatmap2.umd.js, d3-heatmap2.es.js, d3-heatmap2.css)

**Plans:** TBD

---

### Phase 2: Test Infrastructure

**Goal:** Establish quality baseline with comprehensive test coverage

**Depends on:** Nothing (first phase)

**Requirements:** TEST-01, TEST-02, TEST-03, TEST-04

**Success Criteria** (what must be TRUE):
1. Running `npm test` executes Vitest test suite with jsdom environment
2. Unit tests verify color scale calculations produce correct output for given inputs
3. Unit tests verify x/y scale calculations produce correct output for given inputs
4. Unit tests verify highlight calculation logic identifies correct cells to highlight
5. Accessibility tests verify SVG elements have proper ARIA attributes using axe-core

**Plans:** TBD

---

### Phase 3: Axis Type Expansion

**Goal:** Support band and time scales for categorical and temporal data

**Depends on:** Phase 2 (test infrastructure enables verification of new scale behavior)

**Requirements:** AXIS-01, AXIS-02, AXIS-03, AXIS-04, AXIS-05

**Success Criteria** (what must be TRUE):
1. Users can provide categorical data and see properly aligned band scale on x-axis
2. Users can provide categorical data and see properly aligned band scale on y-axis
3. Users can provide temporal data and see time-formatted ticks on x-axis
4. Users can provide temporal data and see time-formatted ticks on y-axis
5. Band scale cells are visually aligned with axis labels (centered on tick positions)

**Plans:** TBD

---

### Phase 4: Accessibility

**Goal:** Make heatmap usable by screen reader users with proper ARIA labeling

**Depends on:** Phase 3 (axis implementation establishes component structure for accessibility)

**Requirements:** ACCL-01, ACCL-02, ACCL-03, ACCL-04

**Success Criteria** (what must be TRUE):
1. Heatmap SVG root element has `role="graphics-document"` and `aria-label` describing the chart
2. Each heatmap cell has an `aria-label` attribute describing its value and position (e.g., "Value: 42, Row: January, Column: Product A")
3. SVG contains a `<title>` element that screen readers can read as chart description
4. Legend element has proper `aria-label` or `aria-labelledby` identifying it as the color legend

**Plans:** TBD

---

### Phase 5: Polish & Responsiveness

**Goal:** Modern web integration with responsive resizing and built-in tooltips

**Depends on:** Phase 4 (accessibility in place before adding interactive tooltips)

**Requirements:** POLY-01, POLY-02, POLY-03

**Success Criteria** (what must be TRUE):
1. Heatmap automatically redraws when container size changes (using ResizeObserver)
2. Hovering over any cell displays a tooltip showing the cell's value
3. Tooltip stays within container bounds and doesn't overflow off-screen

**Plans:** TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Build System Modernization | 0/1 | Not started | - |
| 2. Test Infrastructure | 0/1 | Not started | - |
| 3. Project Restructure | 0/1 | Not started | - |
| 4. Axis Type Expansion | 0/1 | Not started | - |
| 5. Accessibility | 0/1 | Not started | - |
| 6. Polish & Responsiveness | 0/1 | Not started | - |

---

## Coverage

**v1 Requirements:** 18 total (including build migration)

| Phase | Requirements | Coverage |
|-------|--------------|----------|
| 1: Build System Modernization | BUILD-01, BUILD-02 | 2/18 |
| 2: Test Infrastructure | TEST-01, TEST-02, TEST-03, TEST-04 | 4/18 |
| 3: Project Restructure | REST-01, REST-02 | 2/18 |
| 4: Axis Type Expansion | AXIS-01, AXIS-02, AXIS-03, AXIS-04, AXIS-05 | 5/18 |
| 5: Accessibility | ACCL-01, ACCL-02, ACCL-03, ACCL-04 | 4/18 |
| 6: Polish & Responsiveness | POLY-01, POLY-02, POLY-03 | 3/18 |

✓ All 18 v1 requirements mapped to phases

---

*Roadmap created: 2026-03-07*
*Last updated: 2026-03-07 after modernization request*