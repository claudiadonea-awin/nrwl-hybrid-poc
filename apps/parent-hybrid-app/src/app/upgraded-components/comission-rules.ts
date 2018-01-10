import { Directive, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'test-comission'
})
export class commissionRulesDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('commissionRulesComponent', elementRef, injector);
  }
}
