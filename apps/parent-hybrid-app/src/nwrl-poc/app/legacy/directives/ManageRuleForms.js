(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('manageRuleForms', ManageRuleForms);

    ManageRuleForms.$inject = ['$compile', '$document', '$timeout', '$templateCache', '$rootScope'];

    function ManageRuleForms ($compile, $document, $timeout, $templateCache, $rootScope) {

        return {
            restrict: 'A',
            controller: ManageRuleFormsController
        };

        function ManageRuleFormsController ($scope, $element, $attrs) {

            $scope.showRuleForm      = false;

            $scope.toggleRuleAddForm = toggleRuleAddForm;
            $scope.closeRuleAddForm  = closeRuleAddForm;

            var vm                   = this;
            vm.resetFormData         = resetFormData;

            $rootScope.$on('closeCreateForm', function (event, data) {
                closeRuleAddForm();
            });

            function toggleRuleAddForm() {

                if ($scope.showRuleForm) {
                    closeRuleAddForm();
                } else {
                    $scope.showRuleForm = true;
                    openRuleAddForm();
                }
            }

            function openRuleAddForm () {

                resetFormData();

                $timeout(function () {

                    var target = angular.element('#add-form');

                    target.slideDown(500);
                }, 50);
            }

            function closeRuleAddForm (speed) {

                if (!speed) {
                    speed = 500;
                }
                if ($scope.showRuleForm) {
                    var target = angular.element('#add-form');
                    target.slideUp(speed);

                    // Ng-if will not trigger if the element is already hidden
                    $timeout(function () {
                        $scope.showRuleForm = false;
                    }, 499);
                }
            }

            /**
             * Wrapping function for clearing all the rule data.
             *
             * @return void
             */
            function resetFormData () {
                $scope.sPController.clearRule();
            }

        }
    }

})();
