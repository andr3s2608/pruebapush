import { Component, OnInit } from "@angular/core";
import { SolicitudesService } from "src/app/infraestructure/services/solicitudes.service";
import { Headers2 } from "src/app/infraestructure/utils/cabezeras.constants";
import { ApiService } from "../../../../infraestructure/services/api.service";
@Component({
  selector: "app-administracion-vehiculo-programador",
  templateUrl: "./administracion-vehiculo-programador.component.html",
  styleUrls: ["./administracion-vehiculo-programador.component.scss"],
})
export class AdministracionVehiculoProgramadorComponent implements OnInit {
  headers: any = Headers2;
  respuesta: any;

  isBloqueado = true;
  isDesbloqueado = true;
  stateUpdate = "";
  
  constructor(
    public serviceTransporte: SolicitudesService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    let data = {
      placaVehiculo: "",
      idEstadoVehiculo: "",
      idConductor: "",
    };

    this.respuesta = this.serviceTransporte.buscarVehiculos(data);
  }

  getSearch(formValue: any) {
    let data = {
      placaVehiculo: formValue.vehicle_plate,
      idEstadoVehiculo: formValue.state,
      idConductor: formValue.driver,
    };

    this.respuesta = this.serviceTransporte.buscarVehiculos(data);
  }

  getState(updateState: any) {
    this.stateUpdate = updateState;
    const stateUpdateV = {
      idVehiculo: this.stateUpdate.split(",")[0],
      idEstadoDisponibilidad: this.stateUpdate.split(",")[1],
    };

    // stateUpdateV.idEstadoDisponibilidad = "0"; //EL NUEVO ESTADO

    if (stateUpdateV.idEstadoDisponibilidad == "48") {
      this.isBloqueado = true;
      this.isDesbloqueado = false;
    } else {
      this.isBloqueado = false;
      this.isDesbloqueado = true;
    }
  }

  getBlock(accion?: string) {
    /** Se recibe un objeto con el id del vehivulo y su estado actual
     * Con el estado actual se verifica si ya es bloqueado
     * Is el estado actual de updateData es codifo = 48 se disabled
     */
    // this.isBloqueado;
    const stateUpdateV = {
      idVehiculo: this.stateUpdate.split(",")[0],
      idEstadoDisponibilidad: this.stateUpdate.split(",")[1],
    };

    //Accion
    if (accion == "desbloquear") {
      stateUpdateV.idEstadoDisponibilidad = "49"; //EL NUEVO ESTADO
    }
    if (accion == "bloquear") {
      stateUpdateV.idEstadoDisponibilidad = "48"; //EL NUEVO ESTADO
    }

    this.api.UpdateState(stateUpdateV).subscribe(
      (dataState) => {
        console.log("Filtrar Vehiculos");
        let data = {
          placaVehiculo: "",
          idEstadoVehiculo: "",
          idConductor: "",
        };

        this.respuesta = this.serviceTransporte.buscarVehiculos(data);
      },
      (error) => {
        // console.log("Filtrar Vehiculos");
        // let data = {
        //   placaVehiculo: "",
        //   idEstadoVehiculo: "",
        //   idConductor: "",
        // };

        // this.respuesta = this.serviceTransporte.buscarVehiculos(data);
        window.location.reload();
      }
    );
  }
}
