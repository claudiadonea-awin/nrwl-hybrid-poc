(function () {
    'use strict';

    angular
        .module('CommissionSharing')
        .run(RestangularRequestInterceptor);

    RestangularRequestInterceptor.$inject = ['Restangular', 'JwtModel'];

    /**
     * Every request will be intercepted by this function. Its purpose
     * is to add the authorization header if a JWT exists for the user.
     */
    function RestangularRequestInterceptor (Restangular, JwtModel) {

        Restangular.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {

            var jwt = JwtModel.get();

            if (jwt !== null) {
                headers['Authorization'] = 'Bearer ' + jwt;
            }

            /**
             * If we are performing a put request and we do not already have an If-Match header then
             * add one if the current resource has an etag property.
             */
            if (operation === 'put') {
                if (headers['If-Match'] === undefined && element.etag !== undefined) {
                    headers['If-Match'] = element.etag;
                }
            }

            return {
                element: element,
                params: params,
                headers: headers,
                httpConfig: httpConfig
            };
        });
    }

})();
