import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateService } from '../validate.service';
import { AuthService } from '../auth.service';
import { User } from '../../users/shared/user.model';
import { UsernameNotTakenValidator } from '../validators/username-not-taken.validator';
import { EmailNotTakenValidator } from '../validators/email-not-taken.validator';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { first } from 'rxjs/operators';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css'],
   providers: [
      ValidateService,
      UsernameNotTakenValidator,
      EmailNotTakenValidator
   ]
})
export class SignupComponent implements OnInit {

   signupForm: FormGroup;
   isHidden: boolean = true;

   constructor(public activeModal: NgbActiveModal,
               private authService: AuthService,
               private router: Router,
               private usernameValidator: UsernameNotTakenValidator,
               private emailValidator: EmailNotTakenValidator) { }

   ngOnInit() {
      this.buildForm();
   }

   // isSubmission means error will show if this is true, designated to be used
   // when pressing the submit button. The errors will be hidden if the fields
   // haven't been touched un
   isValidForm(isSubmission, form): boolean {
      var valid = true;
      const checkform = form;

      for (const field in this.formErrors) {
         // clear previous error message (if any)
         this.formErrors[field] = '';
         const control = checkform.get(field);
         if(control && !control.valid &&
            (isSubmission || !control.pristine)) {
            valid = false;
            const validationMessages = ValidateService.getValidationMessages(field, control.errors);
            for (var i = 0; i < validationMessages.length; i++) {
               this.formErrors[field] += validationMessages[i] + ' ';
            }
         }
      }
      return valid;
   }


   onSignupSubmit() {
      if(!this.isValidForm(true, this.signupForm)){
         return;
      }

      this.authService.registerUser(this.signupForm.value)
         .pipe(first())// by piping through first/last/etc, the observable gets a finite lifespan
         .subscribe(authResponse => {
            if(!authResponse || !authResponse.success){
               console.log("Something went wrong!");
            } else if(authResponse.success){
               console.log("Registered!")
               this.router.navigate(['/dashboard']);
            }
         });
   }

   // used by the html to determine whether to show errors or not by changing
   // the form field's class
   setValidOrInvalidInput(field: string) {
      return {
         'is-invalid': this.formErrors[field],
         'is-valid': !this.formErrors[field] && this.signupForm.get(field).dirty && !this.signupForm.get(field).pending
      }
   }

   buildForm() {
      // can't use formbuilder because angular does not support onBlur updates
      // with formbuilder yet
      //
      // had to remove onblur because of the following workflow:
      //    field is incorrect, objects below including submit button shifted down by error message
      //    type in correct field, error message still shown
      //    press down on submit button. onblur activates, hides error message,
      //       shifts submit button back up out from under mouse, no longer
      //       under mouse
      //    release mouse click from same position. submit button is not
      //    pressed.
      this.signupForm = new FormGroup ({
         username: new FormControl('', {
            validators:
               ValidateService.getLengthValidators('username').concat([
                  Validators.required
               ]),
            asyncValidators: [this.usernameValidator.validate.bind(this.usernameValidator)]
         }),
         email: new FormControl('', {
            validators:
               ValidateService.getLengthValidators('email').concat([
                  Validators.required,
                  Validators.email
               ]),
            asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)]
         }),
         password: new FormControl('', {
            validators:
               ValidateService.getLengthValidators('password').concat([
                  Validators.required
               ])
         })}, { updateOn: 'blur' });
      this.signupForm.statusChanges.subscribe(data => this.onStatusChanged(data));
      this.onStatusChanged();
   }

   onStatusChanged(data?: any) {
      this.isValidForm(false, this.signupForm);
   }

   formErrors = {
      'username': '',
      'email': '',
      'password': ''
   };


}
