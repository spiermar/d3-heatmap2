# Requirements: d3-heatmap2

**Defined:** 2026-03-07
**Core Value:** A reusable D3.js heatmap component with configurable axes, color scales, legends, and interactive event handlers.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Build System

- [x] **BUILD-01**: Project uses Vite for builds (replaces Gulp + Rollup)
- [x] **BUILD-02**: Vite produces UMD and ESM builds with proper D3 externals

### Project Structure

- [ ] **REST-01**: Source code in `src/lib/` directory
- [ ] **REST-02**: Tests in `test/` directory, examples in `src/examples/`

### Testing

- [ ] **TEST-01**: Test infrastructure uses Vitest with jsdom environment
- [ ] **TEST-02**: Unit tests exist for scale calculations (color scale, x/y scales)
- [ ] **TEST-03**: Unit tests exist for highlight calculation logic
- [ ] **TEST-04**: Accessibility tests exist using axe-core/vitest-axe

### Axis Types

- [ ] **AXIS-01**: Heatmap supports band scale for categorical x-axis
- [ ] **AXIS-02**: Heatmap supports band scale for categorical y-axis
- [ ] **AXIS-03**: Heatmap supports time scale for temporal x-axis
- [ ] **AXIS-04**: Heatmap supports time scale for temporal y-axis
- [ ] **AXIS-05**: Band scale cells are properly aligned with axis labels

### Accessibility

- [ ] **ACCL-01**: SVG element has role="graphics-document" with aria-label
- [ ] **ACCL-02**: Each heatmap cell has aria-label describing its value and position
- [ ] **ACCL-03**: Title element provides chart description for screen readers
- [ ] **ACCL-04**: Legend has proper ARIA labeling

### Responsiveness & Polish

- [ ] **POLY-01**: Heatmap responds to container resize using ResizeObserver
- [ ] **POLY-02**: Built-in tooltip displays value on cell hover
- [ ] **POLY-03**: Tooltip positioned correctly within container bounds

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Animation

- **ANIM-01**: Heatmap supports enter transitions when data loads
- **ANIM-02**: Heatmap supports update transitions when data changes
- **ANIM-03**: Transition duration configurable via API

### Advanced Features

- **ADVZ-01**: Zoom and pan support for large datasets
- **ADVZ-02**: Cell annotations (text on cells) for small datasets
- **ADVZ-03**: Image export functionality

### Color & Palette

- **PAL-01**: Pre-built color palette presets (categorical, sequential, diverging)
- **PAL-02**: Custom color palette support via array input
- **PAL-03**: Colorblind-safe palette option

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Server-side rendering | Client-only D3 visualization |
| Mobile app wrapper | Web library only |
| Data export/import | Visualization only, not data manipulation |
| Real-time data streaming | Add later if needed for live dashboards |
| Canvas/WebGL rendering | Only SVG for v1; add if performance needed |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| BUILD-01 | Phase 1 | Pending |
| BUILD-02 | Phase 1 | Pending |
| REST-01 | Phase 3 | Pending |
| REST-02 | Phase 3 | Pending |
| TEST-01 | Phase 2 | Pending |
| TEST-02 | Phase 2 | Pending |
| TEST-03 | Phase 2 | Pending |
| TEST-04 | Phase 2 | Pending |
| AXIS-01 | Phase 4 | Pending |
| AXIS-02 | Phase 4 | Pending |
| AXIS-03 | Phase 4 | Pending |
| AXIS-04 | Phase 4 | Pending |
| AXIS-05 | Phase 4 | Pending |
| ACCL-01 | Phase 5 | Pending |
| ACCL-02 | Phase 5 | Pending |
| ACCL-03 | Phase 5 | Pending |
| ACCL-04 | Phase 5 | Pending |
| POLY-01 | Phase 6 | Pending |
| POLY-02 | Phase 6 | Pending |
| POLY-03 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-07*
*Last updated: 2026-03-07 after modernization request*