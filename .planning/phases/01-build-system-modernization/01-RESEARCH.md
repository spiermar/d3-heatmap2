# Phase 1: Build System Modernization - Research

**Researched:** 2026-03-07
**Domain:** Build tooling migration (Gulp/Rollup → Vite)
**Confidence:** HIGH

## Summary

Migrating from Gulp + Rollup to Vite for modern, fast builds. This phase establishes the new build pipeline matching d3-flame-graph structure. Key changes: Vite library mode with dual output (UMD + ESM), D3 as external dependencies, CSS injection via plugin, and ESLint flat config.

**Primary recommendation:** Use Vite's built-in library mode with `build.lib` configuration, two separate configs for production (non-minified) and minified builds, matching d3-flame-graph's file structure exactly.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Formats**: Both UMD and ESM (not just one)
- **Filenames**: Full names (d3-heatmap2.umd.js, d3-heatmap2.es.js)
- **Minification**: Handled via separate Vite config (matches d3-flame-graph pattern)
- **CSS Handling**: Injected via vite-plugin-lib-inject-css, filename: d3-heatmap2.css
- **D3 Externals**: Individual modules (d3-array, d3-scale, d3-selection, etc.) - NOT single `d3` global
- **Dev Server**: Port 3000, no auto-open
- **Linting**: ESLint flat config (eslint.config.js)

### Claude's Discretion
None — all decisions are locked

### Deferred Ideas (OUT OF SCOPE)
None

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BUILD-01 | Project uses Vite for builds (replaces Gulp + Rollup) | Vite library mode configuration documented below |
| BUILD-02 | Vite produces UMD and ESM builds with proper D3 externals | Dual format output with external D3 modules |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vite | ^7.x | Build tool with library mode | Official Vite library build, replaces Gulp+Rollup |
| vite-plugin-lib-inject-css | ^2.x | CSS injection into JS bundles | Required per CONTEXT decisions |

### Dependencies to Remove (Gulp/Rollup stack)
| Library | Replacement |
|---------|-------------|
| gulp | Vite (built-in serve, watch) |
| rollup-stream | Vite (library mode) |
| vinyl-source-stream | Not needed |
| gulp-uglify-es | Vite minify option |
| gulp-rename | Vite fileName function |
| gulp-eslint | ESLint directly (flat config) |
| rollup-plugin-node-resolve | Vite handles this |
| rollup-plugin-commonjs | Vite handles this |
| browser-sync | Vite dev server |

### New Dev Dependencies Needed
| Library | Purpose |
|---------|---------|
| eslint | Linting (flat config) |
| @eslint/js | ESLint recommended rules |

### D3 Dependencies (already in package.json - remain as dependencies, NOT bundled)
- d3-array
- d3-axis
- d3-format
- d3-scale
- d3-selection

**Installation:**
```bash
npm install vite vite-plugin-lib-inject-css eslint @eslint/js --save-dev
# Remove old build dependencies
npm uninstall gulp rollup-stream vinyl-source-stream gulp-uglify-es gulp-rename gulp-eslint rollup-plugin-node-resolve rollup-plugin-commonjs browser-sync del
```

---

## Architecture Patterns

### Recommended Project Structure
```
d3-heatmap2/
├── src/
│   ├── lib/
│   │   └── heatmap.js      # Source (moved from src/heatmap.js)
│   ├── heatmap.css         # Styles (will be processed by Vite)
│   ├── index.html          # Dev server entry
│   └── examples/           # Example files
├── dist/                   # Build output (generated)
├── public/                 # Static assets (if needed)
├── index.js                # Package entry (re-exports from src/lib)
├── package.json            # Updated with Vite config
├── vite.config.mjs         # Main build config (non-minified)
├── vite.config.min.mjs     # Minified build config
└── eslint.config.mjs       # ESLint flat config
```

### Pattern 1: Vite Library Build Configuration

**What:** Configure Vite for library mode with dual format output

**When to use:** Building a JavaScript library that works both as ESM (bundlers) and UMD (script tags)

