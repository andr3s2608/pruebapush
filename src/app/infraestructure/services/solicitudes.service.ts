import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiManagerService } from './api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  apiUrl: string = environment.transporte_endPoint
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  
  constructor(private http: HttpClient , private _api: ApiManagerService) { }


  getSolicitud(id:string,process:string) {
    return this.http.get(`${this.apiUrl}`+ 'solicitud/'+id+'/'+process);
  }

  ActualizarSolicitud(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}` + 'actualizarestadosolicitud' ;
    this.headers.set('Authorization',  'Basic ' + btoa('admin:admin') )

    return this.http
      .put(API_URL, data, { headers: this.headers })
  }

  GuardarSolicitud(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}` + 'guardarSolicitud' ;
    this.headers.set('Authorization',  'Basic ' + btoa('admin:admin') )
    return this.http
      .post(API_URL, data, { headers: this.headers })
  }


  GuardarNovedad(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}` + 'guardarNovedad' ;
    this.headers.set('Authorization',  'Basic ' + btoa('admin:admin') )

    return this.http
      .post(API_URL, data, { headers: this.headers })
  }

  /*GuardarObservacion(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}` + 'guardarObservacion' ;
    return this.http.post(API_URL, data,)
  }*/

  GuardarEncuesta(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}` + 'saveSurvey' ;
    this.headers.set('Authorization',  'Basic ' + btoa('admin:admin') )

    return this.http
      .put(API_URL, data, { headers: this.headers })
  }
  
  AjustarSolicitud(data: any, id:string): Observable<any> {
    let API_URL = `${this.apiUrl}` + 'actualizarSolicitud/'+id ;
  this.headers.set('Authorization',  'Basic ' +    btoa(localStorage.getItem("email") + ":" + "Transportabilidad.2022"))
   return this.http
      .put(API_URL, data,{ headers: this.headers })
  }


  getTodoVehiculos() {
    return this.http.get(`${this.apiUrl}`+ 'search-all-vehicles');
  }

  getTodoConductor() {
    return this.http.get(`${this.apiUrl}`+ 'list-all-drivers');
  }

  buscarVehiculos(data: any) {
    
    let API_URL = `${this.apiUrl}` + 'filter-vehicles';
    return this.http
      .post(API_URL, data, { headers: this.headers })
  }

}
