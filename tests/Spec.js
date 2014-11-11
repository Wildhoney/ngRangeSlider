(function($angular) {

    describe('ngRangeSlider', function() {

        beforeEach(module('ngRangeSlider'));

        /**
         * @property rangeObject
         * @type {{from: number, to: number}}
         */
        var rangeObject = { from: 0, to: 10 };

        /**
         * @method compileDirective
         * @return {Object}
         */
        var compileDirective = function compileDirective() {

            var scope, html = '<section data-range-slider ng-model="range"></section>',
                document    = '';

            inject(function inject($rootScope, $compile) {

                scope            = $rootScope.$new();
                scope.range      = rangeObject;
                document         = $compile(html)($angular.extend(scope));

            });

            return { scope: scope.$$childHead, html: document };

        };

        it('Should be able to define the defaults;', function() {

            var scope = compileDirective().scope;
            expect(scope._values.min).toEqual(0);
            expect(scope._values.max).toEqual(100);
            expect(scope._step).toEqual(1);
            expect($angular.isArray(scope._model)).toBeTruthy();

        });

        it('Should be able to update the range;', function() {

            var directive = compileDirective(),
                scope     = directive.scope,
                html      = directive.html;

            expect(scope._model[0]).toEqual(0);
            expect(scope._model[1]).toEqual(10);

            scope._model[0] = 5;
            scope._model[1] = 15;

            var firstInput  = html.find('input')[0],
                changeEvent = document.createEvent('Event');
            changeEvent.initEvent('change', true, false);
            firstInput.dispatchEvent(changeEvent);

        });

    });

})(window.angular);