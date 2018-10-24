import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
   declarations: [
      NavbarComponent
   ],
   imports: [
      CommonModule,
      RouterModule,
      NgbModule
   ],
   exports: [
      NavbarComponent
   ]
})
export class CoreModule {
   constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
   }
}
