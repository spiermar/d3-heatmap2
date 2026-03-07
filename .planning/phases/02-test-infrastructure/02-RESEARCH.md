# Phase 2: Test Infrastructure - Research

**Researched:** 2026-03-07
**Domain:** Test infrastructure, Vitest configuration, Accessibility testing
**Confidence:** HIGH

## Summary

Phase 2 involves setting up Vitest with jsdom environment to replace the current Tape-based test setup. The key decisions have been made: separate test files per function (color, scale, highlight), separate vitest.config.js, and using real D3 with jsdom for testing. This research confirms the implementation approach and provides specific configuration details.

**Primary recommendation:** Install vitest, jsdom, and vitest-axe dependencies, create vitest.config.js with jsdom environment, and create test files following the by-function organization pattern.

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Test Organization:** By function — separate test files per feature
  - Files: heatmap-color-test.js, heatmap-scale-test.js, heatmap-highlight-test.js
  - Maps directly to success criteria (color scale, x/y scale, highlight)
- **Test Execution Setup:** Separate vitest.config.js file
  - Consistent with existing pattern (vite.config.mjs already exists)
  - jsdom environment for DOM-based testing
- **D3 Mocking Strategy:** Real D3 with jsdom
  - Use actual D3 libraries, let jsdom handle DOM
  - D3 maintainers recommend this approach for browser-compatible testing

### Claude's Discretion
- Exact test file contents and assertions
- Specific D3 module imports
- Accessibility test implementation details (axe-core integration)
- Test coverage thresholds

### Deferred Ideas (OUT OF SCOPE)
- Accessibility testing approach — will be discussed in planning (axe-core integration)
- Coverage reporting — could add nyc later if needed

---

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TEST-01 | Test infrastructure uses Vitest with jsdom environment | Vitest supports jsdom via `environment: 'jsdom'` config option |
| TEST-02 | Unit tests exist for scale calculations (color scale, x/y scales) | Test file heatmap-scale-test.js will verify D3 scale computations |
| TEST-03 | Unit tests exist for highlight calculation logic | Test file heatmap-highlight-test.js will verify highlight logic |
| TEST-04 | Accessibility tests exist using axe-core/vitest-axe | vitest-axe package provides axe-core integration with matchers |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vitest | ^3.x | Test runner | Modern Vite-native test framework, drop-in replacement for Jest |
| jsdom | latest | Browser environment | Simulates DOM for SVG rendering tests |
| vitest-axe | ^0.1.0 | Accessibility matchers | Fork of jest-axe, provides `toHaveNoViolations()` matcher |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vitest/ui | latest | Visual test UI | For interactive test debugging |
| axe-core | latest | Core accessibility engine | Powers vitest-axe |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| vitest-axe | @axe-core/playwright | Playwright version runs in real browser, more accurate but slower |
| jsdom | happy-dom | Faster but has known bug with axe-core (Node.prototype.isConnected) |

**Installation:**
```bash
npm install --save-dev vitest jsdom vitest-axe axe-core
```

---

## Architecture Patterns

### Recommended Project Structure
```
test/
├── heatmap-color-test.js      # Color scale tests
├── heatmap-scale-test.js      # X/Y scale tests
├── heatmap-highlight-test.js  # Highlight logic tests
└── vitest-setup.js            # Test setup (if needed)
```

### Pattern 1: Vitest Configuration (vitest.config.js)
**What:** Separate config file for Vitest using defineConfig from vitest/config

**When to use:** All test configurations

