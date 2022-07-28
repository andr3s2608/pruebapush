import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from './http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  constructor(protected _http: HttpHandlerService) { }

  public get(endpoint: string, payload = {}, opt?: { body?: any; headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<any> {
    return this._http.get(endpoint, payload, opt);
  }

  public getList(endpoint: string, payload = {}, payload1={}): Observable<any> {

    return this._http.get(endpoint, payload, payload1);
  }

  public post(endpoint: string, payload = {}, opt?:{body?: any; headers?: HttpHeaders | {[header: string]: string | string[]}}): Observable<any> {
    return this._http.post(endpoint, payload, opt);
  }


  public put(endpoint: string, payload = {}): Observable<any> {
    return this._http.put(endpoint, payload);
  }

  public delete(endpoint: string, payload = {}): Observable<any> {
    return this._http.delete(endpoint, payload);
  }

}
