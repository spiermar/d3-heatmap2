# Phase 3: Project Restructure - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Restructure project to match d3-flame-graph layout. The source code was already moved to `src/lib/` during Phase 1 (Vite migration). This phase verifies the structure and cleans up legacy files.

</domain>

<decisions>
## Implementation Decisions

### Project Structure
- Source code in `src/lib/heatmap.js`
- CSS imported in source (emits to dist/)
- Demo at `src/index.html`
- Examples in `src/examples/basic.js`
- Tests in `test/` directory (depends on Phase 2 completion)

### Cleanup Done
- Removed legacy gulpfile.js (replaced by Vite)
- Removed legacy rollup.config.js (replaced by Vite)
- Removed old examples/ directory (moved to src/examples/)
- Removed old .eslintrc.json (replaced by flat config)

### Entry Point
- Vite configured to build from `src/lib/heatmap.js`
- Output: UMD and ESM builds in dist/
- Package.json exports point to dist/

### Claude's Discretion
- Test file organization details (Phase 2)
- Additional cleanup if needed

</decisions>

<specifics>
## Specific Ideas

- Match d3-flame-graph structure exactly
- Reference: https://github.com/spiermar/d3-flame-graph

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- src/lib/heatmap.js - Main library source
- src/heatmap.css - Styles (imported in source)
- src/index.html - Dev server entry

### Established Patterns
- D3 getter-setter pattern (preserved from original)
- Vite library mode builds

### Integration Points
- index.js re-exports from src/lib
- package.json main/module point to dist/

</code_context>

<deferred>
## Deferred Ideas

- Test content in test/ directory — Phase 2
- Any further cleanup — per user request

</deferred>

---

*Phase: 03-project-restructure*
*Context gathered: 2026-03-07*