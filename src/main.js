/* global document */
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { format } from 'd3-format'
import { json } from 'd3-fetch'
import heatmap from '../lib/heatmap.js'

var chart = null
var selectStart = null
var selectEnd = null
var invertHighlightRows = false
var width = 900

function selectCell(cell) {
  if (!selectStart) {
    selectStart = cell
    chart.setHighlight([{ start: selectStart, end: selectStart }])
    chart.updateHighlight()
  } else if (!selectEnd) {
    selectEnd = cell
    chart.setHighlight([{ start: selectStart, end: selectEnd }])
    chart.updateHighlight()
  } else {
    selectStart = cell
    selectEnd = null
    chart.setHighlight([{ start: selectStart, end: selectStart }])
    chart.updateHighlight()
  }
}

function hover(cell) {
  if (selectStart && !selectEnd) {
    if (cell[0] > selectStart[0]) {
      chart.setHighlight([{ start: selectStart, end: cell }])
      chart.updateHighlight()
    } else if (cell[0] == selectStart[0]) {
      if (!invertHighlightRows) {
        if (cell[1] >= selectStart[1]) {
          chart.setHighlight([{ start: selectStart, end: cell }])
          chart.updateHighlight()
        } else {
          chart.setHighlight([{ start: selectStart, end: selectStart }])
          chart.updateHighlight()
        }
      } else {
        if (cell[1] <= selectStart[1]) {
          chart.setHighlight([{ start: selectStart, end: cell }])
          chart.updateHighlight()
        } else {
          chart.setHighlight([{ start: selectStart, end: selectStart }])
          chart.updateHighlight()
        }
      }
    } else {
      chart.setHighlight([{ start: selectStart, end: selectStart }])
      chart.updateHighlight()
    }
  }
}

json('data.json').then(function (data) {
  function onClick(d, i, j) {
    console.info('Clicked on range ' + data.rows[j] + ', time ' + data.columns[i] + ', count ' + d)
    selectCell([i, j])
  }

  function onMouseOver(d, i, j) {
    document.getElementById('details').innerHTML = 'time: ' + data.columns[i] + ', range: ' + data.rows[j] + ', count: ' + d
    hover([i, j])
  }

  function onMouseOut(d, i, j) {
    document.getElementById('details').innerHTML = ''
  }

  chart = heatmap()
    .title('')
    .subtitle('')
    .legendLabel('Count')
    .width(width)
    .legendTickFormat(format('.0f'))
    .xAxisScale([0, 121])
    .highlightColor('#936EB5')
    .highlightOpacity('0.4')
    .onClick(onClick)
    .onMouseOver(onMouseOver)
    .onMouseOut(onMouseOut)
    .invertHighlightRows(invertHighlightRows)
    .gridStrokeOpacity(0.5)
    .colorScale(scaleLinear()
      .domain([0, 65 / 2, 65])
      .range(['#F5F5DC', '#FF5032', '#E50914'])
    )
    .margin({
      top: 40,
      right: 0,
      bottom: 10,
      left: 0
    })
    .legendElement('#legend')
    .legendHeight(50)
    .legendMargin({
      top: 0,
      right: 0,
      bottom: 0,
      left: (width - Math.min(width * 0.8, 400)) / 2
    })

  select('#chart')
    .datum(data.values)
    .call(chart)
})