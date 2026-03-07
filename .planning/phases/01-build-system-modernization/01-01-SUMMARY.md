---
phase: 01-build-system-modernization
plan: 01
subsystem: build
tags: [vite, build, esm, umd, d3]

# Dependency graph
requires: []
provides:
  - Vite build system replacing Gulp/Rollup
  - UMD and ESM dual builds with D3 externals
  - Dev server on port 3000
affects: [all future phases]

# Tech tracking
tech-stack:
  added: [vite, eslint, @eslint/js, vite-plugin-lib-inject-css]
  patterns: [Vite library mode, flat ESLint config]

key-files:
  created: [vite.config.mjs, vite.config.min.mjs, eslint.config.mjs, src/index.html, src/lib/heatmap.js, src/examples/basic.js]
  modified: [package.json, index.js]

key-decisions:
  - "Used Vite library mode for dual UMD+ESM output"
  - "D3 as external dependencies (not bundled)"
  - "Added CSS import to heatmap.js for CSS file emission"

patterns-established:
  - "Vite library build: root=src, outDir=../dist"
  - "Flat ESLint config with recommended rules"

requirements-completed: [BUILD-01, BUILD-02]

# Metrics
duration: 8min
completed: 2026-03-07T20:15:00Z
---

# Phase 1 Plan 1: Build System Modernization Summary

**Migrated build system from Gulp/Rollup to Vite, producing UMD and ESM builds with D3 as external dependencies**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-07T20:06:46Z
- **Completed:** 2026-03-07T20:15:00Z
- **Tasks:** 3
- **Files modified:** 16

## Accomplishments
- Replaced Gulp/Rollup build system with Vite
- Created dual-format builds (UMD + ESM) with minified variants
- D3 modules externalized (not bundled in output)
- Dev server runs on port 3000
- ESLint flat config configured

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Vite and remove Gulp/Rollup dependencies** - `ef2e4b9` (feat)
2. **Task 2-3: Create Vite configs and dev server** - `46d377a` (feat)
3. **Fix lint script path** - `72332a7` (fix)

**Plan metadata:** (to be created)

## Files Created/Modified
- `vite.config.mjs` - Non-minified Vite build config (UMD + ESM)
- `vite.config.min.mjs` - Minified Vite build config
- `eslint.config.mjs` - ESLint flat config
- `src/index.html` - Dev server entry point
- `src/lib/heatmap.js` - Main source (moved from src/heatmap.js)
- `src/heatmap.css` - Styles (now imported in source)
- `src/examples/basic.js` - Basic example for dev server
- `index.js` - Package entry (re-exports from src/lib)
- `dist/d3-heatmap2.umd.js` - UMD build (non-minified)
- `dist/d3-heatmap2.es.js` - ESM build (non-minified)
- `dist/d3-heatmap2.umd.min.js` - UMD build (minified)
- `dist/d3-heatmap2.es.min.js` - ESM build (minified)
- `dist/d3-heatmap2.css` - CSS bundle
- `package.json` - Updated with Vite scripts and exports

## Decisions Made
- Used Vite library mode with root="src" (matching d3-flame-graph pattern)
- D3 modules as externals using individual module names, not single "d3" global
- Added CSS import to source for separate CSS file emission
- Dev server runs on port 3000 without auto-open

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed Vite entry path resolution**
- **Found during:** Task 2 (Vite config creation)
- **Issue:** Build failed with "Could not resolve entry module lib/heatmap.js"
- **Fix:** Changed entry path from `lib/heatmap.js` to `src/lib/heatmap.js`
- **Files modified:** vite.config.mjs, vite.config.min.mjs
- **Verification:** Build succeeded, all output files generated
- **Committed in:** 46d377a (part of task commit)

**2. [Rule 3 - Blocking] Added CSS import to emit CSS file**
- **Found during:** Task 3 (build verification)
- **Issue:** No CSS file generated in dist/ - CSS was not being emitted
- **Fix:** Added `import '../heatmap.css'` to src/lib/heatmap.js
- **Files modified:** src/lib/heatmap.js
- **Verification:** d3-heatmap2.css now generated in dist/
- **Committed in:** 46d377a (part of task commit)

**3. [Rule 3 - Blocking] Fixed lint script path**
- **Found during:** Post-task verification
- **Issue:** `npm run lint` failed - "lib" directory not found
- **Fix:** Changed from "eslint src lib" to "eslint src"
- **Files modified:** package.json
- **Verification:** npm run lint executes (existing lint errors in heatmap.js are pre-existing)
- **Committed in:** 72332a7

---

**Total deviations:** 3 auto-fixed (all blocking issues)
**Impact on plan:** All fixes necessary for build to work. No scope creep.

## Issues Encountered
- Pre-existing ESLint errors in heatmap.js (7 errors for console.log, unused variables) - not addressed as they were pre-existing and not in scope

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Build system complete and verified
- Ready for subsequent phases to use `npm run build` and `npm run dev`
- D3 as external allows consumers to provide their own D3 version

---
*Phase: 01-build-system-modernization*
*Completed: 2026-03-07*