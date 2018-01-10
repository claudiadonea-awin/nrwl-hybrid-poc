(function () {
    "use strict";

    angular.module('CommissionSharing')
        .service('JwtModel', JwtModel);

    JwtModel.$inject = ['$window'];

    function JwtModel ($window) {

        return {
            get: get,
            set: set,
            remove: remove
        };

        /**
         * Returns the JWT from session storage.
         *
         * @return String
         */
        function get () {

            if ($window.sessionStorage) {
                return $window.sessionStorage.getItem('csrjwt');
            }
        }

        /**
         * Sets the JWT in session storage assigned to the key 'jwt'.
         *
         * @param String jwt
         * @return void
         */
        function set (jwt) {

            if ($window.sessionStorage) {
                $window.sessionStorage.setItem('csrjwt', jwt);
            }
        }

        /**
         * Removes the a JWT from session storage.
         *
         * @return void
         */
        function remove () {

            if ($window.sessionStorage) {
                $window.sessionStorage.removeItem('csrjwt');
            }
        }
    }
})();
