#!/usr/bin/env node

const readline = require('readline')
const fs = require('fs')

const TIMEFACTOR = 1000000
const ROWS = 50
const MAXLAT = 2000
const OUTFILE = './examples/data.json'

function summarizeBucket(data) {
  var buckets = new Array(data.length);
  for (i = 0; i < data.length; i++) {
    buckets[i] = data[i].length
  }
  return buckets
}

function bucketSortValues(data, bucketCount, min, max, increment) {
  var buckets = new Array(bucketCount);
  // Initialize buckets
  for (i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }

  // Put the numbers into buckets
  var l = data.length
  for (i = 0; i < l; i++) {
    // Buckets include the lower bound but not the higher bound, except the top bucket
    if (data[i] === max) buckets[bucketCount-1].push(data[i]);
    else buckets[((data[i] - min) / increment) | 0].push(data[i]);
  }
  return buckets;
}

function convertTrace(filename) {
  var min = Infinity
  var max = -Infinity
  
  var columns = {}

  var lineReader = readline.createInterface({
    input: fs.createReadStream(filename)
  });
  
  lineReader.on('line', function (line) {
    var l = line.split(' ')
    var ts = l[0]
    if (!isNaN(ts)) {
      var n = Math.trunc(parseInt(ts) / TIMEFACTOR)
      if (columns[n] === undefined) {
        columns[n] = []
      }
      var v = parseInt(l[1])
      if (v > MAXLAT) { v = MAXLAT }
      columns[n].push(v)
      if (v > max) { max = v }
      if (v < min) { min = v }
    }
  });

  lineReader.on('close', function () {
    var increment = (max - min) / ROWS
    
    var rows = []
    for (i = 0; i < ROWS; i++) {
      rows.push(((i * increment) + min) | 0)
    }

    var cols = []
    var values = []
    for (var key in columns) {
      var s = summarizeBucket(bucketSortValues(columns[key], ROWS, min, max, increment))
      values.push(s)
      cols.push(key)
    }

    fs.writeFileSync(OUTFILE, JSON.stringify({ rows: rows, columns: cols, values: values }, null, 2) , 'utf-8');
  });
}

require('yargs')
  .usage('$0 <cmd> [args]')
  .command('convert [trace]', 'convert trace file.', (yargs) => {
    yargs.positional('trace', {
      type: 'string',
      default: null,
      describe: 'trace file path.'
    })
  }, function (argv) {
    console.log('Converting', argv.trace, '...')
    convertTrace(argv.trace)
  })
  .help()
  .argv