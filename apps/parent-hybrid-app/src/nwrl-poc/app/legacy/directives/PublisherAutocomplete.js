(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .directive('publisherAutocomplete', PublisherAutocomplete);

    PublisherAutocomplete.$inject = ['$rootScope', 'PublisherService'];

    /**
     * Show the found Publisher name in the autocomplete text input dropdown.
     * @constructor
     */
    function PublisherAutocomplete($rootScope, PublisherService) {

        var minCharacterWarning;
        var noResultsWarning;

        return {
            restrict: 'EA',
            require: 'uiSelect',
            link: PublisherAutocompleteLink,
            controller: PublisherAutocompleteCtrl
        };

        /**
         * @param $scope
         * @param $element
         * @param $attrs
         */
        function PublisherAutocompleteLink ($scope, $element, $attrs, $select) {

            $rootScope.partnerPublisherTouched = false;

            // There is a bug with the ui-select 2 multiple dropdown where the touched
            // flag doesn't get set to true until the second focus.
            // This affects validation messages showing at the correct times.
            $element.on('blur', 'input.ui-select-search', function() {
                minCharacterWarning.hide();
                noResultsWarning.hide();

                $rootScope.partnerPublisherTouched = true;
            });

            $scope.$watch(function () { return $select.open; }, watchingForFocusOn);

            minCharacterWarning = $element.parent().find('#min-characters');
            noResultsWarning    = $element.parent().find('#no-results');

            function watchingForFocusOn () {

                if ($select.open === true && $select.search.length < 2) {
                    minCharacterWarning.show();
                }
            }
        }

        /**
         *
         * @param $scope
         * @constructor
         */
        function PublisherAutocompleteCtrl ($scope) {

            $scope.searchForPublishers = searchForPublishers;
            $scope.getPublishers       = getPublishers;
            
            var vm = this;

            vm.searchForPublishers = searchForPublishers;
            vm.getPublishers       = getPublishers;
            vm.publishers          = [];

            /**
             * @param term string
             */
            function searchForPublishers (term) {

                vm.publishers = [];

                if (!term || term.length < 2) {
                    return;
                }

                minCharacterWarning.hide();
                noResultsWarning.hide();
                
                PublisherService
                    .getPublishers(term)
                    .then(searchForPublishersSuccess);
            }

            /**
             * The success callback for the call to search for publishers.
             * @param rsp
             */
            function searchForPublishersSuccess (rsp) {

                if (rsp.data && rsp.data.length) {
                    vm.publishers = rsp.data;
                } else {
                    noResultsWarning.show();
                }
            }

            function getPublishers () {
                return vm.publishers;
            }
        }
    }

})();