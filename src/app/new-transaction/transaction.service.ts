import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Transaction } from 'src/app/models/Transaction';
import { APIRes } from './APIRes';
import { Category } from '../models/Category';
import { Subcategory } from '../models/Subcategory';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl : string = 'http://localhost:4242';
  newTransactionUrl : string = this.baseUrl + '/newTransaction';
  categoriesUrl : string = this.baseUrl + '/category'
  subcategoryUrl : string = this.baseUrl + '/subcategory'

  constructor(private http : HttpClient) { }

  postNewTransaction (transaction: Transaction): Observable<APIRes> {
    console.log('postNewTransaction');
    console.log(transaction);
    return this.http.post<APIRes>(this.newTransactionUrl, transaction);
  }

  getCategories(): Observable<Category[]> {
    let response = this.http.get<Category[]>(this.categoriesUrl);
    return response;
  }

  getSubcategories(category : string): Observable<Subcategory[]> {
    const reqUrl = this.subcategoryUrl + `/getBy?category=${category}`;
    let response = this.http.get<Subcategory[]>(reqUrl);
    return response;
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
