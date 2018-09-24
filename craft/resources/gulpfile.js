var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    doiuse = require('doiuse'),
    expect = require('gulp-expect-file'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    reporter = require('postcss-reporter'),
    sass = require('gulp-sass'),
    syntax_scss = require('postcss-scss'),
    cssnext = require('postcss-cssnext'),
    stylelint = require('stylelint'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminZopfli = require('imagemin-zopfli'),
    imageminMozjpeg = require('imagemin-mozjpeg'), //need to run 'brew install libpng'
    imageminGiflossy = require('imagemin-giflossy'),
    plumber = require('gulp-plumber'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    newer = require('gulp-newer'),
    rev = require('gulp-rev'),
    revDel = require('rev-del-webnl'),
    runSequence = require('run-sequence'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    babel = require("gulp-babel");

const config = require("./config/gulp.conf.js")();

const stylelintConfig = require('./stylelint.json');

const processors = [
    stylelint(stylelintConfig),
    reporter({
        clearReportedMessages: false,
        throwError: false
    })
];

gulp.task('app-js', function () {

    return gulp.src(config.js.main.app.src)
        .pipe(expect(config.js.main.app.src))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat({path: 'js/app.min.js', cwd: ''}))
        .pipe(uglify())
        .pipe(gulpif(config.conditions.manifest, rev()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.dist))
        .pipe(gulpif(config.conditions.manifest, rev.manifest('manifest.json', {merge: true, base: './public'})))
        .pipe(
            gulpif(config.conditions.manifest, revDel({
                dest: config.paths.dist,
                oldManifest: 'manifest.json',
                deleteMapExtensions: true
            }))
        )
        .pipe(
            gulpif(config.conditions.manifest, gulp.dest(config.paths.dist))
        )
        .pipe(reload({stream: true}));
});

if (config.conditions.webkey) {
    gulp.task('webkey-js', function () {
        return gulp.src(config.js.main.webkey.src)
            .pipe(expect(config.js.main.webkey.src))
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(concat({path: 'js/webkey.min.js', cwd: ''}))
            .pipe(uglify())
            .pipe(gulpif(config.conditions.manifest, rev()))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.paths.dist))
            .pipe(gulpif(config.conditions.manifest, rev.manifest('manifest.json', {merge: true, base: './public'})))
            .pipe(gulpif(config.conditions.manifest, revDel({
                dest: config.paths.dist,
                oldManifest: 'manifest.json',
                deleteMapExtensions: true
            })))
            .pipe(gulpif(config.conditions.manifest, gulp.dest(config.paths.dist)))
            .pipe(reload({stream: true}));
    });
}

gulp.task('vendors', function () {
    return gulp.src(config.js.vendors.src)
        .pipe(expect(config.js.vendors.src))
        .pipe(sourcemaps.init())
        .pipe(concat({path: 'js/vendors.min.js', cwd: ''}))
        .pipe(uglify())
        .pipe(gulpif(config.conditions.manifest, rev()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.dist))
        .pipe(gulpif(config.conditions.manifest, rev.manifest('manifest.json', {merge: true, base: './public'})))
        .pipe(gulpif(config.conditions.manifest, revDel({
            dest: config.paths.dist,
            oldManifest: 'manifest.json',
            deleteMapExtensions: true
        })))
        .pipe(gulpif(config.conditions.manifest, gulp.dest(config.paths.dist)))
        .pipe(reload({stream: true}));
});

gulp.task('scss_lint', function () {
    return gulp.src([config.scss.watch, config.scss.app.watch, config.scss.webkey.watch])
        .pipe(postcss(processors, {syntax: syntax_scss}));
});


gulp.task('app-scss', function () {
    return gulp.src(config.scss.app.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(expect(config.scss.app.src))
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                config.paths.node
            ]
        }))
        // autoprefix where needed
        .pipe(autoprefixer({
            cascade: false,
        }))
        // clean and minify css
        // Note that cleancss optimization level < 2
        // level 2 will break BEM class ordering by merging classes
        .pipe(cleanCss({
            compatibility: 'ie11',
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(concat({path: 'css/main.min.css', cwd: ''}))
        .pipe(gulpif(config.conditions.manifest, rev()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.dist))
        .pipe(gulpif(config.conditions.manifest, rev.manifest('manifest.json', {merge: true, base: './public'})))
        .pipe(gulpif(config.conditions.manifest, revDel({
            dest: config.paths.dist,
            oldManifest: 'manifest.json',
            deleteMapExtensions: true
        })))
        .pipe(gulpif(config.conditions.manifest, gulp.dest(config.paths.dist)))
        .pipe(reload({stream: true}));
});

if (config.conditions.webkey) {
    gulp.task('webkey-scss', ['scss_lint'], function () {
        return gulp.src(config.scss.webkey.src)
            .pipe(plumber())
            .pipe(expect(config.scss.webkey.src))
            .pipe(sass({
                errLogToConsole: true,
                includePaths: [
                    config.paths.node
                ]
            }))
            // autoprefix where needed
            .pipe(autoprefixer({
                cascade: false,
            }))
            // clean and minify css
            // Note that cleancss optimization level < 2
            // level 2 will break BEM class ordering by merging classes
            .pipe(cleanCss({
                compatibility: 'ie11',
                level: {
                    1: {
                        specialComments: 0
                    }
                }
            }))
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest(config.paths.dist + 'css'))
            .pipe(reload({stream: true}));
    });
}

