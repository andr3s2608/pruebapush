import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SolicitudesService } from "src/app/infraestructure/services/solicitudes.service";
import { ApiService } from "src/app/infraestructure/services/api.service";

@Component({
  selector: "app-solicitud-realizadas-programador",
  templateUrl: "./solicitud-realizadas-programador.component.html",
  styleUrls: ["./solicitud-realizadas-programador.component.scss"],
})
export class SolicitudRealizadasProgramadorComponent implements OnInit {
  public form: FormGroup;
  @Output() BandejaEvent = new EventEmitter<string>();
  public arrayVehiculo: any;
  public arrayConductor: any;
  public arrayReferente: any;
  public arrayEstado: any;
  public arryDependencia: any;
  public arraySolicitudes: any;
  constructor(
    private fb: FormBuilder,
    public serviceTransporte: SolicitudesService,
    private api: ApiService
  ) {
    this.form = this.fb.group({
      initial_date_services: [""],
      final_date_services: [""],
      initial_date_request: [""],
      final_date_request: [""],
      state: [""],
      request_id: [""],
      vehicle: [""],
      referrer: [""],
      driver: [""],
      dependence: [""],
    });
  }
  ngOnInit(): void {

    let dataprogramador = {
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

    let data = {
      placaVehiculo: "",
      idEstadoVehiculo: "",
      idConductor: "",
    };

  // placa
    this.serviceTransporte.buscarVehiculos(data).subscribe((values2) => {
      this.arrayVehiculo = values2;
    });

    //Referentes
    this.api.ListarReferenes().subscribe((values2) => {
      this.arrayReferente = values2;
    });

    // dependencias
    this.api.ListarDependencia().subscribe((values2) => {
      this.arryDependencia = values2;
    });

    //  conductores
    this.serviceTransporte.getTodoConductor().subscribe((values2) => {
      this.arrayConductor = values2;
    });
  }

  search() {
    this.BandejaEvent.emit(this.form.value);
  }
}
