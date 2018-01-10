(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('numberFormat', NumberFormat);

    NumberFormat.$inject = ['$rootScope', '$filter', '$timeout'];

    function NumberFormat ($rootScope, $filter, $timeout) {
        return {
            require: '?ngModel',
            link: NumberFormatLink
        };

        function NumberFormatLink (scope, element, attrs, ngModel) {

            if (!ngModel) return;

            var options = {
                prefix: '',
                suffix: '',
                centsLimit: 2,
                limit: 4
            };

            // On Load
            ngModel.$formatters.unshift(function (value) {

                element.unbindPriceFormat().priceFormat(options);
                // Needs to be unbound again to set model and view values
                element.unbindPriceFormat();

                // Sets the form field value
                return $filter('number')(ngModel.$modelValue, 2);
            });

            // During Input
            ngModel.$parsers.unshift(function (value) {

                element.unbindPriceFormat().priceFormat(options);
                // Needs to be unbound again to set model and view values
                element.unbindPriceFormat();

                // Updates the form field value
                ngModel.$setViewValue(String($filter('number')(element[0].value, 2)));
                ngModel.$render();

                // Fix for IE & Firefox
                element[0].focus();
                $timeout(function() {
                    setCursorFocusToEndOfInput(element);
                });

                // Updates the ng model
                return element[0].value.replace(',', '.');
            });

            // Fix for IE & Firefox
            element.bind('focusin', function () {

                $timeout(function() {
                    setCursorFocusToEndOfInput(element);
                });
            });
        }

        /**
         * @param element
         */
        function setCursorFocusToEndOfInput(element) {

            var elementValueLength = element[0].value.length;

            element[0].setSelectionRange(elementValueLength, elementValueLength);
        }
    }

})();
