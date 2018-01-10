(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('deleteRule', DeleteRule);

    DeleteRule.$inject = ['DwinAdapter', 'RuleService', '$rootScope'];

    /**
     * Delete Rule Directive.
     * @param DwinAdapter
     * @param RuleService
     * @param $rootScope
     * @returns {{restrict: string, controller: DeleteRuleController}}
     * @constructor
     */
    function DeleteRule (DwinAdapter, RuleService, $rootScope) {

        return {
            restrict: 'A',
            controller: DeleteRuleController
        };

        /**
         * Controller Directive to handle the delete of Rules.
         * @param $scope
         * @param $element
         * @param $attrs
         * @constructor
         */
        function DeleteRuleController($scope, $element, $attrs) {

            $scope.showDeleteRuleModal = showDeleteRuleModal;

            var vm = this;

            vm.showDeleteRuleModal = showDeleteRuleModal;
            vm.deleteRule = deleteRule;

            /**
             * Display a warning modal to confirm Rule deletion.
             * @param ruleItem
             */
            function showDeleteRuleModal(ruleItem) {

                DwinAdapter.showConfirm(
                    DwinAdapter.translate('commission-sharing.areYouSureYouWantToDeleteRule'),
                    DwinAdapter.translate('commission-sharing.delete'),

                    function (result) {
                        if (result) {
                            deleteRule(ruleItem);
                        }
                    });
            }

            /**
             * Call the RuleService to delete a Rule.
             * @param ruleItem
             */
            function deleteRule(ruleItem) {

                RuleService.deleteRule(ruleItem).then(
                    deleteRuleSuccess,
                    deleteRuleFailure
                )
            }

            /**
             * We don't show anything on success call but just do a refresh of the Rule Directory.
             */
            function deleteRuleSuccess () {

                $rootScope.$emit('refreshList');
            }

            /**
             * Show an error when the Delete Rule service return a HTTP status different to 200.
             */
            function deleteRuleFailure () {

                DwinAdapter.showError(
                    DwinAdapter.translate('commission-sharing.deleteRuleFailureReason'),
                    DwinAdapter.translate('commission-sharing.deleteRuleFailure')
                )
            }

        }
    }

})();