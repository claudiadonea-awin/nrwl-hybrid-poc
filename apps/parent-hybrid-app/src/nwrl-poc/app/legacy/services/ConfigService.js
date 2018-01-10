(function () {
    "use strict";

    angular.module('CommissionSharing')
        .service('ConfigService', ConfigService);

    ConfigService.$inject = ['$location', 'DwinAdapter'];

    function ConfigService ($location, DwinAdapter) {

        var linkedAccountId = DwinAdapter.getLinkedAccountId();

        var environments = {
            dev: {
                host: ".*\\.dev\\.awin\\.com|(.*\\.)?d\\-(lhr1|ber1)\\-docker\\-\\d{3}\\.zanox\\.com",
                config: {
                    commissionSharingRuleServiceUrl: "https://" + $location.host() + "/commission-sharing-rule-service/",
                    jwtEndPoint: "https://" + $location.host() + "/awin/affiliate/" + linkedAccountId + "/commission-sharing/jwt",
                    affiliateLogoutUrl: "https://" + $location.host() + "/awin/affiliate/" + linkedAccountId + "/commission-sharing"
                }
            },
            staging: {
                host: "(.*\\.)?s\\-(lhr1|ber1)\\-docker\\-\\d{3}\\.zanox\\.com",
                config: {
                    commissionSharingRuleServiceUrl: "https://s-lhr1-docker-100.zanox.com",
                    jwtEndPoint: "https://" + $location.host() + "/awin/affiliate/" + linkedAccountId + "/commission-sharing/jwt",
                    affiliateLogoutUrl: "https://" + $location.host() + "/awin/affiliate/" + linkedAccountId + "/commission-sharing"
                }
            },
            prod: {
                host: 'ui.awin.com',
                config: {
                    commissionSharingRuleServiceUrl: "https://ui.awin.com/commission-sharing-rule-service/",
                    jwtEndPoint: "https://ui.awin.com/awin/affiliate/" + linkedAccountId + "/commission-sharing/jwt",
                    affiliateLogoutUrl: "https://ui.awin.com/awin/affiliate/" + linkedAccountId + "/commission-sharing"
                }
            }
        };

        var environment;

        return {
            /**
             * Detect the current environment and return it's settings.
             * Return development if not detectable
             * @returns {*}
             */
            getEnvironment: function () {
                var host = $location.host();
                if(environment){
                    return environment;
                }

                for(var current in environments){
                    var hostRegex = new RegExp(environments[current].host);
                    if(hostRegex.test(host)){
                        environment = current;
                        return current;
                    }
                }

                return 'dev';
            },
            get: function(property){
                if (environments[this.getEnvironment()].config.hasOwnProperty(property)) {
                    return environments[this.getEnvironment()].config[property];
                }
            }
        }
    }
})();
