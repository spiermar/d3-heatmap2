import { describe, it, expect } from 'vitest'
import { scaleBand, scaleLinear } from 'd3-scale'

describe('scale', () => {
  it('band scale for x-axis - verify domain maps to range positions', () => {
    const xScale = scaleBand()
      .domain(['A', 'B', 'C', 'D'])
      .range([0, 400])

    // Each domain value should map to a position in the range
    expect(xScale('A')).toBeCloseTo(0, 1)
    expect(xScale('B')).toBeCloseTo(100, 1)
    expect(xScale('C')).toBeCloseTo(200, 1)
    expect(xScale('D')).toBeCloseTo(300, 1)
  })

  it('band scale bandwidth calculation - verify cell width', () => {
    const xScale = scaleBand()
      .domain(['A', 'B', 'C', 'D'])
      .range([0, 400])

    // Bandwidth should be range / domain length - padding
    const bandwidth = xScale.bandwidth()
    // With default padding of 0, bandwidth = 400/4 = 100
    expect(bandwidth).toBeCloseTo(100, 1)
  })

  it('band scale padding - verify gaps between cells', () => {
    const scaleNoPadding = scaleBand()
      .domain(['A', 'B', 'C'])
      .range([0, 300])
      .padding(0)

    const scaleWithPadding = scaleBand()
      .domain(['A', 'B', 'C'])
      .range([0, 300])
      .padding(0.2)

    // Without padding, bandwidth should be larger
    expect(scaleNoPadding.bandwidth()).toBeGreaterThan(scaleWithPadding.bandwidth())

    // With padding, positions should be adjusted
    expect(scaleWithPadding('A')).toBeGreaterThan(0)
    expect(scaleWithPadding('C')).toBeLessThan(300)
  })

  it('linear scale for continuous data - verify interpolation', () => {
    const linearScale = scaleLinear()
      .domain([0, 100])
      .range([0, 500])

    // Test interpolation
    expect(linearScale(0)).toBeCloseTo(0, 2)
    expect(linearScale(50)).toBeCloseTo(250, 2)
    expect(linearScale(100)).toBeCloseTo(500, 2)

    // Test fractional values
    expect(linearScale(25)).toBeCloseTo(125, 2)
  })

  it('band scale domain validation - verify categories correctly mapped', () => {
    const yScale = scaleBand()
      .domain(['row1', 'row2', 'row3'])
      .range([300, 0])

    // Band scale with inverted range - first domain maps to highest position
    expect(yScale('row1')).toBeCloseTo(200, 1)
    expect(yScale('row2')).toBeCloseTo(100, 1)
    expect(yScale('row3')).toBeCloseTo(0, 1)

    // Verify the scale with forward range
    const yScaleForward = scaleBand()
      .domain(['row1', 'row2', 'row3'])
      .range([0, 300])

    expect(yScaleForward('row1')).toBeCloseTo(0, 1)
    expect(yScaleForward('row2')).toBeCloseTo(100, 1)
    expect(yScaleForward('row3')).toBeCloseTo(200, 1)

    // Undefined domain should return undefined
    expect(yScale('nonexistent')).toBeUndefined()
  })

  it('linear scale with inverted range', () => {
    const invertedScale = scaleLinear()
      .domain([0, 100])
      .range([100, 0])

    // Higher domain values should map to lower range values
    expect(invertedScale(0)).toBeCloseTo(100, 2)
    expect(invertedScale(50)).toBeCloseTo(50, 2)
    expect(invertedScale(100)).toBeCloseTo(0, 2)
  })

  it('band scale with padding inner and outer', () => {
    const scale = scaleBand()
      .domain(['A', 'B'])
      .range([0, 200])
      .paddingInner(0.2)
      .paddingOuter(0.1)

    // Bandwidth should account for both paddings
    const bandwidth = scale.bandwidth()
    expect(bandwidth).toBeGreaterThan(0)
    expect(bandwidth).toBeLessThan(100)
  })
})