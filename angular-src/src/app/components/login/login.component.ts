import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   constructor(private fb: FormBuilder) {
      this.loginForm = fb.group({
         usernameOrEmail: ['', Validators.required],
         password: ['', Validators.required]
      });
   }

   ngOnInit() {

   }

   buildForm() {
      this.loginForm
   }

}
