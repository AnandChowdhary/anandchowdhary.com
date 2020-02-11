var gulp = require("gulp");
var del = require("del");

var paths = {
  static: {
    src: "static/**/*.*",
    dest: "public/"
  }
};

function clean() {
  return del(["public/assets"]);
}

function static() {
  return gulp.src(paths.static.src).pipe(gulp.dest(paths.static.dest));
}

function watch() {
  gulp.watch(paths.static.src, static);
}

var build = gulp.series(clean, gulp.parallel(static));

exports.clean = clean;
exports.static = static;
exports.watch = watch;
exports.build = build;
exports.default = build;
