import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { EntryModalService } from '../services/entry-modal.service';

@NgModule({
   declarations: [
      LoginComponent,
      SignupComponent
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule
   ],
   entryComponents: [
      LoginComponent,
      SignupComponent
   ]
})
export class AuthModule { }
