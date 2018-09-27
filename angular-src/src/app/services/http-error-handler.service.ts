import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

   constructor() {
   }

   /**
      * @param serviceName: name of the data service
      * @param operation: name of the failed operation
      * @param result: optional value to return as the observable result
    */

   handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

         // todo: send the error to remote logging infrastructure
         console.error(error); // log to console instead

         // todo: better job of transforming error for user consumption
         console.log(`${operation} failed: ${error.message}`);

         // let the app keep running by returning an empty result.
         return of(result as T);
      };
   }
}
