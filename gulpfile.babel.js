import gulp from "gulp";
import gulpCopy from "gulp-copy";

const sourceFiles = ["./public/"];
const destination = "./docs/";

gulp.task("default", () => {});

gulp.task("copy", function() {
	gulp.src("./public/**/*").pipe(gulp.dest("./docs/"));
});
