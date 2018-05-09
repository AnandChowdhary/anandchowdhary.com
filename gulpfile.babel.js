import gulp from "gulp";
import minifyHTML from "gulp-minify-html";
import runSequence from "run-sequence";

gulp.task("default", () => {
	runSequence("copy", "compress", function() {});
});

gulp.task("copy", () => {
	gulp.src("./public/**/*").pipe(gulp.dest("./docs/"));
});

gulp.task("compress", () => {
	const opts = { comments: true, spare: true };
	gulp
		.src("./docs/**/*.html")
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest("./docs/"));
});
