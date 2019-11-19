var gulp = require("gulp");
var sass = require("gulp-sass");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCSS = require("gulp-clean-css");
var del = require("del");

var paths = {
  styles: {
    src: "styles/**/*.scss",
    dest: "public/assets/styles/"
  },
  scripts: {
    src: "scripts/**/*.js",
    dest: "public/assets/scripts/"
  }
};

function clean() {
  return del(["public/assets"]);
}

function styles() {
  return (
    gulp
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
      .pipe(gulp.dest(paths.styles.dest))
  );
}

function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

var build = gulp.series(clean, gulp.parallel(styles, scripts));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
