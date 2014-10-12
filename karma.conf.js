module.exports = function(config) {

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'example/js/vendor/angular/angular.js',
            'example/js/vendor/angular-mocks/angular-mocks.js',
            'node_modules/jquery/dist/jquery.js',
            'tests/Spec.js',
            'components/ngRangeSlider.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Firefox'],
        singleRun: true
    });
};