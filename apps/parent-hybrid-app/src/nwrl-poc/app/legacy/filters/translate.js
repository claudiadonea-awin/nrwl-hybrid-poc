(function () {
    'use strict';

    angular.module('CommissionSharing')
        .filter('translate', translateFilter);

    translateFilter.$inject = ['DwinAdapter'];

    function translateFilter (DwinAdapter) {

        return function (key, params) {

            // Ensure that the passed in data is a string
            if (typeof key !== "string") {
                return key;
            } else {

                if (Array.isArray(params)) {
                    return DwinAdapter.translate(key, params);
                } else {
                    return DwinAdapter.translate(key);
                }
            }
        }
    }
})();
