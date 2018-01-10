(function () {
    'use strict';

    angular.module('CommissionSharing')
        .factory('RuleFactory', RuleFactory);

    RuleFactory.$inject = ['Restangular', 'RestangularResponseInterceptor', 'ConfigService'];

    function RuleFactory (Restangular, RestangularResponseInterceptor, ConfigService) {
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        };

        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer
                .setBaseUrl(ConfigService.get('commissionSharingRuleServiceUrl'))
                .setDefaultHeaders(headers)
                .setErrorInterceptor(RestangularResponseInterceptor.errorInterceptor);
        });
    }
})();