**Example:**
```javascript
// vite.config.mjs - Non-minified build
import { defineConfig } from "vite"
import { resolve } from "path"
import path from "path"
import { fileURLToPath } from "url"
import { libInjectCss } from "vite-plugin-lib-inject-css"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "lib/heatmap.js"),
      name: "heatmap",
      formats: ["umd", "es"],
      fileName: (format) => `d3-heatmap2.${format}.js`,
    },
    rollupOptions: {
      external: [
        "d3-array",
        "d3-axis",
        "d3-format",
        "d3-scale",
        "d3-selection",
      ],
      output: {
        format: "umd",
        exports: "named",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "d3-heatmap2.css"
          }
          return assetInfo.name
        },
        // Individual module globals (not single d3 global)
        globals: {
          "d3-array": "d3",
          "d3-axis": "d3",
          "d3-format": "d3",
          "d3-scale": "d3",
          "d3-selection": "d3",
        },
      },
    },
    minify: false,
  },
  plugins: [libInjectCss()],
  server: {
    port: 3000,
    open: false,
  },
})
```

**Source:** Adapted from d3-flame-graph (https://github.com/spiermar/d3-flame-graph)

### Pattern 2: Minified Build Config

**What:** Separate config for minified production builds

**When to use:** When you need both minified and non-minified versions

**Example:**
```javascript
// vite.config.min.mjs - Minified build
// Same as above with these changes:
{
  // ... same config ...
  minify: true,  // Enable minification
  build: {
    // ... same ...
    emptyOutDir: false,  // Don't clear, add to existing
    lib: {
      // ... same ...
      fileName: (format) => `d3-heatmap2.${format}.min.js`,
    },
  },
}
```

### Pattern 3: ESLint Flat Config

**What:** Modern ESLint configuration without .eslintrc

**When to use:** New JavaScript projects requiring linting

**Example:**
```javascript
// eslint.config.mjs
import js from "@eslint/js"

export default [
  js.configs.recommended,
  {
    ignores: ["dist/"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
]
```

**Source:** d3-flame-graph eslint.config.mjs

### Pattern 4: Package.json Updates

**What:** Update package.json for new build outputs

**When to use:** After migrating to Vite library builds

**Example:**
```json
{
  "name": "d3-heatmap2",
  "main": "./dist/d3-heatmap2.umd.js",
  "module": "./dist/d3-heatmap2.es.js",
  "exports": {
    ".": {
      "import": "./dist/d3-heatmap2.es.js",
      "require": "./dist/d3-heatmap2.umd.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "vite build --config vite.config.mjs && vite build --config vite.config.min.mjs",
    "dev": "vite",
    "lint": "eslint src lib test",
    "test": "vitest run"
  }
}
```

### Anti-Patterns to Avoid

- **Don't use `root: "."`**: For library builds, using `root: "src"` (matching d3-flame-graph) keeps the dev environment simple and separate from build output
- **Don't skip `cssCodeSplit: true`**: Required for CSS injection to work properly with vite-plugin-lib-inject-css
- **Don't use old ESLint config format**: CONTEXT specifies flat config (eslint.config.js)

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Build pipeline | Custom Gulp tasks with Rollup | Vite library mode | Vite handles everything, faster builds |
| Development server | BrowserSync | Vite built-in server | Integrated, faster HMR |
| CSS bundling | Manual copy via Gulp | vite-plugin-lib-inject-css | Automatic injection into JS bundles |
| Minification | Separate uglify step | Vite's built-in minify | Faster, uses esbuild/terser |

---

## Common Pitfalls

### Pitfall 1: Wrong fileName format function
**What goes wrong:** Output files named incorrectly (e.g., `heatmap.es.js` instead of `d3-heatmap2.es.js`)
**Why it happens:** Using `fileName: 'd3-heatmap2'` instead of `fileName: (format) => d3-heatmap2.${format}.js`
**How to avoid:** Use the function form to dynamically include format
**Warning signs:** Check dist/ output filenames match CONTEXT requirements

### Pitfall 2: CSS not injected
**What goes wrong:** CSS file empty or not included in bundle
**Why it happens:** Missing `libInjectCss()` plugin or `cssCodeSplit: true`
**How to avoid:** Include both the plugin and the CSS code split option
**Warning signs:** No CSS content in generated files

### Pitfall 3: D3 bundled instead of external
**What goes wrong:** D3 code included in output bundle
**Why it happens:** Missing or incorrect `external` array in rollupOptions
**How to avoid:** List all D3 modules in externals
**Warning signs:** Large bundle size, D3 source in output

### Pitfall 4: Dev server won't start
**What goes wrong:** Cannot run `npm run dev`
**Why it happens:** Missing index.html in src/ or wrong root configuration
**How to avoid:** Create src/index.html for dev server entry
**Warning signs:** "No entry point" errors

---

## Code Examples

### Basic src/index.html for dev server
```html
<!DOCTYPE html>
<html>
<head>
  <title>d3-heatmap2</title>
  <link rel="stylesheet" href="./heatmap.css">
</head>
<body>
  <div id="chart"></div>
  <script type="module" src="./examples/basic.js"></script>
</body>
</html>
```

### Build script execution
```bash
# Run both non-minified and minified builds
npm run build
# Output:
# dist/d3-heatmap2.umd.js
# dist/d3-heatmap2.es.js  
# dist/d3-heatmap2.umd.min.js
# dist/d3-heatmap2.es.min.js
# dist/d3-heatmap2.css
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Gulp + Rollup | Vite library mode | 2026-03-07 | Faster builds, simpler config |
| gulp-uglify-es | Vite minify option | 2026-03-07 | Built-in minification |
| CommonJS UMD | ESM + UMD dual output | 2026-03-07 | Modern bundlers get tree-shaking |
| .eslintrc.json | ESLint flat config | 2026-03-07 | Modern ESLint format |

**Deprecated/outdated:**
- Gulp workflow: Replaced entirely by Vite
- Rollup standalone: Handled by Vite internally
- BrowserSync: Replaced by Vite dev server

---

## Open Questions

1. **D3 global naming strategy**
   - What we know: CONTEXT says "individual modules, not single d3 global"
   - What's unclear: Whether users will load individual d3 modules globally or a bundled d3
   - Recommendation: Use individual module globals for maximum compatibility, but this may change based on user feedback

2. **Source file location**
   - What we know: Current code in `src/heatmap.js`, should move to `src/lib/heatmap.js`
   - What's unclear: Whether any imports need updating when moving
   - Recommendation: Move file, update index.js re-export path

---

## Validation Architecture

> Skip this section entirely if workflow.nyquist_validation is explicitly set to false in .planning/config.json. If the key is absent, treat as enabled.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Not applicable for this phase |
| Config file | N/A - Phase 1 is build system only |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| BUILD-01 | Vite used for builds | Manual verification | `ls vite.config.*` | ✅ Config files |
| BUILD-02 | UMD + ESM outputs | Manual verification | `ls dist/d3-heatmap2.*.js` | After build |

### Sampling Rate
- **Per task commit:** N/A - build system only
- **Per wave merge:** N/A
- **Phase gate:** Verify `npm run build` succeeds and produces expected files

### Wave 0 Gaps
- None — this is the first phase establishing build infrastructure

---

## Sources

### Primary (HIGH confidence)
- d3-flame-graph reference implementation - https://github.com/spiermar/d3-flame-graph
- Vite library mode docs - https://vite.dev/guide/build.html#library-mode
- vite-plugin-lib-inject-css npm - https://www.npmjs.com/package/vite-plugin-lib-inject-css
- Context7 Vite documentation - /vitejs/vite

### Secondary (MEDIUM confidence)
- Vite build configuration options - https://vite.dev/config/build-options

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - d3-flame-graph reference confirms exact pattern
- Architecture: HIGH - Vite library mode well-documented
- Pitfalls: MEDIUM - Based on common Vite library build issues

**Research date:** 2026-03-07
**Valid until:** 90 days (Vite library mode is stable)