import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

   private static readonly maxLength = {
      'name': 70,
      'username': 20,
      'email': 255,
      'password': 256,
      'usernameOrEmail': 255
   };

   private static readonly minLength = {
      'password': 6
   };

   private static readonly validationMessages = {
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

   constructor() {
   }

   public static getValidationMessages(field, errors){
      var messages = [];
      for(const errortype in errors) {
         messages.push(this.validationMessages[field][errortype]);
      }
      return messages;
   }

   public static getLengthValidators(field){
      var validators = [];
      if(this.maxLength.hasOwnProperty(field)){
         validators.push(Validators.maxLength(this.maxLength[field]));
      }
      if(this.minLength.hasOwnProperty(field)){
         validators.push(Validators.minLength(this.minLength[field]));
      }
      return validators;
   }
}
