# Phase 2: Test Infrastructure - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up Vitest with jsdom for comprehensive test coverage. Migrate from Tape to Vitest. Create unit tests for color scale, x/y scale, and highlight calculations. Add accessibility tests with axe-core.

</domain>

<decisions>
## Implementation Decisions

### Test Organization
- **Pattern**: By function — separate test files per feature
- Files: heatmap-color-test.js, heatmap-scale-test.js, heatmap-highlight-test.js
- Maps directly to success criteria (color scale, x/y scale, highlight)

### Test Execution Setup
- **Config**: Separate vitest.config.js file
- Consistent with existing pattern (vite.config.mjs already exists)
- jsdom environment for DOM-based testing

### D3 Mocking Strategy
- **Approach**: Real D3 with jsdom
- Use actual D3 libraries, let jsdom handle DOM
- D3 maintainers recommend this approach for browser-compatible testing

### Claude's Discretion
- Exact test file contents and assertions
- Specific D3 module imports
- Accessibility test implementation details (axe-core integration)
- Test coverage thresholds

</decisions>

<specifics>
## Specific Ideas

- Match d3-flame-graph test patterns
- jsdom environment for SVG rendering tests
- axe-core for accessibility validation

</specifics>

 春节期间
## Existing Code Insights

### Reusable Assets
- Source at src/lib/heatmap.js — test imports from here
- D3 modules available as dependencies (d3-selection, d3-scale, etc.)
- Existing test/ directory (empty, ready for tests)

### Established Patterns
- D3 getter-setter pattern (tests should verify this)
- Vite build produces dist/ for integration testing
- No existing test patterns to follow (greenfield)

### Integration Points
- Tests run via `npm test`
- Package.json currently has: `"test": "tape 'test/**/*-test.js'"`
- Need to update to Vitest after setup

</code_context>

<deferred>
## Deferred Ideas

- Accessibility testing approach — will be discussed in planning (axe-core integration)
- Coverage reporting — could add nyc later if needed

</deferred>

---

*Phase: 02-test-infrastructure*
*Context gathered: 2026-03-07*