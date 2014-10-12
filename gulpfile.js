(function() {

    var mainModule = 'components/ngRangeSlider.js',
        vendorDest = 'example/js/vendor/ng-range-slider',
        devDist    = 'ng-range-slider.js',
        minDist    = 'ng-range-slider.min.js';

    var gulp   = require('gulp'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        karma  = require('gulp-karma'),
        jshint = require('gulp-jshint');

    gulp.task('build', function gulpBuild(){
        gulp.src(mainModule)
            .pipe(rename(devDist))
            .pipe(gulp.dest('dist'))
            .pipe(gulp.dest(vendorDest))
            .pipe(rename(minDist))
            .pipe(uglify())
            .pipe(gulp.dest('dist'))
    });

    gulp.task('karma', function gulpKarma() {

        var testFiles = [
            'example/js/vendor/angular/angular.js',
            'example/js/vendor/angular-mocks/angular-mocks.js',
            'node_modules/jquery/dist/jquery.js',
            'tests/Spec.js',
            mainModule
        ];

        return gulp.src(testFiles).pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            })).on('error', function onError(error) {
                throw error;
            });
    });

    gulp.task('hint', function gulpHint() {

        return gulp.src(mainModule)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'));
    });

    gulp.task('test', ['hint', 'karma']);
    gulp.task('default', ['hint', 'test']);

})();