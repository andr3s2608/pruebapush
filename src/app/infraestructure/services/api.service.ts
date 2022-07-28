import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHandlerService } from "./http-handler.service";
import { LoginI } from "../models/login.interface";
import { ResponseI } from "../models/response.interface";
import { HttpClient } from "@angular/common/http";
import { UserI } from "../models/user.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  httpOptions: any;

  //Endpoint para el login
  url: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/users/validate";

  //Endpoint para el registo
  urluser: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/users/saveUsuario";

  //Endpoint para actualizar estado vehiculo
  urlstate: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/updateVehicle";

  //Endpoint para guardar ruta directiva
  urldirectiva: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/guardarSolicitudDirectivo";

  //Endpoint para listar solicitudes
  urlSolicitudes: string =
    "http://bpm-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds/bpm-api/v1/processes/queries/listtaskfilter";

  //Endpoint para listar referentes
  urlReferentes: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/funcionarios";

  //Endpoint para listar dependencias
  urlDependencias: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/listarDependenciasDirector";

  //Endpoint para guardar directiva
  urlDirectiva: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/guardarSolicitudDirectivo";

  //Endpoint para listar funcionarios
  urlFuncionarios: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/funcionarios";

  //Endpoint para buscar funcionario por correo
  urlFuncionarioCorreo: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/buscar-funcionario-correo";

  //Endpoint para inciar instancia
  urlInstancias: string =
    "http://bpm-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds/bpm-api/v1/processes/startProcess";

  //Endpoint para guardar una observaciion
  urlObservacion: string =
    "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/guardarObservacion";
  
  //enpoint para actualizar solicitud
  urlUpdateSolicitud: string = "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/";

  //Endpoint para listar vehiculos en programaodr solicitud 
  UrlVehiculos: string = 
  "http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/search-all-vehicles";
  
  //Guardar ruta Directivo
  urlRuta:string="http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/guardarSolicitudDirectivo";
  
  urlAsignar:string="http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/asignarVehiculoSolicitud";

  urlSubcontratado:string="http://solicitud-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds-transportabilidad-solicitud/v1/asignar-vehiculo-subcontratado"

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        //'Authorization': 'Basic ' + btoa("mcuestas:mcuestas"),
        Authorization:
          "Basic " + btoa(environment.usuario + ":" + environment.clave),
      }),
    };
  }
  carroSubcontratado(form: any): Observable<any> {
    let subcontratadoC = this.urlSubcontratado;
    return this.http.post<any>(subcontratadoC, form, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }
  /*constructor(private http: HttpClient) {
    headers = new HttpHeaders().set("Content-Type", "application/json");
  }*/
  asignarCarro(form: any): Observable<any> {
    let carroasignado = this.urlAsignar;
    return this.http.post<any>(carroasignado, form, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }
  loginByEmail(form: LoginI): Observable<any> {
    let direccion = this.url;
    return this.http.post<any>(direccion, form, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }

  BusquedaFcorreo(form: any): Observable<any> {
    let busqueda = this.urlFuncionarioCorreo;
    return this.http.post<any>(busqueda, form, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }

  guardarRutaDirectiva(item: any): Observable<any> {
    let ruutadirectiva = this.urlDirectiva;
    return this.http.post<any>(ruutadirectiva, item, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }


  UpdateState(updateState: any) {
    let stateU = this.urlstate;
    return this.http.put<any>(stateU, updateState, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }

  getListarTareas(data: any): Observable<any> {
    let solicitudes = this.urlSolicitudes;
    return this.http.post<any>(solicitudes, data, {
      headers: new HttpHeaders({
        Authorization:
          "Basic " +
          btoa(localStorage.getItem("email") + ":" + "Transportabilidad.2022"),
      }),
    });
  }

  ListarReferenes(): Observable<any> {
    let referentes = this.urlReferentes;
    return this.http.get<any>(referentes, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }

  ListarDependencia(): Observable<any> {
    let dependicas = this.urlDependencias;
    return this.http.get<any>(dependicas, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }

  ListarFuncionarios(): Observable<any> {
    let funcionarios = this.urlFuncionarios;
    return this.http.get<any>(funcionarios, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }

  EnviarDirectiva(form: any): Observable<any> {
    let directivas = this.urlDirectiva;
    return this.http.post<any>(directivas, form, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }

  IniciarInstancia(form: any): Observable<any> {
    let instancias = this.urlInstancias;
    return this.http.post<any>(instancias, form, this.httpOptions);
  }

  GuardarObservacion(form: any): Observable<any> {
    let observacion = this.urlObservacion;
    return this.http.post<any>(observacion, form, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }

  getVehiculos(data: any): Observable<any> {
    let vehiculosdisponibles = this.UrlVehiculos;
    return this.http.post<any>(vehiculosdisponibles, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    });
  }

}
