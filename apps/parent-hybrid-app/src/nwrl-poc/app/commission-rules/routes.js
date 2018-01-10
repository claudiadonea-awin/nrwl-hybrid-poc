routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
  .state('rules', {
    url: '/',
    template: require('./index.html'),
    resolve: {
      rules: ['commissionRulesService', (commissionRulesService) => {
        return commissionRulesService.getcommissionRules()
      }]
    }
  });
}
