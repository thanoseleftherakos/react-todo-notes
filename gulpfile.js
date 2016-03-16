var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var bower = require('gulp-bower');
var merge = require('merge-stream');

var config = {
     bowerDir: './bower_components' 
}
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('fonts', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./assets/fonts'));
});
gulp.task('css', function() {
    var fontawesome = gulp.src(config.bowerDir + '/font-awesome/css/font-awesome.min.css');
    var materialize =  gulp.src(config.bowerDir + '/Materialize/dist/css/materialize.min.css');
    var mergeStream = merge(fontawesome, materialize)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('./assets/css'));
    return mergeStream;
});
gulp.task('js', function() {
    var materialize =  gulp.src(config.bowerDir + '/Materialize/dist/js/materialize.min.js');
    var mergeStream = merge(materialize)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./assets/js'));
    return mergeStream;
});



var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
  entries: ['./components/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'))
}
bundler.on('update', bundle);

gulp.task('build', function() {
  bundle()
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          }
        }
      },
      open: true
    }));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('default', ['build', 'serve', 'sass','fonts','css','watch']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
