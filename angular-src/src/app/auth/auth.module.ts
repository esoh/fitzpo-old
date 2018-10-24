import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { EntryModalService } from './entry-modal.service';
import { ValidateService } from './validate.service';
import { UsernameNotTakenValidator } from './validators/username-not-taken.validator';
import { EmailNotTakenValidator } from './validators/email-not-taken.validator';

@NgModule({
   declarations: [
      LoginComponent,
      SignupComponent
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule
   ],
   providers: [
      ValidateService,
      UsernameNotTakenValidator,
      EmailNotTakenValidator
   ],
   entryComponents: [
      LoginComponent,
      SignupComponent
   ]
})
export class AuthModule { }
