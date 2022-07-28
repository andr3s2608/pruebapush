import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiManagerService } from './api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class DirectivosService {
  apiUrl: string = environment.transporte_endPoint
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  
  constructor(private http: HttpClient , private _api: ApiManagerService) { }


  Actualizarvariables(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}` + 'actualizarestadosolicitud' ;
    this.headers.set('Authorization',  'Basic ' + btoa('admin:admin') )

    return this.http
      .put(API_URL, data, { headers: this.headers })
  }

  
}
