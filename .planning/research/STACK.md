# Technology Stack

**Project:** d3-heatmap2 (D3.js heatmap visualization library)
**Researched:** 2025-03-07
**Context:** Adding testing, accessibility, and additional axis types to existing library

---

## Recommended Stack

### Testing Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Vitest** | ^4.0.0 | Test runner | Modern standard (2025), 10-80x faster than Jest, native ESM, Vite-powered. API compatible with Jest (lessons from tape still apply). **HIGH confidence** |
| **jsdom** | ^25.0.0 | DOM simulation | Required for testing D3 DOM manipulations. Works with Vitest via `environment: 'jsdom'`. **HIGH confidence** |
| **vitest-axe** | latest | Accessibility matchers | Provides `toBeAccessible()` matcher for axe-core integration. **MEDIUM confidence** |
| **axe-core** | ^4.10.0 | Accessibility rules | Industry-standard accessibility engine. Integrates with vitest-axe. **HIGH confidence** |

### Accessibility Tools

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **axe-core** | ^4.10.0 | Automated a11y testing | Open-source, WCAG-compliant, integrates with test suite. **HIGH confidence** |
| **aria-label patterns** | — | Manual implementation | D3 accessibility requires manual ARIA attributes (aria-labelledby, role="img", title elements). No library needed — implementation pattern. **HIGH confidence** |

### Axis Types (D3 Native)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **d3-scale** (scaleBand) | ^2.1.2+ | Band scales | Already in dependencies, upgrade to support categorical X/Y axes |
| **d3-scale** (scaleTime) | ^2.1.2+ | Time scales | Already in dependencies, upgrade for temporal data |
| **d3-axis** | ^1.0.12+ | Axis generation | Already in dependencies, works with any D3 scale |

### Build Tools (Recommendation: Keep Current)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Rollup** | ^4.x | Bundling | Already in use. Consider upgrading from rollup-stream to native ES modules in future. |
| **Gulp** | ^4.x | Task runner | Legacy but functional. Skip rebuild unless issues arise. |

---

## Installation

```bash
# Testing
npm install -D vitest jsdom vitest-axe axe-core

# Keep existing dependencies
npm install d3-array@latest d3-axis@latest d3-format@latest d3-scale@latest d3-selection@latest
```

---

## Alternative Considerations

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Test runner | Vitest | Jest | Vitest is 2025 standard for Vite projects, faster, better ESM support |
| Test runner | Vitest | Tape (current) | Tape lacks fixtures, mocking, and async support needed for D3 tests |
| DOM environment | jsdom | Happy DOM | jsdom has broader D3 compatibility; Happy DOM faster but less complete |
| Build tool | Keep Gulp+Rollup | tsup/esbuild | Overkill for this library; current stack works fine |
| Accessibility | Manual ARIA | d3-a11y plugin | D3 now recommends manual ARIA; plugins may be unmaintained |

---

## D3 Module Compatibility Note

Current dependencies use **D3 v5 modules**. To use `scaleBand` and `scaleTime` effectively:

- **d3-scale** provides: `scaleLinear`, `scaleBand`, `scalePoint`, `scaleTime`, `scaleUtc`
- **d3-axis** works with any scale via `.scale(x)` method

The existing code already imports from these modules. No new dependencies required — just utilize existing API.

---

## Sources

- **Vitest**: Context7 / NPM (vitest 4.0.18, verified 2025-03)
- **jsdom**: Context7 (jsdom 25.x, verified 2025-03)
- **axe-core**: NPM / WebSearch (4.10.x, verified 2025-03)
- **D3 scales**: Context7 d3/d3 documentation (scaleBand, scaleTime)
- **Build tools**: WebSearch (State of JS 2025, tsup vs Rollup analysis)
- **Accessibility**: WebSearch (moldstud, a11ywithlindsey, WCAG 2.1 guidelines)