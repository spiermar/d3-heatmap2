var gulp = require('gulp')
var rollup = require('rollup-stream')
var source = require('vinyl-source-stream')
var uglify = require('gulp-uglify')
var del = require('del')
var rename = require('gulp-rename')
var eslint = require('gulp-eslint')
var browserSync = require('browser-sync').create()

gulp.task('clean', function () {
  return del(['dist'])
})

gulp.task('lint', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('rollup', function () {
  return rollup({
    input: './index.js',
    name: 'd3',
    format: 'umd',
    extend: true,
    sourcemap: false
  })
    .pipe(source('d3-heatmap.js'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('uglify', function () {
  return gulp.src('./dist/d3-heatmap.js')
    .pipe(gulp.dest('./dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('style', function () {
  return gulp.src('./src/heatmap.css')
    .pipe(rename('d3-heatmap.css'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: ['examples', 'dist']
    }
  })
})

gulp.task('server', gulp.parallel('browser-sync', function () {
  gulp.watch('./src/*.js', gulp.series('lint', 'rollup', function () {
    browserSync.reload()
  }))
  gulp.watch('./src/*.css', gulp.series('style', function () {
    browserSync.reload()
  }))
}))

gulp.task('build', gulp.series('clean', 'lint', 'rollup', 'uglify', 'style'))

gulp.task('default', gulp.series('server'))
