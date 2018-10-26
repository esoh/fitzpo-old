import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../users/shared/user.model';
import { HttpErrorHandlerService } from '../core/http-error-handler.service';

import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface AuthResponse {
   success: boolean;
   msg: string;
};

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private baseUrl = environment.baseUrl;

   constructor(private http: HttpClient,
               private httpErrorHandlerService: HttpErrorHandlerService) { }

   registerUser(user: User): Observable<AuthResponse>{
      return this.http.post<AuthResponse>(this.baseUrl + '/users/register', user, httpOptions)
         .pipe(
            retry(3),
            catchError(this.httpErrorHandlerService.handleError<AuthResponse>('registerUser'))
         );
   }

   lookupUser(username: string): Observable<User> {
      return this.http.get<User>(this.baseUrl + '/users/' + username)
         .pipe(
            retry(3),
            catchError(this.httpErrorHandlerService.handleError<User>('lookupUser'))
         );
   }

   emailExists(email: string): Observable<HttpResponse<null>> {
      return this.http.head<null>(this.baseUrl + '/users/emails/' + email, { observe: 'response' })
      .pipe(
         // catchError parameter is a function that takes in an error and returns an observable
         catchError(err => {
            // error status is 404? Pass it along to the email async validator.
            if(err.status && err.status === 404){
               return of(err);
            } else {
               return this.httpErrorHandlerService.handleError<HttpResponse<null>>('emailExists')(err);
            }
         })
      );
   }
}
