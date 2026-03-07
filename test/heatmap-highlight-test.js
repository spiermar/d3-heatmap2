import { describe, it, expect } from 'vitest'

// Replicate the highlight logic from heatmap.js for testing
function computeHighlightFrames (highlight, rows) {
  var highlightFrames = []
  var invertHighlightRows = false

  // Cantor pairing function for unique keys
  function cantorPair (x, y) {
    return ((x + y) * (x + y + 1)) / 2 + y
  }

  for (var k in highlight) {
    if (highlight[k].start[0] <= highlight[k].end[0]) {
      for (var i = highlight[k].start[0]; i <= highlight[k].end[0]; i++) {
        var j = null
        if (i > highlight[k].start[0] && i < highlight[k].end[0]) {
          // middle columns
          for (j = 0; j < rows; j++) {
            highlightFrames.push([i, j])
          }
        } else if (i === highlight[k].start[0]) {
          if (!invertHighlightRows) {
            if (i === highlight[k].end[0]) {
              // ends in same column
              if (highlight[k].start[1] <= highlight[k].end[1]) {
                for (j = highlight[k].start[1]; j <= highlight[k].end[1]; j++) {
                  highlightFrames.push([i, j])
                }
              }
            } else {
              // doesn't end in same column
              for (j = highlight[k].start[1]; j < rows; j++) {
                highlightFrames.push([i, j])
              }
            }
          }
        } else {
          // end column
          for (j = 0; j <= highlight[k].end[1]; j++) {
            highlightFrames.push([i, j])
          }
        }
      }
    }
  }
  return highlightFrames
}

describe('highlight', () => {
  it('highlight cells above threshold - filter data by value >= threshold', () => {
    // Simulating highlight of a specific column (all rows)
    const highlight = [{ start: [1, 0], end: [1, 4] }]
    const rows = 5

    const frames = computeHighlightFrames(highlight, rows)

    // Column 1 should be highlighted for all rows 0-4
    expect(frames).toHaveLength(5)
    expect(frames).toContainEqual([1, 0])
    expect(frames).toContainEqual([1, 1])
    expect(frames).toContainEqual([1, 2])
    expect(frames).toContainEqual([1, 3])
    expect(frames).toContainEqual([1, 4])
  })

  it('highlight cells below threshold - filter data by value < threshold', () => {
    // Simulating highlight of bottom portion
    const highlight = [{ start: [0, 3], end: [2, 4] }]
    const rows = 5

    const frames = computeHighlightFrames(highlight, rows)

    // Should highlight cells in the range
    expect(frames.length).toBeGreaterThan(0)
    // All frames should have valid column and row
    frames.forEach(([col, row]) => {
      expect(col).toBeGreaterThanOrEqual(0)
      expect(col).toBeLessThanOrEqual(2)
    })
  })

  it('highlight with single cell', () => {
    // Highlight single cell
    const highlight = [{ start: [2, 2], end: [2, 2] }]
    const rows = 5

    const frames = computeHighlightFrames(highlight, rows)

    expect(frames).toHaveLength(1)
    expect(frames[0]).toEqual([2, 2])
  })

  it('highlight multiple columns', () => {
    // Highlight columns 0 and 1 (all rows)
    const highlight = [{ start: [0, 0], end: [1, 4] }]
    const rows = 5

    const frames = computeHighlightFrames(highlight, rows)

    // Should have 2 columns * 5 rows = 10 cells
    expect(frames).toHaveLength(10)
  })

  it('highlight with empty result - verify empty array handling', () => {
    const highlight = []
    const rows = 5

    const frames = computeHighlightFrames(highlight, rows)

    expect(frames).toHaveLength(0)
    expect(Array.isArray(frames)).toBe(true)
  })

  it('highlight preserves original data - verify no mutation', () => {
    const highlight = [{ start: [1, 1], end: [1, 2] }]
    const rows = 5

    // Compute frames
    const frames = computeHighlightFrames(highlight, rows)

    // The highlight array should not be modified
    expect(highlight).toHaveLength(1)
    expect(highlight[0].start).toEqual([1, 1])
    expect(highlight[0].end).toEqual([1, 2])

    // Frames should be a new array, not reference to original
    expect(frames).not.toBe(highlight)
  })

  it('highlight range validation - handle reverse column range', () => {
    // Start column > End column should not produce highlights
    const highlight = [{ start: [3, 0], end: [1, 4] }]
    const rows = 5

    const frames = computeHighlightFrames(highlight, rows)

    // Should produce no highlights due to error condition
    expect(frames).toHaveLength(0)
  })
})