import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class UsernameNotTakenValidator implements AsyncValidator {
   constructor(private authService: AuthService) {}

   validate(
      ctrl: AbstractControl
   ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return this.authService.lookupUser(ctrl.value).pipe(
         map(res => {
            console.log(res);
            if(res){
               return { usernameTaken: true }
            } else {
               return null;
            }
            //res ? { usernameTaken: true } : null;
         }),
         catchError(() => null)
      );
   }
}
