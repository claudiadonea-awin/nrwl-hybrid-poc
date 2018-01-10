(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('percentageCalculator', PercentageCalculator);

    PercentageCalculator.$inject = ['$filter'];

    /**
     * Calculates difference between 100 and publisher share input and populates my share input
     */
    function PercentageCalculator ($filter) {

        return {
            restrict: 'A',
            link: PercentageCalculatorLink,
            scope: {
                rule: "="
            }
        };

        /**
         * @param $scope
         * @param $element
         * @param $attrs
         */
        function PercentageCalculatorLink ($scope, $element, $attrs) {

            var publisherShare = $element.find("#publisher-share");
            $element.on('keyup', publisherShare, calculatePercentage);

            function calculatePercentage () {

                var rule = $scope.rule;
                var publisherShareValue = parseFloat(rule.publisherShare);

                if (publisherShareValue >= 0 && publisherShareValue <= 100.00) {
                    rule.serviceProviderShare = parseFloat((100.00 - publisherShareValue).toFixed(2));
                } else {
                    rule.serviceProviderShare = '';
                }

                $scope.$apply();
            }
        }

    }

})();