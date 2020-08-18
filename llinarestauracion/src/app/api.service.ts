import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Item } from './_models/_item';
import { Statistic } from './_models/statistic';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }

  getCases(): Observable<Item[]> {
    return this.http.get<Item[]>(`${apiUrl}`)
      .pipe(
        tap(cases => console.log('fetched cases')),
        catchError(this.handleError('getCases', []))
      );
  }

  getCasesById(id: string): Observable<Item> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => console.log(`fetched cases id=${id}`)),
      catchError(this.handleError<Item>(`getCasesById id=${id}`))
    );
  }

  /*addCases(cases: Item): Observable<Item> {
    return this.http.post<Item>(apiUrl, cases, httpOptions).pipe(
      tap((c: Item) => console.log(`added cases w/ id=${c._id}`)),
      catchError(this.handleError<Item>('addCases'))
    );
  }*/

  updateCases(id: string, cases: Item): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, cases, httpOptions).pipe(
      tap(_ => console.log(`updated cases id=${id}`)),
      catchError(this.handleError<any>('updateCases'))
    );
  }

  deleteCases(id: string): Observable<Item> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Item>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted cases id=${id}`)),
      catchError(this.handleError<Item>('deleteCases'))
    );
  }

  getStatistic(status: string): Observable<Statistic> {
    const url = `${apiUrl}/daily/${status}`;
    return this.http.get<Statistic>(url).pipe(
      tap(_ => console.log(`fetched statistic status=${status}`)),
      catchError(this.handleError<Statistic>(`getStatistic sta49tus=${status}`))
    );
  }

}
