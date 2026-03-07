import { select } from 'd3-selection'
import heatmap from '../lib/heatmap.js'

// Sample data
const data = [
  { row: 'Mon', col: '1am', value: 10 },
  { row: 'Mon', col: '2am', value: 20 },
  { row: 'Mon', col: '3am', value: 30 },
  { row: 'Tue', col: '1am', value: 15 },
  { row: 'Tue', col: '2am', value: 25 },
  { row: 'Tue', col: '3am', value: 35 },
  { row: 'Wed', col: '1am', value: 40 },
  { row: 'Wed', col: '2am', value: 50 },
  { row: 'Wed', col: '3am', value: 60 },
]

const chart = heatmap()
  .width(500)
  .height(300)
  .title('Sample Heatmap')
  .legendLabel('Value')

select('#chart')
  .datum(data)
  .call(chart)