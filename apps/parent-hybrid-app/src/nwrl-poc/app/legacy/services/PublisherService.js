(function () {
    "use strict";

    angular
        .module('CommissionSharing')
        .service('PublisherService', PublisherService);

    PublisherService.$inject = ['$http', 'DwinAdapter'];

    function PublisherService($http, DwinAdapter) {

        return {
            getPublishers: getPublishers,
            getPublisherNames: getPublisherNames
        };

        /**
         * Fetch the publisher names given a valid pId.
         * @param search
         */
        function getPublishers(search) {

            return $http({
                url: '/awin/affiliate/' + DwinAdapter.getLinkedAccountId() + '/commission-sharing/xhr-publisher-partners',
                method: 'GET',
                params: {search: search},
                headers: {'Content-Type': 'application/json'}
            });
        }


        /**
         * Fetch the publisher names given a valid pId.
         * @param pId
         */
        function getPublisherNames(publishers) {

            // Filter out duplicates
            var filter = function (value, index) {
                return this.indexOf(value) == index
            };

            return $http({
                url: '/awin/affiliate/commission-sharing/xhr-publisher-names',
                method: 'GET',
                params: {"publishers[]": publishers.filter(filter, publishers)},
                headers: {'Content-Type': 'application/json'}
            });
        }
    }
})();
