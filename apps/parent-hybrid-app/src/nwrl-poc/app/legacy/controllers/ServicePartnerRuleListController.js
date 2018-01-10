(function () {
    'use strict';

    angular.module('CommissionSharing')
        .controller('ServicePartnerRuleListController', ServicePartnerRuleListController);

    ServicePartnerRuleListController.$inject = [
        'DwinAdapter',
        '$rootScope',
        '$loading',
        'RuleService',
        'RuleFactory',
        'PublisherService',
        '$q'
    ];

    function ServicePartnerRuleListController (
        DwinAdapter,
        $rootScope,
        $loading,
        RuleService,
        RuleFactory,
        PublisherService,
        $q
    ) {

        var DEFAULT_COLUMN          = 'modified';
        var DEFAULT_SORT_DIRECTION  = 'desc';

        var vm                      = this;
        vm.servicePartnerId         = parseInt(DwinAdapter.getLinkedAccountId());
        vm.ruleList                 = null;
        vm.refreshList              = refreshList;
        vm.page                     = 1;
        vm.pageSize                 = 25;
        vm.column                   = DEFAULT_COLUMN;
        vm.sort                     = DEFAULT_SORT_DIRECTION;
        vm.changePage               = changePage;
        vm.DEFAULT_PAGE_NO          = 1;
        vm.PAGINATOR_PAGE_SIZE      = 10; // Maximum amount of pages to show in paginator
        vm.resultsPerPageOptions    = [3,5,25,50,100];
        vm.totalItems               = null;
        vm.totalPages               = null;

        $rootScope.$on('refreshList', function (event, data) {
            changePage(1);
        });

        function refreshList(filters) {

            $loading.start('refreshList');

            if (typeof filters === 'undefined') {
                filters = {};
            }

            RuleService.getList(vm.page, vm.pageSize, vm.column, vm.sort, vm.servicePartnerId, filters).then(
                getListItemsSuccess,
                getListItemsFailure
            );

            /**
             * When the list items are fetched correctly.
             * @param response
             */
            function getListItemsSuccess(response) {

                var rules = RuleFactory.restangularizeCollection(null, response.data.items, 'rule');

                injectPublisherNames(rules).then(function () {
                    if (rules.length === 0) {
                        vm.ruleList = false;
                        vm.totalItems = 0;
                        vm.totalPages = 0;
                    } else {
                        vm.ruleList = rules;
                        vm.totalItems = response.data.totalItems;
                        vm.totalPages = response.data.totalPages;
                    }
                    $loading.finish('refreshList');
                }, function () {
                    // Error loading publisher names
                    $loading.finish('refreshList');
                });


            }

            /**
             * If we have a failure we set ruleList to false which will
             * show a message in the UI.
             */
            function getListItemsFailure() {
                vm.ruleList = false;
                $loading.finish('refreshList');
            }
        }

        /**
         * Fetch publisher partner names and insert in to each rule.
         * @param rules
         * @return promise
         */
        function injectPublisherNames(rules) {
            return $q(function(resolve, reject) {
                var publisherIds = [];

                angular.forEach(rules, function (rule) {
                    publisherIds.push(rule.publisherId);
                });

                PublisherService.getPublisherNames(publisherIds).then(
                    getPublisherNamesSuccess,
                    getPublisherNamesFailure
                );

                function getPublisherNamesSuccess(response) {
                    angular.forEach(rules, function (rule) {
                        if (response.data[rule.publisherId]) {
                            rule.publisherName = response.data[rule.publisherId];
                        }
                    });
                    resolve(rules);
                }

                function getPublisherNamesFailure() {
                    angular.forEach(rules, function (rule) {
                        rule.publisherName = "";
                    });
                    reject('There was a problem fetching publisher names.');
                }
            });
        }

        /**
         * Handles the changing of pages, called by Angular UI Paginator.
         */
        function changePage(page, pageSize) {

            vm.pageSize = pageSize ? pageSize : vm.pageSize;
            vm.page     = page ? page : vm.page;

            refreshList({});
        }
    }
})();
