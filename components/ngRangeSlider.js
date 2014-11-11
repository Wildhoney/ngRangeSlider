(function($angular, _) {

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
             * @method controller
             * @param $scope {Object}
             * @return {void}
             */
            controller: ['$scope', function controller($scope) {

                /**
                 * @method iter
                 * @param max {Number}
                 * @return {Array}
                 */
                $scope.iter = function iter(max) {

                    var iterator = [];

                    for (var index = 0; index <= max; index++) {
                        iterator.push(index);
                    }

                    return iterator;

                };

                /**
                 * @method _notInRunLoop
                 * @return {Boolean}
                 * @private
                 */
                $scope._notInRunLoop = function _notInRunLoop() {
                    return !!$scope.$root.$$phase;
                };

                /**
                 * Determines whether Underscore/Lo-Dash is available, and the `throttle` method is available
                 * on the object.
                 *
                 * @method _supportThrottle
                 * @return {Boolean}
                 * @private
                 */
                $scope._supportThrottle = function _supportThrottle() {
                    return ($angular.isDefined(_) && typeof _.throttle === 'function');
                };

            }],

            /**
             * @property template
             * @type {String}
             */
            template: '<section><datalist id="numbers"><option ng-repeat="index in iter(max)">{{index}}</option></datalist><input list="numbers" type="range" ng-change="_which = 0" ng-model="_model.from" min="{{_min}}" max="{{_max}}" step="{{_step}}" /><input type="range" ng-change="_which = 1" ng-model="_model.to" min="{{_min}}" max="{{_max}}" step="{{_step}}" /></section>',

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
                throttle: '=',
                step: '=',
                max: '=',
                min: '='
            },

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                /**
                 * @property _model
                 * @type {Array}
                 * @private
                 */
                scope._model = model;

                /**
                 * @property _min
                 * @type {Number}
                 * @private
                 */
                scope._min = scope.min || 0;

                /**
                 * @property _max
                 * @type {Number}
                 * @private
                 */
                scope._max = scope.max || 100;

                /**
                 * @property _step
                 * @type {Number}
                 * @private
                 */
                scope._step = scope.step || 1;

                /**
                 * Force the re-evaluation of the input slider values.
                 *
                 * @method _reevaluateInputs
                 * @return {void}
                 * @private
                 */
                var _reevaluateInputs = function _reevaluateInputs() {

                    var inputElements = element.find('input');

                    $angular.forEach(inputElements, function forEach(inputElement, index) {

                        inputElement = $angular.element(inputElement);

                        inputElement.val('');

                        if (index === 0) {
                            inputElement.val(scope._model.from);    
                        } else if (index === 1) {
                            inputElement.val(scope._model.to);
                        }
                    });

                };

                scope.$watch('min', function alteredMin() {
                    scope._min = scope.min;
                    _reevaluateInputs();
                });

                scope.$watch('max', function alteredMax() {
                    scope._max = scope.max;
                    _reevaluateInputs();
                });

                /**
                 * Responsible for determining which slider the user was moving, which help us resolve
                 * occurrences of sliders overlapping.
                 *
                 * @property _which
                 * @type {Number}
                 * @private
                 */
                scope._which = 0;

                /**
                 * @method _updateModel
                 * @param model {Object}
                 * @return {void}
                 * @private
                 */
                var _updateModel = function _updateModel(model) {

                    // Et voila...

                    if ($angular.isObject(scope.model)) {

                        // Developer defined an array.
                        scope.model = model;

                    } else {

                        // Otherwise it's an object.
                        scope.model = model;

                    }

                    if (scope._notInRunLoop()) {

                        try {

                            // Sometimes we're outside of the Angular run-loop, and therefore need to manually
                            // invoke the `apply` method!
                            scope.$apply();

                        } catch(e) {}

                    }

                };

                if (scope.throttle && scope._supportThrottle()) {

                    // Use the throttled version if we support it, and the developer has defined
                    // the throttle attribute.
                    _updateModel = _.throttle(_updateModel, $window.parseInt(scope.throttle));

                }

                // Observe the `_model` for any changes.
                scope.$watchCollection('_model', function modelChanged() {

                    scope._model.from = $window.parseInt(scope._model.from);
                    scope._model.to = $window.parseInt(scope._model.to);

                    // User was moving the first slider.
                    if (scope._which === 0 && scope._model.to < scope._model.from) {
                        scope._model.to = scope._model.from;
                    }

                    // Otherwise they were moving the second slider.
                    if (scope._which === 1 && scope._model.from > scope._model.to) {
                        scope._model.from = scope._model.to;
                    }

                    // Update the model!
                    _updateModel(scope._model);

                });

            }

        };

    }]);

})(window.angular, window._);