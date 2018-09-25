import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   signupForm: FormGroup;
   constructor() { }

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
      if(!this.isValidForm(true, this.signupForm)) return false
   }

   // used by the html to determine whether to show errors or not by changing
   // the form field's class
   setValidOrInvalidInput(field: string) {
      return {
         'is-invalid': this.formErrors[field],
         'is-valid': !this.formErrors[field] && this.signupForm.get(field).dirty
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
         name: new FormControl('', {
            validators:
               ValidateService.getLengthValidators('name').concat([
                  Validators.required
               ])
         }),
         username: new FormControl('', {
            validators:
               ValidateService.getLengthValidators('username').concat([
                  Validators.required
               ])
         }),
         email: new FormControl('', {
            validators:
               ValidateService.getLengthValidators('email').concat([
                  Validators.required,
                  Validators.email
               ])
         }),
         password: new FormControl('', {
            validators:
               ValidateService.getLengthValidators('password').concat([
                  Validators.required
               ])
         })}, { updateOn: 'blur' });
      this.signupForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
   }

   onValueChanged(data?: any) {
      this.isValidForm(false, this.signupForm);
   }

   formErrors = {
      'name': '',
      'username': '',
      'email': '',
      'password': ''
   };


}
