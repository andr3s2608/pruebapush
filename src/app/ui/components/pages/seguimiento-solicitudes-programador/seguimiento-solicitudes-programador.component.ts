import { Component, OnInit } from "@angular/core";
import { data } from "jquery";
import { ApiService } from "src/app/infraestructure/services/api.service";
import { SolicitudesService } from "src/app/infraestructure/services/solicitudes.service";
import { Headers1 } from "src/app/infraestructure/utils/cabezeras.constants";

@Component({
  selector: "app-seguimiento-solicitudes-programador",
  templateUrl: "./seguimiento-solicitudes-programador.component.html",
  styleUrls: ["./seguimiento-solicitudes-programador.component.scss"],
})
export class SeguimientoSolicitudesProgramadorComponent implements OnInit {
  headers: any = Headers1;
  solicitudes: any;
  referente:any;
  rol_programador: any;
  constructor(
    private api: ApiService
  ) {}

  
  ngOnInit(): void {
    let data = {
      processDefinitionId:"",  
      idUsuario:"",
      fechaSolicitudInicial:"",
      fechaSolicitudFinal:"",
      fechaServicioInicial:"",
      fechaServicioFinal:"",
      horaServicioInicial:"",
      horaServicioFinal:"",
      idEstado:"",
      codSolicitud:"",
      nomUsuarioResponsable:""
    };
    this.rol_programador = this.api.getListarTareas(data);
  }


   getSearch(formValue: any) {
   
    let data = {
      processDefinitionId:"",  
      idUsuario:"",
      fechaSolicitudInicial:formValue.initial_date_services,
      fechaSolicitudFinal:formValue.final_date_services,
      fechaServicioInicial:formValue.initial_date_request,
      fechaServicioFinal:formValue.final_date_request,
      horaServicioInicial:formValue.start_time_services,
      horaServicioFinal:formValue.final_time_services,
      idEstado:formValue.state,
      codSolicitud:formValue.request_id,
      nomUsuarioResponsable:formValue.referrer
    };
    this.rol_programador = this.api.getListarTareas(data);
  }
}
