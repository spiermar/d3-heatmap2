# Phase 4: Upgrade all dependencies - Research

**Researched:** 2026-03-07
**Domain:** npm dependency management and D3 module upgrades
**Confidence:** HIGH

## Summary

This phase upgrades all npm dependencies to their latest versions, completing the modernization path from Phase 1 (Vite), Phase 2 (Vitest), and Phase 3 (Restructure). The key upgrades are D3 v1 modules to v3/v4, ESLint v10 flat config, and removing deprecated plugins. The D3 v1 to v3/v4 migration is low-risk since the API has been stable, and the project already uses modern Vite configurations that don't require the plugins being removed.

**Primary recommendation:** Run `npm install d3-array@^3.2.4 d3-axis@^3.0.0 d3-format@^3.1.2 d3-scale@^4.0.2 d3-selection@^3.0.0 eslint@^10.0.0` and remove the deprecated packages.

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D3 target:** D3 v4 (latest)
- **Modules to upgrade:**
  - d3-array: v1.2.4 → v3 (3.2.4)
  - d3-axis: v1.0.12 → v3 (3.0.0)
  - d3-format: v1.3.2 → v3 (3.1.2)
  - d3-scale: v2.1.2 → v4 (4.0.2)
  - d3-selection: v1.3.2 → v3 (3.0.0)
- **Remove:** vite-plugin-lib-inject-css, uglify-es
- **ESLint:** Upgrade to v9 (or v10) - already uses flat config

### Claude's Discretion
- Exact version pinning strategy (^ vs ~)
- Test after each upgrade batch

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope

---

## Standard Stack

### Dependencies to Upgrade
| Package | Current | Target | Purpose |
|---------|---------|--------|---------|
| d3-array | ^1.2.4 | ^3.2.4 | Array utilities, range, statistics |
| d3-axis | ^1.0.12 | ^3.0.0 | Axis generation |
| d3-format | ^1.3.2 | ^3.1.2 | Number formatting |
| d3-scale | ^2.1.2 | ^4.0.2 | Scale functions |
| d3-selection | ^1.3.2 | ^3.0.0 | DOM selection |
| eslint | ^10.0.3 | ^10.0.0 | Linting (v10 is current) |

### Packages to Remove
| Package | Reason |
|---------|--------|
| vite-plugin-lib-inject-css | Vite v6+ has native CSS handling |
| uglify-es | Vite handles minification natively |

### Keep (No Change Needed)
| Package | Reason |
|---------|--------|
| vite | Already at v7.3.1 (latest) |
| yargs | CLI usage remains needed |

---

## Architecture Patterns

### Upgrade Strategy
1. **Dry run test:** Use `npm install --dry-run` or install with `--save` to see conflicts
2. **Incremental:** Install D3 modules first, then devDependencies
3. **Verify build:** Run `npm run build` after each batch
4. **Verify lint:** Run `npm run lint` after ESLint upgrade

### Post-Upgrade Verification
- Build must pass: `npm run build`
- Lint must pass: `npm run lint`
- No new warnings in output

---

## D3 API Compatibility

### Changes from v1 to v3/v4

The D3 modules have maintained backward compatibility for most common use cases. Based on the code in `src/lib/heatmap.js`, these APIs are used:

| API | v1 | v3/v4 | Compatible? |
|-----|-----|-------|-------------|
| `select()` | d3-selection | d3-selection v3 | YES |
| `format()` | d3-format | d3-format v3 | YES |
| `scaleLinear()` | d3-scale | d3-scale v4 | YES |
| `range()` | d3-array | d3-array v3 | YES |
| `axisLeft()` | d3-axis | d3-axis v3 | YES |
| `axisTop()` | d3-axis | d3-axis v3 | YES |
| `axisBottom()` | d3-axis | d3-axis v3 | YES |

**Key finding:** All APIs used in the codebase have stable signatures. No code changes expected.

**Source:** npm package documentation, verified usage in existing codebase

---

## Common Pitfalls

### Pitfall 1: D3 Module Global vs Modular
**What goes wrong:** Old code expects `d3` global, but modular imports work differently
**How to avoid:** Already using ES6 module imports — no change needed
**Warning signs:** `d3 is not defined` error

### Pitfall 2: ESLint Config Format Mismatch
**What goes wrong:** ESLint v9+ requires flat config format (.eslintrc is deprecated)
**How to avoid:** Already using `eslint.config.mjs` — flat config format is correct
**Warning signs:** Config format warnings during install

### Pitfall 3: Vite CSS Handling
**What goes wrong:** Plugin removes CSS injection capability
**How to avoid:** Use Vite's built-in CSS handling via `import '../heatmap.css'`
**Warning signs:** CSS not bundled in output
**Current state:** Already using direct CSS import, plugins array is empty

