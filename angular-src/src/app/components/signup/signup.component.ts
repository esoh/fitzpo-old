import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   user: any = {};
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
            (isSubmission || control.touched)) {
            valid = false;
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
               this.formErrors[field] += messages[key] + ' ';
            }
         }
      }
      return valid;
   }


   onSignupSubmit() {
      console.log(this.signupForm.value);
      if(!this.isValidForm(true, this.signupForm)) return false
   }

   buildForm() {
      // can't use formbuilder because angular does not support onBlur updates
      // with formbuilder yet
      this.signupForm = new FormGroup ({
         name: new FormControl('', {
            validators: [
               Validators.required,
               Validators.maxLength(70)]
         }),
         username: new FormControl('', {
            validators: [
               Validators.required,
               Validators.maxLength(20)]
         }),
         email: new FormControl('', {
            validators: [
               Validators.required,
               Validators.email,
               Validators.maxLength(255)]
         }),
         password: new FormControl('', {
            validators: [
               Validators.required,
               Validators.minLength(6),
               Validators.maxLength(256)]
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

   validationMessages = {
      'name': {
         'required':       'Name is required.',
         'maxlength':      'Name cannot be more than 70 characters long.'
      },
      'username': {
         'required':       'Username is required.',
         'maxlength':      'Username cannot be more than 20 characters long.'
      },
      'email': {
         'required':       'Email is required.',
         'email':          'Please enter a valid email.',
         'maxlength':      'Email cannot be more than 255 characters long.'
      },
      'password': {
         'required':       'Password is required.',
         'minlength':      'Password must be at least 6 characters long.',
         'maxlength':      'Password cannot be more than 255 characters long.'
      }
   };

}
