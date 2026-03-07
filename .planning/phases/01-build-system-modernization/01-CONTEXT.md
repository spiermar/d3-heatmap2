# Phase 1: Build System Modernization - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate build system from Gulp + Rollup to Vite. Create modern build pipeline that produces UMD and ESM builds with D3 as external dependencies. Match d3-flame-graph structure.

</domain>

<decisions>
## Implementation Decisions

### Build Outputs
- **Formats**: Both UMD and ESM (not just one)
- **Filenames**: Full names (d3-heatmap2.umd.js, d3-heatmap2.es.js)
- **Minification**: Handled via separate Vite config (matches d3-flame-graph pattern)

### CSS Handling
- **Approach**: Injected via vite-plugin-lib-inject-css
- **Filename**: d3-heatmap2.css (full name)

### D3 Externals
- **Strategy**: D3 as external (not bundled) - user's app provides D3
- **Global name**: Individual modules (d3-array, d3-scale, d3-selection, etc.) - not single `d3` global
- This allows tree-shaking and smaller bundle sizes

### Dev Server
- **Port**: 3000
- **Auto-open**: No automatic browser open

### Linting
- **Config**: ESLint flat config (eslint.config.js)

</decisions>

<specifics>
## Specific Ideas

- "Match d3-flame-graph structure exactly"
- Reference: https://github.com/spiermar/d3-flame-graph for build patterns

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- Current source in `src/heatmap.js` - will move to `src/lib/`
- Current CSS in `src/heatmap.css` - will be processed by Vite

### Established Patterns
- D3 getter-setter pattern (to be preserved)
- Library exports default function

### Integration Points
- Vite build reads from `src/lib/heatmap.js` as entry
- Examples will live in `src/index.html` and `src/examples/`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-build-system-modernization*
*Context gathered: 2026-03-07*