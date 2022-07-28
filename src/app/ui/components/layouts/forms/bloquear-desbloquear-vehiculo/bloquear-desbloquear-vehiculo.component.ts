import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SolicitudesService } from "src/app/infraestructure/services/solicitudes.service";

@Component({
  selector: "app-bloquear-desbloquear-vehiculo",
  templateUrl: "./bloquear-desbloquear-vehiculo.component.html",
  styleUrls: ["./bloquear-desbloquear-vehiculo.component.scss"],
})
export class BloquearDesbloquearVehiculoComponent implements OnInit {
  public form: FormGroup;
  public arrayVehiculo: any;
  public arrayConductor: any;
  @Output() BandejaEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    public serviceTransporte: SolicitudesService
  ) {
    this.form = this.fb.group({
      initial_date_services: [""],
      final_date_services: [""],
      start_time: [""],
      final_time: [""],
      vehicle_plate: [""],
      state: [""],
      driver: [""],
    });
  }

  ngOnInit(): void {
    let data = {
      placaVehiculo: "",
      idEstadoVehiculo: "",
      idConductor: "",
    };

    // placa
    this.serviceTransporte.buscarVehiculos(data).subscribe((values2) => {
      this.arrayVehiculo = values2;
      console.log("trae info", values2);
    });

    //  conductores
    this.serviceTransporte.getTodoConductor().subscribe((values2) => {
      this.arrayConductor = values2;
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

  resetFormFilter() {
    this.form.get("vehicle_plate")?.setValue("");
    this.form.get("state")?.setValue("");
    this.form.get("driver")?.setValue("");
    this.search();
  }
}
