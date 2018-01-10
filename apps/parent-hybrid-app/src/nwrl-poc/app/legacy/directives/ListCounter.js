(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('listCounter', ListCounter);

    ListCounter.$inject = ['$filter'];

    function ListCounter ($filter) {

        return {
            restrict: 'A',
            controller: ListCounterController
        };

        function ListCounterController ($scope, $element, $attrs) {

            var translateFilter = $filter('translate');
            var vm              = $scope.ruleListController;

            this.showUpdatedCounter = showUpdatedCounter;
            this.getItemCountStart = getItemCountStart;
            this.getItemCountEnd = getItemCountEnd;

            $scope.$watchGroup([function () {
                return vm.page;
            }, function () {
                return vm.pageSize;
            }, function () {
                return vm.totalItems;
            }], showUpdatedCounter);

            function showUpdatedCounter () {

                var start         = getItemCountStart(vm.page, vm.pageSize, vm.totalPages);
                var end           = getItemCountEnd(vm.page, vm.pageSize, vm.totalItems);
                var totalItems    = vm.totalItems;

                if (totalItems > 0) {
                    $element.text(translateFilter('commission-sharing.showingItemsOfTotal', [start, end, vm.totalItems]));
                }
            }

            /**
             * Gets the starting item from the current page and page size variables.
             *
             * @param int page
             * @param int pageSize
             * @return int
             */
            function getItemCountStart (page, pageSize, totalPages) {

                if (page === 1) {
                    return 1;
                }

                if (page === totalPages) {
                    return pageSize * (totalPages - 1) + 1;
                }

                return (page - 1) * pageSize + 1;
            }

            function getItemCountEnd (page, pageSize, totalItems) {
                var estTotal = page * pageSize;

                if (estTotal > totalItems) {
                    return totalItems;
                }

                return estTotal;
            }
        }
    }
})();
