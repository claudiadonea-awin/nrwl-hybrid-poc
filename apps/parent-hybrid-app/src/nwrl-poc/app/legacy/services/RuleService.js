(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .service('RuleService', RuleService);

    RuleService.$inject = ['RuleFactory'];

    function RuleService (RuleFactory) {

        return {
            create: create,
            getList: getList,
            deleteRule: deleteRule
        };

        /**
         * POST /rules
         *
         * @param rule
         *
         * @return object
         */
        function create (rule, serviceProviderId) {
            var rulesArray = buildRulesArray(rule, serviceProviderId);

            return RuleFactory.all('rules').post(rulesArray);
        }

        /**
         * Builds array that rule api accepts from rule form
         *
         * @param object rule
         *
         * @return array
         */
        function buildRulesArray(rule, serviceProviderId) {
            var ruleArray = [];

            if (rule !== undefined && rule.partnerPublishers !== undefined) {
                ruleArray = rule.partnerPublishers.map(function (partnerPublisher) {
                    return {
                        title: rule.title,
                        publisherId: partnerPublisher.affiliateId,
                        publisherShare: rule.publisherShare,
                        serviceProviderId: serviceProviderId,
                        serviceProviderShare: rule.serviceProviderShare
                    };
                });
            }

            return ruleArray;
        }

        /**
         * GET /rules?spId={}
         *
         * @param page integer
         * @param size integer
         * @param sortColumn string
         * @param sortDirection string
         * @param serviceProviderId integer
         * @param filters object
         * @return object
         */
        function getList (page, size, sortColumn, sortDirection, serviceProviderId, filters) {

            var params = buildPaginationParamsForRequest(page, size, sortColumn, sortDirection, serviceProviderId, filters);

            if (serviceProviderId) {
                params.spId = serviceProviderId;
            }

            if (filters) {
                params.filters = filters;
            }

            return RuleFactory.all('rules').customGET('', params);
        }

        /**
         * Builds the pagination params needed for the request
         * @param page integer
         * @param size integer
         * @param sortColumn string
         * @param sortDirection string
         * @return object
         */
        function buildPaginationParamsForRequest(page, size, sortColumn, sortDirection) {

            if (page >= 1) {
                // Page decremented because 0 is first page.
                page--;
            }

            var params = {
                "page": page,
                "size": size
            };

            if (sortColumn && sortDirection) {

                if (sortColumn instanceof Array) {

                    var len     = sortColumn.length;
                    var columns = [];

                    for (var i = 0; i < len; i++) {
                        columns.push(sortColumn[i] + ',' + sortDirection);
                    }

                    params.sort = columns;
                } else {
                    params.sort = sortColumn + ',' + sortDirection;
                }
            }

            return params;
        }

        /**
         * Delete a Rule from the Database.
         * @param ruleItem
         * @return JSON
         */
        function deleteRule(ruleItem) {

            return RuleFactory.one('rules', ruleItem.id).remove();
        }
        
    }
})();