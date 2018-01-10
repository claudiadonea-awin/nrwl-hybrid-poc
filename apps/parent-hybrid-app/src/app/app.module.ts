import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { configureNwrlPoc, upgradedComponents } from '../nwrl-poc-setup';
import { UpgradeModule } from '@angular/upgrade/static';
import { commissionRulesDirective } from './upgraded-components/comission-rules';
@NgModule({
  imports: [BrowserModule, NxModule.forRoot(), UpgradeModule],
  declarations: [
    AppComponent,
    commissionRulesDirective, 
    ...upgradedComponents],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap(): void {
    configureNwrlPoc(this.upgrade.injector);
    this.upgrade.bootstrap(document.body, ['downgraded', 'nwrl-poc']);
  }
}
