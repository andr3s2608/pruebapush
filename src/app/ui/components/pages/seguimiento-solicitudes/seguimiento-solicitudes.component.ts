import { Component, OnInit } from "@angular/core";
import { Headers1 } from "src/app/infraestructure/utils/cabezeras.constants";
import { ApiService } from "../../../../infraestructure/services/api.service";

@Component({
  selector: "app-seguimiento-solicitudes",
  templateUrl: "./seguimiento-solicitudes.component.html",
  styleUrls: ["./seguimiento-solicitudes.component.scss"],
})
export class SeguimientoSolicitudesComponent implements OnInit {
  headers: any = Headers1;
  rol_referente: any;
  constructor(private api: ApiService) {}

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
    this.rol_referente = this.api.getListarTareas(data);

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
    this.rol_referente = this.api.getListarTareas(data);

  }
}
