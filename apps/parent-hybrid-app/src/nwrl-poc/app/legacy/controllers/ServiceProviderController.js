(function () {
    'use strict';

    angular.module('CommissionSharing')
        .controller('ServiceProviderController', ServiceProviderController);

    ServiceProviderController.$inject = [
        'DwinAdapter',
        'RuleService',
        'JwtModel',
        '$rootScope',
        '$filter'
    ];

    function ServiceProviderController (
        DwinAdapter,
        RuleService,
        JwtModel,
        $rootScope,
        $filter
    ) {

        var vm = this;
        vm.init = init;

        vm.clearRule = clearRule;
        vm.createRule = createRule;
        vm.isPublisherShareValid = isPublisherShareValid;
        vm.isShareWithinRange = isShareWithinRange;
        vm.commissionShareMinimumValue = $filter('number')(0.01, 2);
        vm.commissionShareMaximumValue = $filter('number')(99.99, 2);

        vm.ruleModel = {
            publisherShare: 0.00
        };

        vm.ruleForm = null;

        // Load Templates
        angular.extend(this, {
            templates: {
                'ruleForm': 'rule',
                'servicePartnerRuleList': 'rule-list',
                'editRuleContainer': 'edit-rule-container'
            }
        });

        /**
         * This function is run as soon as the view is intialized.
         *
         * @param jwt string
         */
        function init(jwt) {

            JwtModel.set(jwt);

            RuleService.getList(0, 25, 'modified', 'desc', DwinAdapter.getLinkedAccountId());
        }

        /**
         * Clear the rule model.
         */
        function clearRule () {
            vm.ruleModel = {
                publisherShare: 0.00
            };
        }

        function createRule (rule) {
            if (typeof rule !== 'undefined') {
                RuleService.create(rule, DwinAdapter.getLinkedAccountId()).then(
                    RuleSaveSuccess,
                    RuleSaveFailure
                );
            }
        }

        function RuleSaveSuccess () {
            $rootScope.$broadcast('refreshList');
            $rootScope.$broadcast('closeCreateForm');
        }

        function RuleSaveFailure () {
            DwinAdapter.showError(
                DwinAdapter.translate("js.commission-sharing.uploadSaveFailure"),
                DwinAdapter.translate("js.general.error")
            );
        }

        function isPublisherShareValid(publisherShare) {
            return (parseFloat(publisherShare).toFixed(2) != 0.00);
        }

        function isShareWithinRange(shareValue) {

            var min = vm.commissionShareMinimumValue.replace(",", '.');
            var max = vm.commissionShareMaximumValue.replace(",", '.');

            return (shareValue >= min && shareValue <= max);
        }

    }

})();