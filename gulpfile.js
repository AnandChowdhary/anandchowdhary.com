var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var cleanCSS = require("gulp-clean-css");
var del = require("del");

var paths = {
  styles: {
    src: "styles/**/*.scss",
    dest: "public/assets/styles/"
  },
  static: {
    src: "static/**/*.*",
    dest: "public/"
  }
};

function clean() {
  return del(["public/assets"]);
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(concat("main.min.css"))
    .pipe(
      rename({
        basename: "main",
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

function static() {
  return gulp.src(paths.static.src).pipe(gulp.dest(paths.static.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.static.src, static);
}

var build = gulp.series(clean, gulp.parallel(styles, static));

exports.clean = clean;
exports.static = static;
exports.styles = styles;
exports.watch = watch;
exports.build = build;
exports.default = build;
