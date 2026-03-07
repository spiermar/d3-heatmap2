import { select } from 'd3-selection'
import heatmap from '../lib/heatmap.js'

// Sample data - 2D array (columns × rows)
const data = [
  [10, 15, 40],
  [20, 25, 50],
  [30, 35, 60],
]

const chart = heatmap()
  .width(500)
  .height(300)
  .title('Sample Heatmap')
  .legendLabel('Value')

select('#chart')
  .datum(data)
  .call(chart)