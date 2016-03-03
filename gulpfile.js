var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var babel        = require('gulp-babel');
var watchify = require('watchify');
var notify = require('gulp-notify');
var gutil = require('gulp-util');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {

  var props = {
    entries: ['./app/' + file],
    debug : true,
    transform:  [babelify.configure({
  presets: ["es2015", "react"]
})]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    bundler.plugin('minifyify', {map: 'app.js.map', output:'./.tmp/app.js.map'})
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('app.js'))
      .pipe(gulp.dest('./.tmp'))
      .pipe(browserSync.reload({
          stream: true,
      }));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}


gulp.task('bundle', ['copy'] ,function() {
  // return browserify({
  //   entries: 'app/main.jsx',
  //   extensions: ['.jsx'],
  //   debug: true,
  // })
  // .transform(babelify,{presets: ["es2015", "react"]})
  // .bundle()
  // .pipe(source('app.js'))
  // .pipe(gulp.dest('./.tmp'));
  return buildScript('main.jsx', false);
});

gulp.task('copy', function(){
  gulp.src(['app/*.css', 'bower_components/**/*.css'])
  .pipe(gulp.dest('./.tmp'));
})

gulp.task('serve', ['bundle','live-server'], function(){
  browserSync.init(null, {
    proxy: "http://localhost:7777",
    port: 9001
  });
});

gulp.task('live-server', function(){
  var server = new LiveServer('server/main.js');
  server.start();
})

gulp.task('watch', function() {
    gulp.watch('./app/**/*.css', ['copy']);
});



gulp.task('default', ['bundle', 'serve', 'watch'],  function() {
  return buildScript('main.jsx', true);
});
