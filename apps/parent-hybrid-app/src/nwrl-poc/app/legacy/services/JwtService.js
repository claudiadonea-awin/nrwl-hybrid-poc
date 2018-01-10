(function () {
    "use strict";

    angular
        .module('CommissionSharing')
        .service('JwtService', JwtService);

    JwtService.$inject = ['$http', 'ConfigService'];

    function JwtService ($http, ConfigService) {
        return {
            get: get
        };

        /**
         * Calls the endpoint to refresh an expired token.
         *
         * @param  String  jwt - Expired JSON web token
         * @return Promise
         */
        function get () {
            return $http.get(ConfigService.get('jwtEndPoint'));
        }
    }
})();