//Checks feature usage, shows error when feature is being used that is not supported by the defined browsers
gulp.task('doiuse', function () {
    return gulp.src(config.paths.dist + 'css/app.min.css')
        .pipe(postcss([
            doiuse({
                browsers: [
                    '> 5%',
                    'last 1 chrome version',
                    'last 1 firefox version',
                    'last 1 IE versions',
                    'last 1 Opera version',
                    'last 1 Safari version',
                    'iOS > 7',
                    'not dead'
                ],
                onFeatureUsage: function (usageInfo) {
                    console.log(usageInfo.message)
                }
            })
        ]))
});


gulp.task('clean', function (cb) {
    return del(
        [config.paths.dist + '/css', config.paths.dist + '/images', config.paths.dist + '/js', config.paths.dist + '/fonts'], {
            force: true
        });
});


gulp.task('images', function () {
    return gulp.src(config.images.src)
        .pipe(newer(config.images.dest))
        .pipe(cache(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: 98 //lossy settings
            }),
            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective, therefore disabled. Enable at your own discretion
            }),
            //gif
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 90
            })
        ])))
        .pipe(gulp.dest(config.images.dest))
        .pipe(reload({stream: true}));
});


gulp.task('fonts', function () {
    return gulp.src(config.fonts.src)
        .pipe(expect(config.fonts.src))
        .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('null', function () {
    return false
});

gulp.task('assets', ['images', 'fonts']);
gulp.task('setup', runSequence('app-scss', config.conditions.webkey ? 'webkey-scss' : 'null', 'app-js', config.conditions.webkey ? 'webkey-js' : 'null', 'vendors', 'assets'));

gulp.task('watch', function () {

    if (!config.conditions.manifest) {
        browserSync.init(
            [
                config.paths.dist + 'css/**/*.min.css',
                config.paths.dist + 'js/**/*.min.js',
                config.paths.root + '**/*.html.twig',
                config.paths.root + '**/*.twig'
            ], {
                proxy: 'www.hksmediation.gjl.nl',
                open: false
            });
    }

    gulp.watch(config.scss.watch, ['app-scss', config.conditions.webkey ? 'webkey-scss' : 'null']);
    gulp.watch(config.scss.app.watch, ['app-scss']);

    if (config.conditions.webkey) {
        gulp.watch(config.scss.webkey.watch, ['webkey-scss']);
    }

    gulp.watch(config.images.watch, ['images']);
    gulp.watch(config.js.main.app.watch, ['app-js']);

    if (config.conditions.webkey) {
        gulp.watch(config.js.main.webkey.watch, ['webkey-js']);
    }

    gulp.watch(config.js.vendors.watch, ['vendors']);
});
