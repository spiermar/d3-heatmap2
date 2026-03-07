# Testing Patterns

**Analysis Date:** 2026-03-07

## Test Framework

**Runner:**
- tape v4.9.1
- Config: No dedicated test config; uses CLI arguments
- Config file: Not present

**Assertion Library:**
- Built into tape (includes `tape.equal`, `tape.ok`, `tape.deepEqual`, etc.)

**Run Commands:**
```bash
npm test                    # Run all tests (builds first via pretest)
gulp build && tape 'test/**/*-test.js'  # Build then run tests
tape 'test/heatmap-test.js' # Run single test file
```

**Test Discovery:**
- Pattern: `test/**/*-test.js`
- Currently **no test files exist** (test directory contains only `.gitkeep`)

## Test File Organization

**Location:**
- `test/` directory at project root
- Co-located tests NOT used (tests in separate `test/` directory, not alongside source)

**Naming:**
- `*-test.js` pattern required

**Structure:**
```
test/
  .gitkeep
  heatmap-test.js      # (to be created)
```

## Test Structure

**Suite Organization:**
- tape uses `test(name, function(t))` format
- Plan assertions with `t.plan(n)` or end with `t.end()`

**Expected Pattern (based on tape documentation and project):**
```javascript
var test = require('tape')
var heatmap = require('./src/heatmap')

test('heatmap should create a heatmap', function (t) {
  t.plan(1)
  // Test setup
  var svg = d3.select('body').append('svg')
  var data = [[1, 2], [3, 4]]
  
  svg.datum(data)
    .call(heatmap())
  
  t.ok(svg.selectAll('rect').size() > 0, 'should render rects')
})
```

## Mocking

**Framework:** Not currently used (no tests exist)

**Patterns to Use:**
- Mock D3 selection using minimal shims
- Mock DOM with jsdom if testing in Node environment

**What to Mock:**
- External D3 modules if testing in Node (d3-selection, d3-scale, etc.)
- Browser APIs if running in Node

**What NOT to Mock:**
- Internal logic being tested
- The library's own functions

**Note:** This is a D3 visualization library that typically runs in a browser environment. Testing approaches:
1. Use jsdom for Node-based testing
2. Use browser automation (not currently configured)
3. Test pure logic functions in isolation

## Fixtures and Factories

**Test Data:**
- Not currently present
- Expected location: `test/fixtures/` or inline in test files

**Example test data structure (from code analysis of expected data format):**
```javascript
// 2D array format used by heatmap
var testData = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```

**Location:**
- Inline in test files or `test/fixtures/` directory

## Coverage

**Requirements:** None enforced

**View Coverage:**
- No coverage tool configured
- Could add `tap` or `nyc` for coverage reporting

## Test Types

**Unit Tests:**
- Focus: Individual getter/setter methods, pure functions like `cantorPair`
- Approach: Test returned values with various inputs

**Integration Tests:**
- Focus: Full heatmap rendering with D3
- Approach: Use jsdom or browser environment

**E2E Tests:**
- Not used / Not configured

## Common Patterns

**Async Testing:**
```javascript
test('async heatmap render', function (t) {
  t.plan(1)
  // Some async operation
  setTimeout(function () {
    t.ok(true, 'completed')
  }, 100)
})
```

**Error Testing:**
```javascript
test('should throw on invalid data', function (t) {
  t.plan(1)
  var svg = d3.select('body').append('svg')
  
  try {
    svg.datum(null).call(heatmap())
    t.fail('should have thrown')
  } catch (e) {
    t.pass('threw on null data')
  }
})
```

**Testing Getter/Setter Pattern:**
```javascript
test('width getter/setter', function (t) {
  t.plan(2)
  var h = heatmap()
  
  t.equal(h.width(), 960, 'default width is 960')
  t.equal(h.width(500).width(), 500, 'can set width')
})
```

## Build/Test Integration

**Pretest Hook:**
- `package.json` scripts: `"pretest": "gulp build"`
- Build runs lint, rollup, style, and uglify before tests

**CI Consideration:**
- Tests run on `npm test` which includes build
- Build failure will prevent tests from running

---

*Testing analysis: 2026-03-07*