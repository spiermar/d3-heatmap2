import { describe, it, expect } from 'vitest'
import { scaleLinear, scaleSequential } from 'd3-scale'
import { interpolateReds, interpolateBlues } from 'd3-scale-chromatic'

describe('color scale', () => {
  it('linear color scale with 2-point domain/range - midpoints interpolate correctly', () => {
    const colorScale = scaleLinear()
      .domain([0, 100])
      .range(['#ffffff', '#ff0000'])

    // Test midpoint should be a blend of white and red
    const midpoint = colorScale(50)
    expect(midpoint).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)
    expect(midpoint).not.toBe('rgb(255, 255, 255)')
    expect(midpoint).not.toBe('rgb(255, 0, 0)')

    // Test boundary values
    expect(colorScale(0)).toBe('rgb(255, 255, 255)')
    expect(colorScale(100)).toBe('rgb(255, 0, 0)')
  })

  it('linear color scale with 3-point domain/range - verify multi-stop gradient', () => {
    const colorScale = scaleLinear()
      .domain([0, 50, 100])
      .range(['#FFFFDD', '#3E9583', '#1F2D86'])

    // Test first segment
    const lowValue = colorScale(0)
    expect(lowValue).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)

    // Test middle point
    const midValue = colorScale(50)
    expect(midValue).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)

    // Test high point
    const highValue = colorScale(100)
    expect(highValue).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)

    // Test interpolation between first and second
    const quarterValue = colorScale(25)
    expect(quarterValue).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)
  })

  it('sequential color scale using d3-scale-chromatic - verify valid RGB output', () => {
    // Create sequential scale using Reds interpolator
    const colorScale = scaleSequential(interpolateReds)
      .domain([0, 100])

    // Test minimum value
    const minColor = colorScale(0)
    expect(minColor).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)

    // Test maximum value
    const maxColor = colorScale(100)
    expect(maxColor).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)

    // Maximum should be darker/more red than minimum
    expect(maxColor).not.toBe(minColor)
  })

  it('sequential color scale with Blues interpolator', () => {
    const colorScale = scaleSequential(interpolateBlues)
      .domain([0, 100])

    const minColor = colorScale(0)
    const maxColor = colorScale(100)

    expect(minColor).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)
    expect(maxColor).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/)
    expect(maxColor).not.toBe(minColor)
  })

  it('color scale domain validation - verify domain affects output range', () => {
    const scaleA = scaleLinear()
      .domain([0, 100])
      .range(['white', 'red'])

    const scaleB = scaleLinear()
      .domain([0, 200])
      .range(['white', 'red'])

    // Same input (50) should produce different outputs due to different domains
    const outputA = scaleA(50)
    const outputB = scaleB(50)

    // Scale A at 50 should be more "red" than Scale B at 50
    // because 50/100 = 50% while 50/200 = 25%
    expect(outputA).not.toBe(outputB)
  })

  it('color scale handles values outside domain via clamping', () => {
    const colorScale = scaleLinear()
      .domain([0, 100])
      .range(['white', 'red'])

    // Values below domain minimum
    expect(colorScale(-50)).toBe('rgb(255, 255, 255)')

    // Values above domain maximum
    expect(colorScale(150)).toBe('rgb(255, 0, 0)')
  })
})