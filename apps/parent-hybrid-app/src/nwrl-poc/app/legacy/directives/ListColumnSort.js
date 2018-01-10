(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('listColumnSort', ListColumnSort);

    ListColumnSort.$inject = ['$document'];

    function ListColumnSort ($document) {

        var SORT_TYPE_ASC  = 'asc';
        var SORT_TYPE_DESC = 'desc';

        var SORT_ASC_CLASS  = 'sortAscending';
        var SORT_DESC_CLASS = 'sortDescending';

        return {
            restrict: 'AC',
            link: sort
        };

        function sort ($scope, element, attrs) {
            $scope.sortColumn = sortColumn;

            /**
             * This will trigger when the user actions the sort.
             *
             * @param column Name of column we are sorting
             */
            function sortColumn (column) {
                var currentSortDirection = toggleSortTypeClass(column);

                // Set the column and direction to the vm and call refreshList again
                $scope.ruleListController.column = column;
                $scope.ruleListController.sort   = currentSortDirection;
                $scope.ruleListController.page   = 1;
                $scope.ruleListController.refreshList({});
            }

            /**
             * Removes the classes from all the headers and applied the correct class to 
             * the header that has been clicked.
             *
             * @param  string column
             * @return string
             */
            function toggleSortTypeClass (column) {
                var spanElement      = angular.element($document[0].querySelector('#col-rule-' + column.replace('.', '-')));
                var allSpanElements  = angular.element($document[0].querySelectorAll('span[id*="col-rule-"]'));
                var newSortDirection = getSortDirection(spanElement);

                allSpanElements.removeClass(SORT_ASC_CLASS);
                allSpanElements.removeClass(SORT_DESC_CLASS);

                var classToAdd = (newSortDirection == SORT_TYPE_DESC) ? SORT_DESC_CLASS : SORT_ASC_CLASS;

                spanElement.addClass(classToAdd);

                return newSortDirection;
            }

            /**
             * Takes an element and returns what direction the order should be listed in.
             *
             * @param angular.element
             */
            function getSortDirection (element) {
                var sortTypeOfAsc    = element.hasClass(SORT_ASC_CLASS);
                var sortTypeOfDesc   = element.hasClass(SORT_DESC_CLASS);
                var newSortDirection = SORT_TYPE_ASC;

                if (sortTypeOfAsc) {
                    newSortDirection = SORT_TYPE_DESC;
                } else if (sortTypeOfDesc) {
                    newSortDirection = SORT_TYPE_ASC;
                }

                return newSortDirection;
            }
        }
    }
})();
