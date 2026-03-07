# Roadmap: d3-heatmap2

**Created:** 2004-03-07
**Updated:** 2004-03-07 (modernization)
**Granularity:** coarse
**Phases:** 5

---

## Phases

- [ ] **Phase 1: Build System Modernization** - Migrate from Gulp/Rollup to Vite
- [ ] **Phase 2: Test Infrastructure** - Migrate from Tape to Vitest with jsdom and comprehensive tests
- [ ] **Phase 3: Project Restructure** - Restructure to match d3-flame-graph (src/lib/, test/, examples/)

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

**Depends on:** Phase 1 (build system must be in place first)

**Requirements:** TEST-01, TEST-02, TEST-03, TEST-04

**Success Criteria** (what must be TRUE):
1. Running `npm test` executes Vitest test suite with jsdom environment
2. Unit tests verify color scale calculations produce correct output for given inputs
3. Unit tests verify x/y scale calculations produce correct output for given inputs
4. Unit tests verify highlight calculation logic identifies correct cells to highlight
5. Accessibility tests verify SVG elements have proper ARIA attributes using axe-core

**Plans:** TBD

---

### Phase 3: Project Restructure

**Goal:** Restructure project to match d3-flame-graph layout

**Depends on:** Phase 2 (tests must work before restructuring)

**Requirements:** REST-01, REST-02

**Success Criteria** (what must be TRUE):
1. Source code moved to `src/lib/` directory
2. Tests exist in `test/` directory with Vitest
3. Demo/example in `src/index.html` and `src/examples/`
4. Entry point configured in Vite to build from `src/lib/heatmap.js`

**Plans:** TBD

---
