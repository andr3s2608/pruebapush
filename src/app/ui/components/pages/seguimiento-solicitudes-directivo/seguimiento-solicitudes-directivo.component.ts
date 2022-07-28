import { Component, OnInit } from "@angular/core";
import { Headers1 } from "src/app/infraestructure/utils/cabezeras.constants";
import { ApiService } from "../../../../infraestructure/services/api.service";

@Component({
  selector: "app-seguimiento-solicitudes-directivo",
  templateUrl: "./seguimiento-solicitudes-directivo.component.html",
  styleUrls: ["./seguimiento-solicitudes-directivo.component.scss"],
})
export class SeguimientoSolicitudesDirectivoComponent implements OnInit {
  headers: any = Headers1;
  directivo: any;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    let data = {
      processDefinitionId: "",
      idUsuario: "",
      fechaSolicitudInicial: "",
      fechaSolicitudFinal: "",
      fechaServicioInicial: "",
      fechaServicioFinal: "",
      horaServicioInicial: "",
      horaServicioFinal: "",
      idEstado: "",
      codigo_solicitud: "",
      nomUsuarioResponsable: "",
    };

    this.directivo = this.api.getListarTareas(data);
  }

  getSearch(formValue: any) {
    let data = {
      processDefinitionId: "",
      idUsuario: "",
      fechaSolicitudInicial: "",
      fechaSolicitudFinal: "",
      fechaServicioInicial: "",
      fechaServicioFinal: "",
      horaServicioInicial: "",
      horaServicioFinal: "",
      idEstado: formValue.state,
      codSolicitud: "",
      nomUsuarioResponsable: "",
    };
  }
}
