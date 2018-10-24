import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateService } from '../validate.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   constructor(public activeModal: NgbActiveModal,
               private fb: FormBuilder,
               private validateService: ValidateService) {
   }

   ngOnInit() {
      this.buildForm();
   }

   buildForm() {
      this.loginForm = this.fb.group({
         usernameOrEmail: ['', Validators.required],
         password: ['', Validators.required]
      });
      this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
   }

   onValueChanged(data?: any) {
   }

   // used by the html to determine whether to show errors or not by changing
   // the form field's class
   setValidOrInvalidInput(field: string) {
      return {
         'is-invalid': this.formErrors[field]
      }
   }

   onLoginSubmit() {
      console.log(this.loginForm);
   }

   formErrors = {
      'usernameOrEmail': '',
      'password': ''
   };
}
