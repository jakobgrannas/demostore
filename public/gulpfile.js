var gulp = require('gulp'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	minifyCSS = require('gulp-minify-css'),
	uncss = require('gulp-uncss'),
	uglify = require('gulp-uglify'),
	paths = {
		scripts: './js/*.js',
		styles: './css/*.css',
		images: './images/**/*',
	};

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('styles', function() {
  var basePath = '../application/views/scripts/';
	return gulp.src(paths.styles)
		.pipe(minifyCSS())
		.pipe(rename(function(path) {
			path.extname = ".min.css"
		}))
    .pipe(uncss({
      html: [basePath + 'index/index.phtml', basePath + 'footer.phtml', basePath + 'header.phtml']
    }))
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images/'));
});

gulp.task('clean', function() {
	return gulp.src(['dist/css', 'dist/js'], {read: false})
		.pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['clean'], function() {
	gulp.start('scripts', 'styles', 'images')
});
