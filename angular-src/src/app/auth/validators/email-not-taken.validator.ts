import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class EmailNotTakenValidator implements AsyncValidator {
   constructor(private authService: AuthService) {}

   validate(
      ctrl: AbstractControl
   ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return this.authService.emailExists(ctrl.value).pipe(
         map(res => {
            // check for error handling
            if(!res || !res.status){
               return { 'unknown': true };
            }

            if(res.status === 200){
               return { 'taken': true };
            } else if(res.status === 404){
               return null;
            } else {
               return { 'unknown': true };
            }
         }),
         catchError(() => null)
      );
   }
}
