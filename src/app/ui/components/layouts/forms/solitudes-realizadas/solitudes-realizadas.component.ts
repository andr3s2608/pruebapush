import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/infraestructure/services/api.service";

@Component({
  selector: "app-solitudes-realizadas",
  templateUrl: "./solitudes-realizadas.component.html",
  styleUrls: ["./solitudes-realizadas.component.scss"],
})
export class SolitudesRealizadasComponent implements OnInit {
  public form: FormGroup;
  
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
      responsible_users: [""],
    });
  }

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
  }

  search() {
    this.BandejaEvent.emit(this.form.value);
  }
}
