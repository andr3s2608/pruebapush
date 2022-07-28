import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  constructor(
    private _httpClient: HttpClient
  ){}

  public get (url: string, params: any, options?: {}) : Observable<any> {
    return this.requestHelper(url, params, null, 'GET', options);
  }
  /*   public get1 (url: string, params: any, params1: any, options?: {}) : Observable<any> {
         return this.requestHelper(url, params, null, 'GET', options);
     }*/

  public post (url: string, body: any, options?: {}) : Observable<any> {
    return this.requestHelper(url, null, body, 'POST', options);
  }

  public put (url: string, body: any, options?: {}) : Observable<any> {
    return this.requestHelper(url, null, body, 'PUT', options);
  }

  public delete (url: string, body: any, options?: {}) : Observable<any> {
    return this.requestHelper(url, null, body, 'DELETE', options);
  }

  requestHelper(url: string, params: any, body: any, method: string, options?: {}): Observable<Response> {

    if (!options) {
      if (body && typeof body !== 'string') {
        body = JSON.stringify(body);
      }
      if (params && typeof params == 'string'){
        params = new HttpParams ({
          fromString: params
        })
      }
      options = {
        body: body,
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa('admin:admin')
        }),
        params: params
      };
    }
    let request$ = this._httpClient.request(method, url, options);

    return this.handleResponse(request$);
  }

  handleResponse(request$: Observable<any>): Observable<any> {
    return request$.pipe(tap((fields: any) => fields),
      catchError(this.handleError<any>(''))
    );
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