**Example:**
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['test/**/*-test.js'],
    globals: true,
    setupFiles: [],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Source:** [Vitest Environment Config](https://vitest.dev/config/environment.html)

### Pattern 2: D3 Testing with jsdom
**What:** Import real D3 modules and test computations without browser

**When to use:** Testing scale calculations, color mapping logic

**Example:**
```javascript
// test/heatmap-scale-test.js
import { describe, it, expect } from 'vitest'
import { scaleLinear, scaleBand } from 'd3-scale'

describe('Heatmap Scale Calculations', () => {
  it('creates linear color scale with domain and range', () => {
    const colorScale = scaleLinear()
      .domain([0, 100])
      .range(['white', 'red'])
    
    expect(colorScale(0)).toBe('rgb(255, 255, 255)')
    expect(colorScale(50)).toBe('rgb(255, 127, 127)')
    expect(colorScale(100)).toBe('rgb(255, 0, 0)')
  })

  it('creates band scale for x-axis', () => {
    const xScale = scaleBand()
      .domain(['A', 'B', 'C'])
      .range([0, 300])
      .padding(0.1)
    
    expect(xScale('A')).toBeCloseTo(0)
    expect(xScale('B')).toBeCloseTo(100)
    expect(xScale('C')).toBeCloseTo(200)
    expect(xScale.bandwidth()).toBeCloseTo(85.45, 1)
  })
})
```

**Source:** [D3 Testing Patterns](https://glebbahmutov.com/blog/unit-testing-d3-code-without-browser/)

### Pattern 3: Accessibility Testing with vitest-axe
**What:** Use axe-core to validate accessibility in tests

**When to use:** After rendering SVG in tests

**Example:**
```javascript
// vitest-setup.js (setup file)
import 'vitest-axe/extend-expect'

// test/accessibility-test.js
import { describe, it, expect } from 'vitest'
import { axe, toHaveNoViolations } from 'vitest-axe'
import { JSDOM } from 'jsdom'

expect.extend(toHaveNoViolations)

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const dom = new JSDOM('<svg role="graphics-document" aria-label="Heatmap"><rect/></svg>')
    const html = dom.window.document.documentElement.outerHTML
    
    const results = await axe(html)
    expect(results).toHaveNoViolations()
  })
})
```

**Important:** vitest-axe does NOT work with happy-dom due to [known bug in Happy DOM](https://github.com/capricorn86/happy-dom/issues/978) with `Node.prototype.isConnected`. Must use jsdom.

**Source:** [vitest-axe GitHub](https://github.com/chaance/vitest-axe)

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Test runner | Custom Tape setup | Vitest | Built-in watch mode, better error reporting, Vite integration |
| Accessibility testing | Manual ARIA validation | vitest-axe | Industry-standardaxe-core with convenient matchers |
| Browser environment | Custom DOM simulation | jsdom | Official Vitest support, compatible with D3 |

**Key insight:** D3 testing with jsdom is the recommended approach per D3 maintainers — it allows testing actual scale computations without mocking while providing DOM for SVG rendering.

---

## Common Pitfalls

### Pitfall 1: Using happy-dom with vitest-axe
**What goes wrong:** Accessibility tests fail with cryptic errors about isConnected
**Why it happens:** Happy DOM has a known bug with Node.prototype.isConnected thataxe-core relies on
**How to avoid:** Use jsdom environment, not happy-dom
**Warning signs:** "Cannot read property isConnected of undefined" errors

### Pitfall 2: Missing test environment declaration
**What goes wrong:** `document` is undefined in tests
**Why it happens:** Default Vitest environment is 'node', not 'jsdom'
**How to avoid:** Set `environment: 'jsdom'` in vitest.config.js or add `/** @vitest-environment jsdom */` comment

### Pitfall 3: Testing DOM rendering without setup
**What goes wrong:** SVG elements don't appear in tests
**Why it happens:** Not importing the heatmap module correctly or not setting up DOM container
**How to avoid:** Create a DOM container with document.createElement('div') and use d3.select() on it

---

## Code Examples

### Complete vitest.config.js
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['test/**/*-test.js'],
    globals: true,
    testTimeout: 5000,
    hookTimeout: 5000,
  },
  resolve: {
    alias: {
      'd3-selection': path.resolve(__dirname, 'node_modules/d3-selection'),
      'd3-scale': path.resolve(__dirname, 'node_modules/d3-scale'),
      'd3-array': path.resolve(__dirname, 'node_modules/d3-array'),
      'd3-format': path.resolve(__dirname, 'node_modules/d3-format'),
      'd3-axis': path.resolve(__dirname, 'node_modules/d3-axis'),
    },
  },
})
```

### Sample color scale test
```javascript
// test/heatmap-color-test.js
import { describe, it, expect } from 'vitest'
import { scaleLinear, scaleSequential } from 'd3-scale'
import { interpolateReds } from 'd3-scale-chromatic'

describe('Color Scale Tests', () => {
  it('creates linear color scale', () => {
    const colorScale = scaleLinear()
      .domain([0, 50, 100])
      .range(['#fff', '#ffeda0', '#f03b20'])
    
    expect(colorScale(0)).toBe('#fff')
    expect(colorScale(50)).toBe('#ffeda0')
    expect(colorScale(100)).toBe('#f03b20')
  })

  it('creates sequential color scale', () => {
    const colorScale = scaleSequential(interpolateReds)
      .domain([0, 100])
    
    // Should return valid color strings
    expect(colorScale(0)).toMatch(/^rgb/)
    expect(colorScale(100)).toMatch(/^rgb/)
  })
})
```

### Sample highlight test
```javascript
// test/heatmap-highlight-test.js
import { describe, it, expect } from 'vitest'

describe('Highlight Calculation Tests', () => {
  const mockData = [
    { x: 'A', y: '1', value: 10 },
    { x: 'A', y: '2', value: 20 },
    { x: 'B', y: '1', value: 30 },
  ]

  it('calculates highlight for matching cells', () => {
    const highlightValue = 20
    const isHighlighted = (d) => d.value >= highlightValue
    
    const highlighted = mockData.filter(isHighlighted)
    
    expect(highlighted).toHaveLength(2)
    expect(highlighted.map(d => d.value)).toContain(20)
    expect(highlighted.map(d => d.value)).toContain(30)
  })

  it('calculates highlight with custom predicate', () => {
    const isHighlighted = (d) => d.x === 'A' && d.value > 15
    
    const highlighted = mockData.filter(isHighlighted)
    
    expect(highlighted).toHaveLength(1)
    expect(highlighted[0].x).toBe('A')
    expect(highlighted[0].value).toBe(20)
  })
})
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tape test runner | Vitest | 2024+ | Better DX with watch mode, better error messages |
| Jest configuration | Vitest native | 2024+ | Single config format (Vite-based), faster |
| Manual a11y checks | vitest-axe | 2022+ | Automated axe-core integration |
| PhantomJS browser | jsdom | Pre-2020 | No external browser needed for DOM tests |

**Deprecated/outdated:**
- **Tape:** No longer recommended — Vitest provides better experience
- **Jest:** Still works but Vitest is preferred for Vite projects
- **happy-dom for a11y:** Has known incompatibility with axe-core

---

## Open Questions

1. **How to test actual SVG rendering?**
   - What we know: Can use jsdom to render SVG elements and query them
   - What's unclear: Whether to test full DOM rendering or just scale calculations
   - Recommendation: Start with unit tests for scale/highlight calculations, add integration tests later if needed

2. **Coverage thresholds?**
   - What we know: Not specified in requirements
   - What's unclear: What coverage percentage is acceptable
   - Recommendation: Set initial threshold at 70%, adjust based on project needs

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x |
| Config file | vitest.config.js |
| Quick run command | `vitest run` |
| Full suite command | `vitest run --coverage` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TEST-01 | Test infrastructure uses Vitest with jsdom | setup | `vitest --version` | ❌ Wave 0 |
| TEST-02 | Unit tests for color scale | unit | `vitest run test/heatmap-color-test.js` | ❌ Wave 0 |
| TEST-02 | Unit tests for x/y scales | unit | `vitest run test/heatmap-scale-test.js` | ❌ Wave 0 |
| TEST-03 | Unit tests for highlight calculation | unit | `vitest run test/heatmap-highlight-test.js` | ❌ Wave 0 |
| TEST-04 | Accessibility tests with axe-core | integration | `vitest run test/heatmap-accessibility-test.js` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `vitest run`
- **Per wave merge:** `vitest run`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `vitest.config.js` — Vitest configuration with jsdom environment
- [ ] `test/heatmap-color-test.js` — covers TEST-02 (color scale)
- [ ] `test/heatmap-scale-test.js` — covers TEST-02 (x/y scales)
- [ ] `test/heatmap-highlight-test.js` — covers TEST-03
- [ ] `test/heatmap-accessibility-test.js` — covers TEST-04
- [ ] Package update: Change `"test": "tape 'test/**/*-test.js'"` to `"test": "vitest run"`

---

## Sources

### Primary (HIGH confidence)
- [Vitest Environment Configuration](https://vitest.dev/config/environment.html) - Official docs for jsdom setup
- [vitest-axe GitHub](https://github.com/chaance/vitest-axe) - Accessibility testing integration
- [Vitest Configuration](https://vitest.dev/config/) - Main config reference

### Secondary (MEDIUM confidence)
- [D3 Unit Testing without Browser](https://glebbahmutov.com/blog/unit-testing-d3-code-without-browser/) - D3 testing patterns
- [Stack Overflow: D3 Testing](https://stackoverflow.com/questions/55104250/d3js-in-a-react-component-unit-testing-using-jest-enzyme) - Common D3 testing issues

### Tertiary (LOW confidence)
- [D3-flame-graph patterns](https://github.com/spiermar/d3-flame-graph) - Reference project patterns (mentioned in context)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified with official Vitest docs and vitest-axe GitHub
- Architecture: HIGH - Vitest config pattern is standard, jsdom is recommended for D3
- Pitfalls: HIGH - Known happy-dom bug is documented in vitest-axe readme

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (30 days - stable domain)