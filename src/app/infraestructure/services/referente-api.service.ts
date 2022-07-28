import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiManagerService } from './api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ReferenteApiService {
  apiUrl: string = environment.transporte_endPoint
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient , private _api: ApiManagerService) { }

  getConstantes(id:string) {
    return this.http.get(`${this.apiUrl}`+ 'constantes/'+id);
  }

  getDependencias() {
    return this.http.get(`${this.apiUrl}`+ 'listarDependenciasDirector');
  }


  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }



}
