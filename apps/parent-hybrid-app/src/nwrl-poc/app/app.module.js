import angular from 'angular'
import uirouter from 'angular-ui-router'

import routes from './app.routes'
import {commissionRulesComponent} from './commission-rules';

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { UpgradeModule } from '@angular/upgrade/static';

// angular.bootstrap(document.body, ['nwrl-poc'], { strictDi: true });

angular.module('nwrl-poc', [uirouter, commissionRulesComponent])
  .config(routes);

