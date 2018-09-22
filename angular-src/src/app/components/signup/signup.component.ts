import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   name: String;
   username: String;
   email: String;
   password: String;

   constructor(private validateService: ValidateService) { }

   ngOnInit() {
   }

   onRegisterSubmit() {
      const user = {
         name: this.name,
         username: this.username,
         email: this.email,
         password: this.password
      }

      // required fields
      if(!this.validateService.validateSignup(user)){
         console.log("Please fill in all fields");
         return false;
      }

      // validate email
      if(!this.validateService.validateEmail(user.email)){
         console.log("Please use a valid email");
         return false;
      }

   }

}
