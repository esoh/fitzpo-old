import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class EntryModalService extends NgbModal{

   openLogin(){
      super.open(LoginComponent, { windowClass : "entry-dialog" })
         .result.then(
            (result) => {
            }, (reason) => {
               if(reason == 'signup'){
                  this.openSignup();
               }
            }
         );
   }

   openSignup(){
      super.open(SignupComponent, { windowClass : "entry-dialog" })
         .result.then(
            (result) => {
            }, (reason) => {
               if(reason == 'login'){
                  this.openLogin();
               }
            }
         );
   }
}
