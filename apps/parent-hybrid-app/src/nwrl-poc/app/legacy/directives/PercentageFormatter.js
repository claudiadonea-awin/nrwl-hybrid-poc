(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('percentageFormatter', PercentageFormatter);

    PercentageFormatter.$inject = ['$filter'];

    //@TODO: This need to be improved.
    function PercentageFormatter ($filter) {

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ngModel) {
                if (!ngModel) return;

                var viewValue;
                var MAXIMUM_VALUE = 100;


                // $parsers input from UI on user change.
                ngModel.$parsers.push(function (value) {

                    var returnValue;
                    var reg = /[^0-9,.]/;

                    value = value.replace(',', '.');

                    if (value.length > 5 || numberOfDecimalPlaces(value) > 2 || value.indexOf('-') !== -1 || reg.test(value)){
                        returnValue = viewValue;
                        ngModel.$setViewValue(viewValue, 2);
                        ngModel.$render();
                    } else if (value >= MAXIMUM_VALUE) {
                        returnValue = parseFloat(value / 10).toFixed(2);
                        viewValue = $filter('number')(returnValue, 2);
                        ngModel.$setViewValue(returnValue);
                        ngModel.$render();
                    } else {
                        value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
                        returnValue = value;
                        viewValue = $filter('number')(returnValue, 2);
                    }

                    return returnValue;
                });

                // $formatters input from view ng-model being rendered.
                ngModel.$formatters.push(function () {
                    var value = ngModel.$modelValue;

                    if (value === undefined) {
                        value = element[0].value;
                    }

                    var filteredValue = $filter('number')(parseFloat(Math.round(value * 100) / 100).toFixed(2), 2);
                    element[0].value = filteredValue;

                    return filteredValue;
                });

                function numberOfDecimalPlaces(number) {
                    number = number + '';
                    var separator = '.';
                    if (number.indexOf(',') !== -1) {
                        separator = ',';
                    }
                    var pieces = number.split(separator) || [];
                    if (pieces[1]) {
                        return pieces[1].length;
                    }

                    return 0;
                }
            }
        };
    }

})();

