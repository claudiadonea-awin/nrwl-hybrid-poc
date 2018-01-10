(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('disableWhenInvalid', DisableWhenInvalid);

    function DisableWhenInvalid () {
        return {
            restrict: 'A',
            link: DisableWhenInvalidLink,
            scope: {
                rule: '=',
                isValid: '='
            }
        };

        function DisableWhenInvalidLink ($scope, $element) {

            $scope.$watch(function () {
                return $scope.rule.publisherShare;
            }, toggleDisabled);

            $scope.$watch(function () {
                return $scope.isValid;
            }, toggleDisabled);

            /**
             * If the publisher share passes our checks we need to make sure
             * the save button is not disabled. If the checks fail we need to
             * disabled the button.
             */
            function toggleDisabled () {

                if (parseFloat($scope.rule.publisherShare).toFixed(2) == 0.00 ||
                    !$scope.isValid
                ) {
                    $element.attr('disabled', 'disabled');
                    $element.addClass('btn-disabled');
                    $element.removeClass('btn-default');
                } else {
                    $element.removeAttr('disabled');
                    $element.addClass('btn-default');
                    $element.removeClass('btn-disabled');
                }
            }
        }
    }
})();