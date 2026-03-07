---
phase: 03
slug: project-restructure
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-07
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (Phase 2 sets up), currently tape |
| **Config file** | vitest.config.js (Phase 2 creates) |
| **Quick run command** | `npm test` (runs tape, then Vitest after Phase 2) |
| **Full suite command** | `npm test && npm run build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `ls src/lib/heatmap.js src/index.html src/examples/basic.js test/` to verify structure
- **After every plan wave:** Run `npm run build` to verify Vite configuration
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | REST-01 | verification | `ls src/lib/heatmap.js` | ✅ | ⬜ pending |
| 03-01-02 | 01 | 1 | REST-02 | verification | `ls test/ src/examples/basic.js` | ✅ / ✅ | ⬜ pending |
| 03-01-03 | 01 | 1 | REST-02 | verification | `ls src/index.html` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `test/` directory ready for Phase 2 Vitest setup
- [ ] Verify Vite build produces expected outputs

*If none: "Structure already in place from Phase 1. Phase 3 verifies correctness."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Verify build produces UMD + ESM | REST-01 | Requires build | Run `npm run build` and check dist/ for d3-heatmap2.umd.js and d3-heatmap2.es.js |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** {pending / approved YYYY-MM-DD}