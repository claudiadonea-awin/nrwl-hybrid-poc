import angular from 'angular'
import uirouter from 'angular-ui-router'

import routes from './routes.js'
import commissionRulesList from './commission-rules-list/commission-rules-list.component'
import commissionRulesService from './commission-rules-list/commission-rules.service'

export const commissionRulesComponent = angular.module('nwrl-poc.commissionRules', [uirouter])
  .config(routes)
  .component('commissionRulesList', commissionRulesList)
  .service('commissionRulesService', commissionRulesService)
  .name
