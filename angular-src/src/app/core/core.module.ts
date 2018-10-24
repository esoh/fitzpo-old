import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { NavbarComponent } from './navbar/navbar.component';

import { HttpErrorHandlerService } from'./http-error-handler.service';
import { EntryModalService } from '../auth/entry-modal.service';
import { AuthService } from '../auth/auth.service';

@NgModule({
   declarations: [
      NavbarComponent
   ],
   imports: [
      CommonModule,
      RouterModule,
      NgbModule,
      HttpClientModule
   ],
   providers: [
      HttpErrorHandlerService,
      AuthService,
      EntryModalService
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
