import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProcessRequestDTO } from "../interfaces/request/ProcessRequestDTO";
import { ProcessResponseDTO } from "../interfaces/request/ProcessResponseDTO";
import { RequestParamsDTO } from "../interfaces/request/RequestParamsDTO";
import { ApiManagerService } from "./api-manager.service";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiBpmService {
  httpOptions: any;

  urlEstados: string =
    "http://bpm-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds/bpm-api/v1/processes/task/modifyStatus";

  urlVariables: string =
    "http://bpm-api-des-sds-solicitudtransportabilidad.apps.openshiftdev.soain.lcl/sds/bpm-api/v1/processes/updatevariables";

  constructor(private _api: ApiManagerService, private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          "Basic " +
          btoa(localStorage.getItem("email") + ":" + "Transportabilidad.2022"),
      }),
    };
  }

  listarTareas(request?: ProcessRequestDTO): Observable<ProcessResponseDTO> {
    const endpoint = environment.tarea_endPoint + "task/dasboard";
    return this._api.get(endpoint, request);
  }

  cambiarEstadoTarea(request: RequestParamsDTO): Observable<any> {
    let estadotarea = this.urlEstados;
    return this.http.put<any>(estadotarea, request, this.httpOptions);
  }

  actualizarVariable(request: ProcessRequestDTO): Observable<any> {
    let estadovariable = this.urlVariables;
    console.log("endpoint"+estadovariable);
    return this.http.post(estadovariable, request, this.httpOptions);
  }
}
