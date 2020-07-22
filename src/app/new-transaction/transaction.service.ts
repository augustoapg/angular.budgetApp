import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Transaction } from 'src/app/new-transaction/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionUrl : string = 'http://localhost:4242';
  newTransactionUrl : string = this.transactionUrl + '/newTransaction';

  constructor(private http : HttpClient) { }

  postNewTransaction (transaction: Transaction): Observable<string> {
    console.log('postNewTransaction');
    console.log(transaction);
    return this.http.post<string>(this.newTransactionUrl, transaction);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
