import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../../../../../src/app/infraestructure/services/api.service";
@Component({
  selector: "app-bandeja-tarea-directivo",
  templateUrl: "./bandeja-tarea-directivo.component.html",
  styleUrls: ["./bandeja-tarea-directivo.component.scss"],
})
export class BandejaTareaDirectivoComponent implements OnInit {
  public form: FormGroup;
  public arraySolicitudes: any;
  @Output() BandejaEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      initial_date_services: [""],
      final_date_services: [""],
      initial_date_request: [""],
      final_date_request: [""],
      start_time_services: [""],
      final_time_services: [""],
      state: [""],
      request_id: [""],
      journey: [""],
      source: [""],
      destiny: [""],
    });
  }

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
      codSolicitud: "",
      nomUsuarioResponsable: "",
    };

    // prueba
    this.api.getListarTareas(data).subscribe((values2) => {
    });
  }

  search() {
    // let data = {
    //   placaVehiculo: this.form.get("vehicle_plate")?.value,
    //   idEstadoVehiculo: this.form.get("state")?.value,
    //   idConductor: this.form.get("driver")?.value,
    // };

    this.BandejaEvent.emit(this.form.value);

    // this.serviceTransporte.buscarVehiculos(data).subscribe((values2) => {
    //   console.log(values2);
    //   // pasar dato de la busqueda al componente padre

    // });
  }
}
