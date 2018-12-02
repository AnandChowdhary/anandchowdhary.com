import gulp from "gulp";
import minifyHTML from "gulp-minify-html";
import runSequence from "run-sequence";
import responsive from "gulp-responsive";
import imagemin from "gulp-imagemin";
import mozjpeg from "imagemin-mozjpeg";

gulp.task("images", () =>
	gulp
		.src("./docs/images/**/*.*")
		.pipe(
			responsive(
				{
					"**/*.*": [
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
						},
						{
							width: 1600,
							rename: { suffix: "@1600" }
						}
					]
				},
				{
					silent: false,
					withoutEnlargement: true,
					skipOnEnlargement: false,
					errorOnEnlargement: false
				}
			)
		)
		.pipe(gulp.dest("./docs/images"))
);

gulp.task("compress", () =>
	gulp
		.src(["./docs/images/**/*.*"])
		.pipe(imagemin([imagemin.gifsicle(), imagemin.optipng(), imagemin.svgo(), mozjpeg()]))
		.pipe(gulp.dest("./docs/images"))
);

gulp.task("minify", () => {
	const opts = { comments: true, spare: true };
	gulp
		.src("./docs/**/*.html")
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest("./docs/"));
});

gulp.task("default", () => {
	runSequence("minify", function() {});
});
