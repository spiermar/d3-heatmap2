import { describe, it, expect } from 'vitest'

describe('accessibility', () => {
  it('SVG with role="graphics-document" and aria-label - should have proper attributes', () => {
    document.body.innerHTML = `
      <svg role="graphics-document" aria-label="Heatmap visualization" data-testid="heatmap">
        <title>Sample Heatmap</title>
        <rect x="0" y="0" width="100" height="100" fill="blue"></rect>
      </svg>
    `

    const svg = document.querySelector('svg')
    expect(svg.getAttribute('role')).toBe('graphics-document')
    expect(svg.getAttribute('aria-label')).toBe('Heatmap visualization')
    expect(svg.querySelector('title')).not.toBeNull()
  })

  it('SVG with title element - should have accessible name', () => {
    document.body.innerHTML = `
      <svg>
        <title>Revenue Heatmap by Month and Region</title>
        <g class="cell">
          <rect x="0" y="0" width="50" height="50" fill="red"></rect>
        </g>
      </svg>
    `

    const svg = document.querySelector('svg')
    const title = svg.querySelector('title')
    expect(title).not.toBeNull()
    expect(title.textContent).toBe('Revenue Heatmap by Month and Region')
  })

  it('SVG with proper structure - should have accessible name via aria-labelledby', () => {
    document.body.innerHTML = `
      <svg role="img" aria-labelledby="heatmap-title heatmap-desc">
        <title id="heatmap-title">Sales Heatmap</title>
        <desc id="heatmap-desc">A heatmap showing sales data across regions and products</desc>
        <g class="legend">
          <rect x="0" y="0" width="200" height="20" fill="steelblue"></rect>
        </g>
      </svg>
    `

    const svg = document.querySelector('svg')
    expect(svg.getAttribute('aria-labelledby')).toBe('heatmap-title heatmap-desc')
    expect(svg.querySelector('title#heatmap-title')).not.toBeNull()
    expect(svg.querySelector('desc#heatmap-desc')).not.toBeNull()
  })

  it('SVG missing accessible name - should have no aria-label or title', () => {
    document.body.innerHTML = `
      <svg>
        <rect x="0" y="0" width="100" height="100" fill="blue"></rect>
      </svg>
    `

    const svg = document.querySelector('svg')
    // Should not have accessible name
    expect(svg.getAttribute('aria-label')).toBeNull()
    expect(svg.getAttribute('aria-labelledby')).toBeNull()
    expect(svg.querySelector('title')).toBeNull()
  })

  it('heatmap with descriptive aria-label - accessible structure', () => {
    document.body.innerHTML = `
      <div id="chart">
        <svg role="graphics-document" aria-label="Monthly temperature heatmap showing temperature variations across 12 months">
          <title>Temperature Heatmap</title>
          <g class="axis-y">
            <text>Jan</text>
            <text>Dec</text>
          </g>
          <g class="cells">
            <rect x="0" y="0" width="40" height="30" fill="blue"></rect>
            <rect x="40" y="0" width="40" height="30" fill="lightblue"></rect>
          </g>
        </svg>
      </div>
    `

    const svg = document.querySelector('#chart svg')
    expect(svg.getAttribute('role')).toBe('graphics-document')
    expect(svg.getAttribute('aria-label')).toContain('heatmap')
    expect(svg.querySelector('title')).not.toBeNull()
  })

  it('complex heatmap SVG structure - proper accessibility attributes', () => {
    document.body.innerHTML = `
      <div id="heatmap-container" role="img" aria-label="Product sales heatmap">
        <svg width="600" height="400" viewBox="0 0 600 400">
          <title>Product Sales Heatmap</title>
          <desc>Heatmap visualization of product sales across regions and quarters</desc>

          <g class="y-axis" aria-hidden="true">
            <text x="-10" y="20">Q1</text>
            <text x="-10" y="60">Q2</text>
          </g>

          <g class="cells">
            <rect class="cell" x="10" y="10" width="50" height="40" fill="#3182bd" tabindex="0" aria-label="Q1, Product A: $50,000"></rect>
            <rect class="cell" x="70" y="10" width="50" height="40" fill="#6baed6" tabindex="0" aria-label="Q1, Product B: $30,000"></rect>
          </g>

          <g class="legend" aria-label="Color legend">
            <rect x="450" y="10" width="100" height="15" fill="#ccc"></rect>
            <text x="450" y="40">$0</text>
            <text x="530" y="40">$100K</text>
          </g>
        </svg>
      </div>
    `

    const container = document.querySelector('#heatmap-container')
    expect(container.getAttribute('role')).toBe('img')
    expect(container.getAttribute('aria-label')).toBe('Product sales heatmap')

    const svg = document.querySelector('#heatmap-container svg')
    expect(svg.querySelector('title')).not.toBeNull()
    expect(svg.querySelector('desc')).not.toBeNull()

    // Check cells have aria-labels
    const cells = svg.querySelectorAll('rect.cell')
    expect(cells.length).toBe(2)
    cells.forEach(cell => {
      expect(cell.getAttribute('aria-label')).not.toBeNull()
    })
  })

  it('validate accessibility best practices for heatmap SVG', () => {
    document.body.innerHTML = `
      <svg role="graphics-document" aria-label="Sales data visualization" xmlns="http://www.w3.org/2000/svg">
        <title>Annual Sales Heatmap</title>
        <desc>Color-coded heatmap showing annual sales performance by quarter and region</desc>

        <defs>
          <linearGradient id="legend-gradient">
            <stop offset="0%" stop-color="#f7f7f7"/>
            <stop offset="100%" stop-color="#2166ac"/>
          </linearGradient>
        </defs>

        <!-- Axis with aria-hidden to prevent screen reader from reading axis ticks -->
        <g class="y-axis" aria-hidden="true">
          <line x1="40" y1="10" x2="40" y2="290" stroke="#000" stroke-width="1"/>
          <text x="35" y="20" text-anchor="end">North</text>
          <text x="35" y="160" text-anchor="end">South</text>
          <text x="35" y="290" text-anchor="end">West</text>
        </g>

        <g class="cells" role="graphics-document">
          <rect x="50" y="10" width="60" height="80" fill="#67a9cf" aria-label="Q1 North: $75,000 - High performance"/>
          <rect x="50" y="90" width="60" height="80" fill="#d1e5f0" aria-label="Q1 South: $45,000 - Average performance"/>
          <rect x="50" y="170" width="60" height="80" fill="#fddbc7" aria-label="Q1 West: $35,000 - Below target"/>
        </g>

        <!-- Legend with proper labeling -->
        <g class="legend" aria-label="Color scale legend">
          <text x="150" y="330">Low Sales</text>
          <rect x="200" y="320" width="150" height="15" fill="url(#legend-gradient)"/>
          <text x="350" y="335">High Sales</text>
        </g>
      </svg>
    `

    const svg = document.querySelector('svg')

    // Verify role and label
    expect(svg.getAttribute('role')).toBe('graphics-document')
    expect(svg.getAttribute('aria-label')).toBe('Sales data visualization')

    // Verify title and desc exist
    expect(svg.querySelector('title')).not.toBeNull()
    expect(svg.querySelector('desc')).not.toBeNull()

    // Verify axis groups are marked as aria-hidden
    const yAxis = svg.querySelector('.y-axis')
    expect(yAxis.getAttribute('aria-hidden')).toBe('true')

    // Verify cells have aria-labels
    const cells = svg.querySelectorAll('.cells rect')
    expect(cells.length).toBe(3)
    cells.forEach(cell => {
      const label = cell.getAttribute('aria-label')
      expect(label).not.toBeNull()
      expect(label.length).toBeGreaterThan(0)
    })

    // Verify legend has aria-label
    const legend = svg.querySelector('.legend')
    expect(legend.getAttribute('aria-label')).not.toBeNull()
  })
})