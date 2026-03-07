# Roadmap: d3-heatmap2

**Created:** 2026-03-07
**Granularity:** coarse
**Phases:** 4

---

## Phases

- [ ] **Phase 1: Test Infrastructure** - Establish quality baseline with Vitest, jsdom, and accessibility tests
- [ ] **Phase 2: Axis Type Expansion** - Support band and time scales for categorical and temporal data
- [ ] **Phase 3: Accessibility** - Implement ARIA labels and screen reader support
- [ ] **Phase 4: Polish & Responsiveness** - Add resize handling and built-in tooltips

---

## Phase Details

### Phase 1: Test Infrastructure

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

### Phase 2: Axis Type Expansion

**Goal:** Support band and time scales for categorical and temporal data

**Depends on:** Phase 1 (test infrastructure enables verification of new scale behavior)

**Requirements:** AXIS-01, AXIS-02, AXIS-03, AXIS-04, AXIS-05

**Success Criteria** (what must be TRUE):
1. Users can provide categorical data and see properly aligned band scale on x-axis
2. Users can provide categorical data and see properly aligned band scale on y-axis
3. Users can provide temporal data and see time-formatted ticks on x-axis
4. Users can provide temporal data and see time-formatted ticks on y-axis
5. Band scale cells are visually aligned with axis labels (centered on tick positions)

**Plans:** TBD

---

### Phase 3: Accessibility

**Goal:** Make heatmap usable by screen reader users with proper ARIA labeling

**Depends on:** Phase 2 (axis implementation establishes component structure for accessibility)

**Requirements:** ACCL-01, ACCL-02, ACCL-03, ACCL-04

**Success Criteria** (what must be TRUE):
1. Heatmap SVG root element has `role="graphics-document"` and `aria-label` describing the chart
2. Each heatmap cell has an `aria-label` attribute describing its value and position (e.g., "Value: 42, Row: January, Column: Product A")
3. SVG contains a `<title>` element that screen readers can read as chart description
4. Legend element has proper `aria-label` or `aria-labelledby` identifying it as the color legend

**Plans:** TBD

---

### Phase 4: Polish & Responsiveness

**Goal:** Modern web integration with responsive resizing and built-in tooltips

**Depends on:** Phase 3 (accessibility in place before adding interactive tooltips)

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
| 1. Test Infrastructure | 0/1 | Not started | - |
| 2. Axis Type Expansion | 0/1 | Not started | - |
| 3. Accessibility | 0/1 | Not started | - |
| 4. Polish & Responsiveness | 0/1 | Not started | - |

---

## Coverage

**v1 Requirements:** 16 total

| Phase | Requirements | Coverage |
|-------|--------------|----------|
| 1: Test Infrastructure | TEST-01, TEST-02, TEST-03, TEST-04 | 4/16 |
| 2: Axis Type Expansion | AXIS-01, AXIS-02, AXIS-03, AXIS-04, AXIS-05 | 5/16 |
| 3: Accessibility | ACCL-01, ACCL-02, ACCL-03, ACCL-04 | 4/16 |
| 4: Polish & Responsiveness | POLY-01, POLY-02, POLY-03 | 3/16 |

✓ All 16 v1 requirements mapped to phases

---

*Roadmap created: 2026-03-07*