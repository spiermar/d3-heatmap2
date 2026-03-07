# External Integrations

**Analysis Date:** 2026-03-07

## APIs & External Services

**Visualization:**
- D3.js (via npm packages) - Core visualization library
  - Packages: `d3-selection`, `d3-scale`, `d3-axis`, `d3-format`, `d3-array`
  - Imported in `src/heatmap.js` as ES6 modules

**No external API integrations:**
- No REST APIs called
- No third-party services used
- No webhooks

## Data Storage

**File Storage:**
- Local filesystem only
- Data is loaded via D3's JSON loading in examples (`d3.json()`)
- Example data in `examples/data.json`

**Caching:**
- None

## Authentication & Identity

**Auth Provider:**
- None - This is a client-side visualization library with no authentication requirements

## Monitoring & Observability

**Error Tracking:**
- None - No error tracking service integration

**Logs:**
- Browser console (`console.log`, `console.info`, `console.warn`)
- Error handling uses `console.log("Error: ...")` pattern in `src/heatmap.js`

## CI/CD & Deployment

**Hosting:**
- GitHub (https://github.com/spiermar/d3-heatmap2)
- npm registry for package distribution

**CI Pipeline:**
- None detected - No CI configuration files (Travis CI, CircleCI, GitHub Actions, etc.)

## Environment Configuration

**Required env vars:**
- None - Library uses programmatic configuration via getter/setter pattern

**Secrets location:**
- None - No secrets required

## Webhooks & Callbacks

**Incoming:**
- None - Library is passive; receives data via D3 data binding

**Outgoing (Event Handlers):**
- The library exposes callback hooks for user interaction:
  - `onClick(d, i, j)` - Cell click handler in `src/heatmap.js`
  - `onMouseOver(d, i, j)` - Cell mouseover handler
  - `onMouseOut(d, i, j)` - Cell mouseout handler

## External CDN Dependencies (Examples Only)

The `examples/index.html` file loads these from CDNs:
- Bootstrap 3.3.7 (CSS): `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`
- D3 v4 (for running example): `https://d3js.org/d3.v4.min.js`

**Note:** These are only for the example/demo page, not required for the library itself.

## Bundle Output

The build produces a UMD bundle that:
- Includes D3 modules as dependencies (bundled)
- Can be used in browsers without a bundler
- Exposes the library as `d3.heatmap()` when loaded via script tag

---

*Integration audit: 2026-03-07*