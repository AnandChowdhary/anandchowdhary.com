import gulp from "gulp";
import minifyHTML from "gulp-minify-html";
import runSequence from "run-sequence";
import responsive from "gulp-responsive";

gulp.task("img", () =>
	gulp
		.src("./static/images/**/*.png")
		.pipe(
			responsive(
				{
					"**/*.png": [
						{
							width: 32,
							rename: { suffix: "@32" }
						},
						{
							width: 300,
							rename: { suffix: "@300" }
						},
						{
							width: 600,
							rename: { suffix: "@600" }
						},
						{
							width: 900,
							rename: { suffix: "@900" }
						},
						{
							width: 1200,
							rename: { suffix: "@1200" }
						}
					]
				},
				{
					silent: true,
					withoutEnlargement: true,
					skipOnEnlargement: false,
					errorOnEnlargement: false
				}
			)
		)
		.pipe(gulp.dest("./static/images"))
);

gulp.task("compress", () => {
	const opts = { comments: true, spare: true };
	gulp
		.src("./docs/**/*.html")
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest("./docs/"));
});

gulp.task("default", () => {
	runSequence("img", "compress", function() {});
});