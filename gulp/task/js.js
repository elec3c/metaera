import { createRequire } from "module";
const require = createRequire(import.meta.url);

// import webpack from "webpack-stream";
import concat from "gulp-concat";
const uglify = require('gulp-uglify-es').default;


export const js = () => {
    return app.gulp.src(app.path.src.js, {sourcemaps: app.isDev})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>"
        })
    ))
    // .pipe(webpack({
    //     mode: app.isBuild ? 'production' : 'development',
    //     output: {
    //         filename: 'scripts.min.js',
    //     }
    // }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
}

export const scripts = () => {
    return app.gulp.src(app.path.src.js_libs, {sourcemaps: app.isDev})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(concat('libs.js'))
    // .pipe(uglify())
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
}