var gulp = require('gulp');
var sass = require('gulp-sass');
//var uglifycss = require('gulp-uglifycss');
// var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

// Path to localhost on AspIT computer:
var localhost = 'C:/apps/xampp/htdocs/';
// Path to localhost on private computer:
// var localhost = 'C:/apps/wamp64/www/';

var paths = {
	src: 'src/**/*',
	srcHTML: 'src/**/*.html',
	// srcPHP: 'src/**/*.php',
	srcSCSS: 'src/css/**/*.scss',
    srcCSS: "src/css/**/*.css",
	srcJS: 'src/**/*.js',
	// scrIMG: 'src/img/*',

	tmp: localhost + 'tmp',
	tmpHTML: localhost + 'tmp/**/*.html',
	// tmpPHP: localhost + 'tmp/*.php',
	tmpCSS: localhost + 'tmp/css/',
	tmpJS: localhost + 'tmp/'//,
	// tmpIMG: localhost + 'tmp/img/'
};

gulp.task('default', ['watch']);

gulp.task('html', function () {
	return gulp.src(paths.srcHTML)
		.pipe(gulp.dest(paths.tmp))
		.pipe(livereload());
});

gulp.task('scss', function () {
    return gulp.src('src/css/style.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.tmpCSS))
        .pipe(livereload());
});

gulp.task('css', function () {
	return gulp.src(paths.srcCSS)
		// .pipe(sass())
		.pipe(gulp.dest(paths.tmpCSS))
		.pipe(livereload());
});

gulp.task('js', function () {
	return gulp.src(paths.srcJS)
		.pipe(gulp.dest(paths.tmpJS))
		.pipe(livereload());
});

// gulp.task('img', function () {
// 	return gulp.src(paths.scrIMG)
// 		.pipe(gulp.dest(paths.tmpIMG))
// 		.pipe(livereload());
// });

gulp.task('watch', ['html', 'scss', 'css', 'js'], function () {
	livereload.listen();
	gulp.watch(paths.srcHTML, ['html']);
    gulp.watch(paths.srcSCSS, ['scss']);
	gulp.watch(paths.srcCSS, ['css']);
	gulp.watch(paths.srcJS, ['js']);
	// gulp.watch(paths.srcIMG, ['img']);
});
