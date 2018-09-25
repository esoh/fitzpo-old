import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

import { Observable, throwError } from 'rxjs';
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


   constructor(private http: HttpClient) { }

   registerUser(user: User): Observable<AuthResponse>{
      return this.http.post<AuthResponse>(this.baseUrl + '/users/register', user, httpOptions)
         .pipe(
            retry(3)
            //catchError(this.handleError('registerUser', user))
         );
   }
}