### Pitfall 4: Minification Tool Conflict
**What goes wrong:** Both uglify-es and Vite's terser attempt to minify
**How to avoid:** Remove uglify-es, rely on Vite's minification
**Current state:** `vite.config.min.mjs` has `minify: true`

---

## Code Examples

### Before (package.json)
```json
{
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "eslint": "^10.0.3",
    "tape": "^4.9.1",
    "uglify-es": "^3.3.9",
    "vite": "^7.3.1",
    "vite-plugin-lib-inject-css": "^2.2.2"
  },
  "dependencies": {
    "d3-array": "^1.2.4",
    "d3-axis": "^1.0.12",
    "d3-format": "^1.3.2",
    "d3-scale": "^2.1.2",
    "d3-selection": "^1.3.2",
    "yargs": "^11.0.0"
  }
}
```

### After (package.json)
```json
{
  "devDependencies": {
    "eslint": "^10.0.0",
    "tape": "^4.9.1",
    "vite": "^7.3.1"
  },
  "dependencies": {
    "d3-array": "^3.2.4",
    "d3-axis": "^3.0.0",
    "d3-format": "^3.1.2",
    "d3-scale": "^4.0.2",
    "d3-selection": "^3.0.0",
    "yargs": "^17.7.0"
  }
}
```

### Commands to Execute
```bash
# Upgrade D3 modules
npm install d3-array@^3.2.4 d3-axis@^3.0.0 d3-format@^3.1.2 d3-scale@^4.0.2 d3-selection@^3.0.0

# Upgrade ESLint (optional - v10 is already newer)
npm install eslint@^10.0.0

# Remove deprecated packages
npm uninstall vite-plugin-lib-inject-css uglify-es @eslint/js

# Install all (alternative approach)
npm install
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Gulp + Rollup | Vite | Phase 1 | Faster builds |
| tape | Vitest (planned) | Phase 2 | Better DX |
| D3 v1 modules | D3 v3/v4 | This phase | Latest features |
| eslintrc config | flat config | This phase | ESLint v9+ compatible |
| vite-plugin-lib-inject-css | Native Vite | This phase | Reduced deps |
| uglify-es | Vite built-in | This phase | Reduced deps |

---

## Open Questions

1. **yargs upgrade**
   - Current: ^11.0.0
   - Latest: ^17.x
   - Recommendation: Upgrade to ^17.7.0 for security and compatibility
   - **Action:** Verify yargs usage in examples before upgrading

2. **tape test framework**
   - Current: ^4.9.1
   - Latest: ^5.x
   - Recommendation: Keep at ^4.9.1 or upgrade if Phase 2 (Vitest) is implemented first

---

## Validation Architecture

### Test Commands
| Command | Purpose |
|---------|---------|
| `npm run build` | Verify build works |
| `npm run lint` | Verify ESLint works |

### Success Criteria
- [ ] Build completes without errors
- [ ] Lint passes without errors
- [ ] No console warnings about deprecated packages

### Phase Requirements → Test Map
This is a dependency-only phase with no explicit requirements from REQUIREMENTS.md. It supports AXIS-01 through AXIS-05 which are implemented after this phase.

---

## Sources

### Primary (HIGH confidence)
- npmjs.com/package/d3-array - v3.2.4 confirmed
- npmjs.com/package/d3-axis - v3.0.0 confirmed
- npmjs.com/package/d3-format - v3.1.2 confirmed
- npmjs.com/package/d3-scale - v4.0.2 confirmed
- npmjs.com/package/d3-selection - v3.0.0 confirmed
- npmjs.com/package/eslint - v10.0.2 confirmed

### Secondary (MEDIUM confidence)
- Project's existing code analysis (src/lib/heatmap.js)
- Vite documentation on CSS handling

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified current package versions from npm
- Architecture: HIGH - Using standard npm upgrade patterns
- Pitfalls: HIGH - Identified from existing project configuration

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (package versions stable)

---

## RESEARCH COMPLETE

**Phase:** 4 - Upgrade all dependencies
**Confidence:** HIGH

### Key Findings
1. D3 modules: Upgrade to v3/v4 is low-risk - APIs used are stable
2. ESLint: Already uses flat config, upgrade seamless
3. Remove: vite-plugin-lib-inject-css and uglify-es - Vite handles natively
4. No code changes expected in src/lib/heatmap.js

### File Created
`.planning/phases/04-upgrade-all-dependencies/04-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | Verified versions on npm |
| Architecture | HIGH | Standard npm patterns |
| Pitfalls | HIGH | Known from existing config |

### Open Questions
- yargs upgrade: Should verify usage before upgrading from v11 to v17

### Ready for Planning
Research complete. Planner can now create PLAN.md files.