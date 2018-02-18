var gulp = require('gulp');
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');

gulp.task('rollup', function() {
    
  });

function rollupTask() {
    return rollup({
        input: './index.js',
        name: 'd3',
        format: 'umd',
        extend: true,
        sourcemap: false
      })
      .pipe(source('d3-heatmap.js'))
      .pipe(gulp.dest('./dist'));
};

function watchTask() {
    gulp.watch('./src/**/*.js', ['rollup']);
}

exports.rollup = rollupTask;
exports.watch = watchTask;