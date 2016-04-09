var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var typescript = require("typescript");
var del = require("del");

gulp.task("default", ["compile", "watch"]);

gulp.task("clean",
    function (callback)
    {
        return del([
                "./dist/**"
            ],
            {force: true}, callback);
    });

// Compile Typescript files
gulp.task("compile", ["clean"],
    function ()
    {
        return gulp.src("./src/**")
            .pipe(plugins.typescript({
                typescript: typescript,
                target: "ES6",
                module: "commonjs",
                experimentalAsyncFunctions: true,
                experimentalDecorators: true,
                removeComments: true
            }))
            .pipe(plugins.debug({title: "[app] compiled:"}))
            .pipe(gulp.dest("./dist/"));
    });

// Watch Typescript files for changes
gulp.task("watch",
    function ()
    {
        plugins.watch("./src/**",
            plugins.batch(function (events, done)
            {
                gulp.start("compile", done);
            }));
    });