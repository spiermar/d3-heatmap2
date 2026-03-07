# Phase 4: Upgrade all dependencies - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Update all npm dependencies to their latest versions. This completes the modernization path from Phase 1 (Vite), Phase 2 (Vitest), Phase 3 (Restructure).

</domain>

<decisions>
## Implementation Decisions

### D3 Upgrade
- **Target**: D3 v4 (latest)
- **Modules to upgrade**:
  - d3-array: v1.2.4 → v3
  - d3-axis: v1.0.12 → v3
  - d3-format: v1.3.2 → v3
  - d3-scale: v2.1.2 → v4
  - d3-selection: v1.3.2 → v3
- **Rationale**: Latest features, balanced risk

### Vite Plugin Update
- **Approach**: Use Vite's built-in CSS handling
- **Action**: Remove `vite-plugin-lib-inject-css` dependency
- **Rationale**: Vite v6+ has native CSS injection, reduces dependencies

### ESLint Migration
- **Target**: Upgrade to ESLint v9 (latest)
- **Config**: Keep existing flat config (eslint.config.js) — already in correct format for v9
- **Rationale**: Latest version with compatible config

### Removed Packages
- **uglify-es**: Remove entirely — use Vite's built-in minification (terser)
- **vite-plugin-lib-inject-css**: Remove — use native Vite CSS
- **yargs**: Keep — used by the library (check actual usage before removing)

### Build Outputs
- Maintain current output structure: UMD and ESM builds in dist/
- Vite handles minification automatically in production builds

</decisions>

<specifics>
## Specific Ideas

- Match d3-flame-graph structure exactly
- Reference: https://github.com/spiermar/d3-flame-graph
- Keep D3 as external (not bundled) — user's app provides D3

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- src/lib/heatmap.js - Main library source (uses D3 modules)
- vite.config.mjs - Build config (will update for new dependencies)
- eslint.config.js - Linting config (already flat config, compatible with v9)

### Established Patterns
- D3 getter-setter pattern (preserved)
- Vite library mode builds
- UMD and ESM outputs

### Integration Points
- Package.json: Update version ranges to ^latest
- Build: Vite handles minification, no uglify-es needed
- CSS: Import directly, Vite emits to dist/

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-upgrade-all-dependencies*
*Context gathered: 2026-03-07*