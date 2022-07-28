import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudesService } from "src/app/infraestructure/services/solicitudes.service";
import { ApiService } from "src/app/infraestructure/services/api.service";

@Component({
  selector: 'app-gestion-solicitud-servicio-programador',
  templateUrl: './gestion-solicitud-servicio-programador.component.html',
  styleUrls: ['./gestion-solicitud-servicio-programador.component.scss']
})
export class GestionSolicitudServicioProgramadorComponent implements OnInit {
  public form: FormGroup;
  public arrayVehiculo: any;
  public vehiculo: any;
  filas: any;

  constructor(    private fb: FormBuilder,
    public serviceTransporte: SolicitudesService,
    private api: ApiService) {
    this.form = this.fb.group({
      contractor: ["", Validators.required],
      driver: ["", Validators.required],
      license_plate: ["", Validators.required],
      observation: ["", Validators.required],
    });
   }

  ngOnInit(): void {

    
    let data = {
      idDisponibilidad: "28",
      esRutaDirectiva: "",
      tipoTransporte: "",
    };

     // placa
     this.api.getVehiculos(data).subscribe((values2) => {
      this.arrayVehiculo = values2;
      
    });
  }
  selectRadio(item?: any) {}
  send(){
    
  }
}
