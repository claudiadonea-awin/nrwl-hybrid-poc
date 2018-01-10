(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .service('RestangularResponseInterceptor', RestangularResponseInterceptor);

    RestangularResponseInterceptor.$inject = [
        '$http',
        'JwtService',
        'JwtModel',
        '$window',
        'ConfigService',
        'DwinAdapter'
    ];

    function RestangularResponseInterceptor ($http, JwtService, JwtModel, $window, ConfigService, DwinAdapter) {
        return {
            'errorInterceptor': errorInterceptor
        };

        function errorInterceptor (response, deferred, responseHandler) {

            if (response.status === 401) {
                if (typeof response.data.error.message !== 'undefined' && response.data.error.message === 'The token has expired') {

                    JwtService
                        .get(JwtModel.get())
                        .then(refreshJwtAndReplyCall, removeJwtAndRedirect);

                    return false;
                }
            }

            if (response.status === 500) {
                var error;
                if (typeof response.data.errors !== 'undefined') {
                    error = response.data.errors;

                    var result = Object.getOwnPropertyNames(error);
                }

                DwinAdapter.showError(
                    DwinAdapter.translate(result[0]),
                    DwinAdapter.translate("js.comission-sharing.fatalError")
                );

                return true;
            }

            /**
             * If the token is successfully refreshed we will receive a new
             * one will will need to assign to local storage and update the
             * Authorization header of all further requests.
             *
             * @param jwtResponse
             */
            function refreshJwtAndReplyCall (jwtResponse) {

                if (typeof jwtResponse.data.jwt != 'undefined') {
                    var jwt = jwtResponse.data.jwt;

                    if (jwt) {
                        JwtModel.set(jwt);

                        if (typeof response.config !== 'undefined') {

                            // Set the new JWT for successive calls
                            response.config.headers.Authorization = 'Bearer ' + jwt;
                            // Repeat current request
                            $http(response.config).then(responseHandler, deferred.reject);
                        }
                    }
                } else {
                    $window.location.href = ConfigService.get('affiliateLogoutUrl');
                }
            }

            /**
             * If the token can not be refreshed we have nothing other to do but
             * to log the user out. All we need to do is make sure the JWT is removed
             * from local storage and redirect them to the same page. Darwin will handle
             * redirecting the user.
             */
            function removeJwtAndRedirect () {
                JwtModel.remove();
                $window.location.href = ConfigService.get('affiliateLogoutUrl');
            }
        }
    }

})();
