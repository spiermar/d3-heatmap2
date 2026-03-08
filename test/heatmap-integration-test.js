import { describe, it, expect, beforeEach, vi } from "vitest"
import { select } from "d3-selection"
import heatmap from "../lib/heatmap.js"

describe("heatmap integration", () => {
  let container

  beforeEach(() => {
    container = select("body").append("div")
  })

  it("renders SVG with correct dimensions", () => {
    const data = [[1, 2, 3], [4, 5, 6]]
    const chart = heatmap().width(300)
    container.datum(data).call(chart)

    const svg = container.select("svg")
    expect(svg).to.exist
    expect(svg.attr("width")).toBe("309")
  })

  it("creates correct number of cell columns", () => {
    const data = [[1, 2], [3, 4], [5, 6]]
    const chart = heatmap().width(300)
    container.datum(data).call(chart)

    const svg = container.select("svg")
    const innerG = svg.select("g")
    const cells = innerG.selectAll("rect.bordered")
    expect(cells.size()).toBe(6)
  })

  it("creates correct number of cells per column", () => {
    const data = [[1, 2, 3], [4, 5, 6]]
    const chart = heatmap().width(300)
    container.datum(data).call(chart)

    const svg = container.select("svg")
    const innerG = svg.select("g")
    const firstColumnCells = innerG.selectAll("rect.bordered").nodes().slice(0, 3)
    expect(firstColumnCells.length).toBe(3)
  })

  it("renders title when provided", () => {
    const data = [[1, 2], [3, 4]]
    const chart = heatmap().title("Test Title").width(300)
    container.datum(data).call(chart)

    const title = container.select(".title")
    expect(title).to.exist
    expect(title.text()).toBe("Test Title")
  })

  it("renders subtitle when provided", () => {
    const data = [[1, 2], [3, 4]]
    const chart = heatmap().subtitle("Test Subtitle").width(300)
    container.datum(data).call(chart)

    const subtitle = container.select(".subtitle")
    expect(subtitle).to.exist
    expect(subtitle.text()).toBe("Test Subtitle")
  })

  it("applies custom width", () => {
    const data = [[1, 2], [3, 4]]
    const chart = heatmap().width(500)
    container.datum(data).call(chart)

    const svg = container.select("svg")
    expect(svg).to.exist
  })

  it("applies custom color scale", () => {
    const data = [[1, 2], [3, 4]]
    const chart = heatmap()
      .width(300)
      .colorScale(() => "red")
    container.datum(data).call(chart)

    const firstRect = container.select("rect.bordered")
    expect(firstRect.style("fill")).toBe("red")
  })

  it("handles null values with nullValueColor", () => {
    const data = [[1, null], [3, 4]]
    const chart = heatmap().width(300).nullValueColor("#CCCCCC")
    container.datum(data).call(chart)

    const rects = container.selectAll("rect.bordered")
    const nullRect = rects.filter(function () {
      return select(this).style("fill") === "rgb(204, 204, 204)"
    })
    expect(nullRect.size()).toBe(1)
  })

  describe("event handlers", () => {
    it("calls onClick handler when cell is clicked", () => {
      const data = [[1, 2], [3, 4]]
      const clickSpy = vi.fn()
      const chart = heatmap().width(300).onClick(clickSpy)
      container.datum(data).call(chart)

      const firstRect = container.select("rect.bordered")
      firstRect.dispatch("click")

      expect(clickSpy).toHaveBeenCalledTimes(1)
    })

    it("calls onMouseOver handler on mouseover", () => {
      const data = [[1, 2], [3, 4]]
      const mouseOverSpy = vi.fn()
      const chart = heatmap().width(300).onMouseOver(mouseOverSpy)
      container.datum(data).call(chart)

      const firstRect = container.select("rect.bordered")
      firstRect.dispatch("mouseover")

      expect(mouseOverSpy).toHaveBeenCalledTimes(1)
    })

    it("calls onMouseOut handler on mouseout", () => {
      const data = [[1, 2], [3, 4]]
      const mouseOutSpy = vi.fn()
      const chart = heatmap().width(300).onMouseOut(mouseOutSpy)
      container.datum(data).call(chart)

      const firstRect = container.select("rect.bordered")
      firstRect.dispatch("mouseout")

      expect(mouseOutSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe("method chaining", () => {
    it("returns heatmap function for chaining", () => {
      const chart = heatmap()
      expect(chart.width(300)).toBe(chart)
      expect(chart.height(300)).toBe(chart)
      expect(chart.title("Test")).toBe(chart)
      expect(chart.subtitle("Test")).toBe(chart)
      expect(chart.margin({})).toBe(chart)
      expect(chart.colorScale(null)).toBe(chart)
      expect(chart.onClick(null)).toBe(chart)
    })

    it("allows configuring multiple options in chain", () => {
      const data = [[1, 2], [3, 4]]
      const chart = heatmap()
        .width(400)
        .title("Chained Title")
        .subtitle("Chained Subtitle")
        .gridStrokeOpacity(0.3)
      container.datum(data).call(chart)

      expect(container.select(".title").text()).toBe("Chained Title")
      expect(container.select(".subtitle").text()).toBe("Chained Subtitle")
    })
  })

  describe("legend", () => {
    it("renders legend when legendElement is provided", () => {
      const data = [[1, 2], [3, 4]]
      const legendContainer = select("body").append("div").attr("id", "legend")
      const chart = heatmap()
        .width(300)
        .legendElement("#legend")
        .legendLabel("Count")
      container.datum(data).call(chart)

      const legendSvg = legendContainer.select("svg")
      expect(legendSvg).to.exist

      legendContainer.remove()
    })

    it("renders legend title", () => {
      const data = [[1, 2], [3, 4]]
      const legendContainer = select("body").append("div").attr("id", "legend2")
      const chart = heatmap()
        .width(300)
        .legendElement("#legend2")
        .legendLabel("Test Legend")
      container.datum(data).call(chart)

      const legendTitle = legendContainer.select(".legendTitle")
      expect(legendTitle.text()).toBe("Test Legend")

      legendContainer.remove()
    })
  })

  describe("highlight", () => {
    it("renders highlight overlay when highlight is set", () => {
      const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const chart = heatmap()
        .width(300)
        .setHighlight([{ start: [1, 0], end: [1, 2] }])
      container.datum(data).call(chart)

      const highlights = container.selectAll("g.highlight")
      expect(highlights.size()).toBeGreaterThan(0)
    })

    it("updates highlight dynamically via updateHighlight", () => {
      const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const chart = heatmap().width(300)
      container.datum(data).call(chart)

      chart.setHighlight([{ start: [0, 0], end: [0, 2] }])
      chart.updateHighlight()

      const highlights = container.selectAll("g.highlight")
      expect(highlights.size()).toBeGreaterThan(0)
    })

    it("removes highlight when empty array is set", () => {
      const data = [[1, 2, 3], [4, 5, 6]]
      const chart = heatmap()
        .width(300)
        .setHighlight([{ start: [0, 0], end: [0, 1] }])
      container.datum(data).call(chart)

      chart.setHighlight([])
      chart.updateHighlight()

      const highlights = container.selectAll("g.highlight")
      expect(highlights.size()).toBe(0)
    })
  })

  describe("yAxisScale", () => {
    it("renders y-axis when yAxisScale is provided", () => {
      const data = [[1, 2], [3, 4], [5, 6]]
      const chart = heatmap()
        .width(300)
        .yAxisScale([0, 100])
      container.datum(data).call(chart)

      const axis = container.select(".rowLabel.axis")
      expect(axis).to.exist
    })

    it("renders y-axis labels when yAxisLabels is provided", () => {
      const data = [[1, 2], [3, 4]]
      const chart = heatmap()
        .width(300)
        .yAxisLabels(["A", "B"])
      container.datum(data).call(chart)

      const labels = container.selectAll(".rowLabel")
      expect(labels.size()).toBe(2)
    })
  })

  describe("xAxisScale", () => {
    it("renders x-axis when xAxisScale is provided", () => {
      const data = [[1, 2, 3], [4, 5, 6]]
      const chart = heatmap()
        .width(300)
        .xAxisScale([0, 100])
      container.datum(data).call(chart)

      const axis = container.select(".columnLabel.axis")
      expect(axis).to.exist
    })

    it("renders x-axis labels when xAxisLabels is provided", () => {
      const data = [[1, 2], [3, 4]]
      const chart = heatmap()
        .width(300)
        .xAxisLabels(["X", "Y", "Z"])
      container.datum(data).call(chart)

      const labels = container.selectAll(".columnLabel")
      expect(labels.size()).toBe(3)
    })
  })

  describe("getter functions", () => {
    it("returns current value for width getter", () => {
      const chart = heatmap().width(500)
      expect(chart.width()).toBe(500)
    })

    it("returns current value for title getter", () => {
      const chart = heatmap().title("Test")
      expect(chart.title()).toBe("Test")
    })

    it("returns null when not set", () => {
      const chart = heatmap()
      expect(chart.title()).toBe("")
      expect(chart.colorScale()).toBe(null)
    })

    it("returns highlight array", () => {
      const chart = heatmap().setHighlight([{ start: [0, 0], end: [1, 1] }])
      expect(chart.setHighlight()).toEqual([{ start: [0, 0], end: [1, 1] }])
    })
  })
})