# Roadmap: d3-heatmap2

**Created:** 2004-03-07
**Updated:** 2026-03-07 (modernization)
**Granularity:** coarse
**Phases:** 4

---

## Phases

- [x] **Phase 1: Build System Modernization** - Migrate from Gulp/Rollup to Vite ✓
- [ ] **Phase 2: Test Infrastructure** - Migrate from Tape to Vitest with jsdom and comprehensive tests
- [ ] **Phase 3: Project Restructure** - Restructure to match d3-flame-graph (src/lib/, test/, examples/)
- [ ] **Phase 4: Upgrade all dependencies** - Update all dependencies to latest

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

**Plans:** 1/1 plans complete

Plans:
- [x] 01-01-PLAN.md — Migrate build system from Gulp/Rollup to Vite

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

**Plans:** 2/2 plans

Plans:
- [ ] 02-01-PLAN.md — Set up Vitest with jsdom environment
- [ ] 02-02-PLAN.md — Create unit tests for color scale, x/y scale, highlight logic, and accessibility

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

**Plans:** 1/1 plans

Plans:
- [ ] 03-01-PLAN.md — Verify project structure matches d3-flame-graph layout

### Phase 4: upgrade all dependencies

**Goal:** Upgrade all npm dependencies to latest versions, completing the modernization path from Phase 1 (Vite), Phase 2 (Vitest), Phase 3 (Restructure).

**Requirements**: None - dependency-only phase

**Depends on:** Phase 3

**Plans:** 1/1 plans

Plans:
- [ ] 04-01-PLAN.md — Upgrade D3 modules, ESLint, and remove deprecated packages

---
