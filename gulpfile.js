(function() {

    var gulp   = require('gulp'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        karma  = require('gulp-karma'),
        jshint = require('gulp-jshint');

    gulp.task('build', function(){
        gulp.src('components/ngRangeSlider.js')
            .pipe(rename('ng-range-slider.js'))
            .pipe(gulp.dest('dist'))
            .pipe(gulp.dest('example/js/vendor/ng-range-slider'))
            .pipe(rename('ng-range-slider.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist'))
    });

    gulp.task('karma', function() {

        var testFiles = [
            'example/js/vendor/angular/angular.js',
            'example/js/vendor/angular-mocks/angular-mocks.js',
            'tests/Spec.js',
            'components/ngRangeSlider.js'
        ];

        return gulp.src(testFiles)
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            }))
            .on('error', function(err) {
                throw err;
            });
    });

    gulp.task('hint', function() {

        return gulp.src('components/ngRangeSlider.js')
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'));
    });

    gulp.task('test', ['hint', 'karma']);
    gulp.task('default', ['hint', 'test']);

})();