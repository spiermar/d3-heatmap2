/* global d3 */

export default function () {
  var title = ''
  var subtitle = ''
  var legendLabel = ''
  var width = 960
  var margin = {
    top: 20,
    right: 0,
    bottom: 50,
    left: 50
  }
  var colorScale = null

  function heatmap (selection) {
    var datum = selection.datum()

    var rows = datum.rows
    var columns = datum.columns
    var values = datum.values

    if (title) {
      margin.top = margin.top + 50
    }

    if (subtitle) {
      margin.top = margin.top + 20
    }

    var gridSize = Math.floor(width / columns.length)
    var height = gridSize * (rows.length + 2)

    var max = 0
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        if (values[i][j] > max) { max = values[i][j] }
      }
    }

    if (!colorScale) {
      colorScale = d3.scaleLinear()
        .domain([0, max / 2, max])
        .range(['#FFFFDD', '#3E9583', '#1F2D86'])
        // .interpolate(d3.interpolateHcl);
    }

    var svg = selection
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // svg.selectAll('.rowLabel')
    //   .data(rows.reverse())
    //   .enter().append('text')
    //   .text(function (d) { return d })
    //   .attr('x', 0)
    //   .attr('y', function (d, i) { return i * gridSize })
    //   .style('text-anchor', 'end')
    //   .attr('transform', 'translate(-6,' + gridSize / 1.5 + ')')
    //   .attr('class', 'rowLabel mono axis')

    // svg.selectAll('.columnLabel')
    //   .data(columns)
    //   .enter().append('text')
    //   .text(function (d) { return d })
    //   .attr('x', function (d, i) { return i * gridSize })
    //   .attr('y', 0)
    //   .style('text-anchor', 'middle')
    //   .attr('transform', 'translate(' + gridSize / 2 + ', -6)')
    //   .attr('class', 'columnLabel mono axis')

    var y = d3.scaleLinear()
      .domain([106, 1999])
      .range([height, 0])

    var x = d3.scaleLinear()
      .domain([0, 122])
      .range([0, width - margin.left - margin.right - 40])

    svg.append('g')
      .attr('transform', 'translate(0,-12)')
      .attr('class', 'rowLabel axis')
      .call(d3.axisLeft(y)
        .ticks(20, 's'))

    svg.append('g')
      .attr('transform', 'translate(5,0)')
      .attr('class', 'columnLabel axis')
      .call(d3.axisTop(x)
        .ticks(20, 's'))

    svg.selectAll('.column')
      .data(values)
      .enter().append('g')
      .each(function (d, i) { // function (d, i, j) might replace .each.
        d3.select(this).selectAll('rect')
          .data(d.reverse())
          .enter().append('rect')
          .attr('x', function (d) { return i * gridSize }) // column
          .attr('y', function (d, j) { return j * gridSize }) // row
          .attr('class', 'bordered')
          .attr('width', gridSize)
          .attr('height', gridSize)
          .style('stroke', 'white')
          .style('stroke-opacity', 0.6)
          .style('fill', function (d) { return colorScale(d) })
      })

    // Append title to the top
    if (title) {
      svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2)
        .attr('y', -50)
        .style('text-anchor', 'middle')
        .text(title)
    }

    if (subtitle) {
      svg.append('text')
        .attr('class', 'subtitle')
        .attr('x', width / 2)
        .attr('y', -30)
        .style('text-anchor', 'middle')
        .text(subtitle)
    }

    // Extra scale since the color scale is interpolated
    var countScale = d3.scaleLinear()
      .domain([0, max])
      .range([0, width])

    // Calculate the variables for the temp gradient
    var numStops = 10
    var countRange = countScale.domain()
    var countPoint = []

    countRange[2] = countRange[1] - countRange[0]
    for (var i = 0; i < numStops; i++) {
      countPoint.push(i * countRange[2] / (numStops - 1) + countRange[0])
    }// for i

    // Create the gradient
    svg.append('defs')
      .append('linearGradient')
      .attr('id', 'legend-traffic')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '0%')
      .selectAll('stop')
      .data(d3.range(numStops))
      .enter().append('stop')
      .attr('offset', function (d, i) {
        return countScale(countPoint[i]) / width
      })
      .attr('stop-color', function (d, i) {
        return colorScale(countPoint[i])
      })

    var legendWidth = Math.min(width * 0.8, 400)
    // Color Legend container
    var legendsvg = svg.append('g')
      .attr('class', 'legendWrapper')
      .attr('transform', 'translate(' + (width / 2) + ',' + (gridSize * rows.length + 40) + ')')

    // Draw the Rectangle
    legendsvg.append('rect')
      .attr('class', 'legendRect')
      .attr('x', -legendWidth / 2)
      .attr('y', 0)
      // .attr("rx", hexRadius*1.25/2)
      .attr('width', legendWidth)
      .attr('height', 10)
      .style('fill', 'url(#legend-traffic)')

    // Append title
    legendsvg.append('text')
      .attr('class', 'legendTitle')
      .attr('x', 0)
      .attr('y', -10)
      .style('text-anchor', 'middle')
      .text(legendLabel)

    // Set scale for x-axis
    var xScale = d3.scaleLinear()
      .range([-legendWidth / 2, legendWidth / 2])
      .domain([0, max])

    // Define x-axis
    var xAxis = d3.axisBottom()
      .ticks(5)
      // .tickFormat(formatPercent)
      .scale(xScale)

    // Set up X axis
    legendsvg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (10) + ')')
      .call(xAxis)
  }

  heatmap.title = function (_) {
    if (!arguments.length) { return title }
    title = _
    return heatmap
  }

  heatmap.subtitle = function (_) {
    if (!arguments.length) { return subtitle }
    subtitle = _
    return heatmap
  }

  heatmap.legendLabel = function (_) {
    if (!arguments.length) { return legendLabel }
    legendLabel = _
    return heatmap
  }

  heatmap.width = function (_) {
    if (!arguments.length) { return width }
    width = _
    return heatmap
  }

  heatmap.margin = function (_) {
    if (!arguments.length) { return margin }
    margin = _
    return heatmap
  }

  heatmap.colorScale = function (_) {
    if (!arguments.length) { return colorScale }
    colorScale = _
    return heatmap
  }

  return heatmap
};
