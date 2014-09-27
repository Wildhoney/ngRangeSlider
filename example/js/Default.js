(function($angular) {

    // Off we go!
    $angular.module('rangeApp', ['ngRangeSlider']).controller('IndexController', function IndexController($scope) {

        /**
         * @property range
         * @type {{from: number, to: number}}
         */
        $scope.range = { from: 0, to: 10 };

        /**
         * @property max
         * @type {Number}
         */
        $scope.max = 15;

    });

})(window.angular);