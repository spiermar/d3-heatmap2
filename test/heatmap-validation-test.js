import { describe, it, expect, beforeEach, vi } from "vitest"
import { select } from "d3-selection"
import heatmap from "../lib/heatmap.js"

describe("heatmap input validation", () => {
  let container
  let consoleSpy

  beforeEach(() => {
    container = select("body").append("div")
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it("logs error when no data is provided", () => {
    const chart = heatmap().width(300)
    container.datum(null).call(chart)
    expect(console.log).toHaveBeenCalledWith(
      "Error: Invalid or empty data provided to heatmap"
    )
  })

  it("logs error when data is undefined", () => {
    const chart = heatmap().width(300)
    container.datum(undefined).call(chart)
    expect(console.log).toHaveBeenCalledWith(
      "Error: Invalid or empty data provided to heatmap"
    )
  })

  it("logs error when data is not an array", () => {
    const chart = heatmap().width(300)
    container.datum({ foo: "bar" }).call(chart)
    expect(console.log).toHaveBeenCalledWith(
      "Error: Invalid or empty data provided to heatmap"
    )
  })

  it("logs error when data is empty array", () => {
    const chart = heatmap().width(300)
    container.datum([]).call(chart)
    expect(console.log).toHaveBeenCalledWith(
      "Error: Invalid or empty data provided to heatmap"
    )
  })

  it("logs error when data[0] is undefined (jagged array)", () => {
    const chart = heatmap().width(300)
    container.datum([undefined, [1, 2]]).call(chart)
    expect(console.log).toHaveBeenCalledWith(
      "Error: Invalid or empty data provided to heatmap"
    )
  })

  it("logs error when data[0] is empty array", () => {
    const chart = heatmap().width(300)
    container.datum([[], [1, 2]]).call(chart)
    expect(console.log).toHaveBeenCalledWith(
      "Error: Invalid or empty data provided to heatmap"
    )
  })

  it("renders normally with valid data", () => {
    const data = [[1, 2], [3, 4]]
    const chart = heatmap().width(300)
    container.datum(data).call(chart)

    const svg = container.select("svg")
    expect(svg).to.exist
    expect(console.log).not.toHaveBeenCalled()
  })
})