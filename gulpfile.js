let gulp            = require('gulp'),
	scss            = require('gulp-sass'),
	browserSync     = require('browser-sync'),
	autoprefixer    = require('gulp-autoprefixer');


gulp.task('scss', function() {
	return gulp.src('src/style/main.scss')
		.pipe(scss().on( 'error', function( error )
			{console.log( error );} )
		)
		.pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
		.pipe(gulp.dest('src/style'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('default', ['browser-sync', 'scss'], function() {
	gulp.watch('src/style/**/*.scss', ['scss']);
	gulp.watch('src/index.html', browserSync.reload);
	gulp.watch('src/style/**/*.css', browserSync.reload);
	gulp.watch('src/script/**/*.js', browserSync.reload);
});