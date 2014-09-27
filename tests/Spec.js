(function($angular) {

    describe('ngRangeSlider', function() {

        beforeEach(module('ngRangeSlider'));

        /**
         * @method compileDirective
         * @return {Object}
         */
        var compileDirective = function compileDirective() {

            var scope, html = '<section data-range-slider ng-model="range"></section>';

            inject(function inject($rootScope, $compile) {

                scope       = $rootScope.$new();
                scope.range = { from: 0, to: 10 };
                $compile(html)($angular.extend(scope));
                $rootScope.$apply();

            });

            return scope.$$childHead;

        };

        it('Should be able to define a default min/max;', function() {

            var scope = compileDirective();
            expect(scope._min).toEqual(0);
            expect(scope._max).toEqual(100);

        });

    });

})(window.angular);