(function($angular) {

    "use strict";

    // No, no! The adventures first; explanations take such a dreadful time.
    $angular.module('ngRangeSlider', []).directive('rangeSlider', ['$window', function ngRangeSlider($window) {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @property template
             * @type {String}
             */
            template: '<section><input type="range" ng-change="_which = 0" ng-model="_model[0]" min="{{_min}}" max="{{_max}}" /><input type="range" ng-change="_which = 1" ng-model="_model[1]" min="{{_min}}" max="{{_max}}" /></section>',

            /**
             * @property replace
             * @type {Boolean}
             */
            replace: true,

            /**
             * @property require
             * @type {String}
             */
            require: 'ngModel',

            /**
             * @property scope
             * @type {Object}
             */
            scope: {
                model: '=ngModel',
                max: '=',
                min: '='
            },

            /**
             * @method link
             * @param scope {Object}
             * @return {void}
             */
            link: function link(scope) {

                /**
                 * @property _model
                 * @type {Array}
                 * @private
                 */
                scope._model = [scope.model.from, scope.model.to];

                /**
                 * @property _min
                 * @type {Number}
                 * @private
                 */
                scope._min = scope.min;

                /**
                 * @property _max
                 * @type {Number}
                 * @private
                 */
                scope._max = scope.max;

                /**
                 * Responsible for determining which slider the user was moving, which help us resolve
                 * occurrences of sliders overlapping.
                 *
                 * @property _which
                 * @type {Number}
                 * @private
                 */
                scope._which = 0;

                // Observe the `_model` for any changes.
                scope.$watchCollection('_model', function modelChanged() {

                    scope._model[0] = $window.parseInt(scope._model[0]);
                    scope._model[1] = $window.parseInt(scope._model[1]);

                    // User was moving the first slider.
                    if (scope._which === 0 && scope._model[1] < scope._model[0]) {
                        scope._model[1] = scope._model[0];
                    }

                    // Otherwise they were moving the second slider.
                    if (scope._which === 1 && scope._model[0] > scope._model[1]) {
                        scope._model[0] = scope._model[1];
                    }

                    // Update the model!
                    scope.model = { from: scope._model[0], to: scope._model[1] };

                });

            }

        };

    }]);

})(window.angular);