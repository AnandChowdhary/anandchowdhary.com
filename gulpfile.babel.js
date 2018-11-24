import gulp from "gulp";
import minifyHTML from "gulp-minify-html";
import runSequence from "run-sequence";
import responsive from "gulp-responsive";
import imagemin from "gulp-imagemin";
import mozjpeg from "imagemin-mozjpeg";

gulp.task("images", () =>
	gulp
		.src("./public/images/**/*.*")
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
					silent: true,
					withoutEnlargement: true,
					skipOnEnlargement: false,
					errorOnEnlargement: false
				}
			)
		)
		.pipe(gulp.dest("./public/images"))
);

gulp.task("compress", () =>
	gulp
		.src(["./public/images/**/*.*"])
		.pipe(imagemin([imagemin.gifsicle(), imagemin.optipng(), imagemin.svgo(), mozjpeg()]))
		.pipe(gulp.dest("./public/images"))
);

gulp.task("minify", () => {
	const opts = { comments: true, spare: true };
	gulp
		.src("./public/**/*.html")
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest("./public/"));
});

gulp.task("default", () => {
	runSequence("images", "minify", function() {});
});
