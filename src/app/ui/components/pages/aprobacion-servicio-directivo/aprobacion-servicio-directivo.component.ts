import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OwnerUserDTO } from "src/app/infraestructure/interfaces/request/OwnerUserDTO";
import { ProcesoDTO } from "src/app/infraestructure/interfaces/request/ProcesoDTO";
import { RequestParamsDTO } from "src/app/infraestructure/interfaces/request/RequestParamsDTO";
import { ValuesDTO } from "src/app/infraestructure/interfaces/request/ValuesDTO";
import { ApiBpmService } from "src/app/infraestructure/services/api-bpm.service";
import { DirectivosService } from "src/app/infraestructure/services/directivos.service";
import { SolicitudesService } from "src/app/infraestructure/services/solicitudes.service";
import { statesTaskActions } from "src/app/infraestructure/utils/estados.contants";
import { ApiService } from "../../../../infraestructure/services/api.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-aprobacion-servicio-directivo",
  templateUrl: "./aprobacion-servicio-directivo.component.html",
  styleUrls: ["./aprobacion-servicio-directivo.component.scss"],
})
export class AprobacionServicioDirectivoComponent implements OnInit {
  show: boolean = false;
  identificador?: string;
  procesoInstancia?: string;
  flag?: string;
  formClerk: any;
  formApplication: any;
  unlock: boolean = true;
  public form4: FormGroup;
  requestFormload: any;
  funcionario: any;
  taskId: any;
  nameUser: any;

  constructor(
    private serviceBPM: ApiBpmService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    public serviceTransporte: SolicitudesService,
    private api: ApiService
  ) {
    this.form4 = this.fb.group({
      observacion: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.nameUser = localStorage.getItem("email");
    this.procesoInstancia = this.route.snapshot.params["processid"];
    this.taskId = this.route.snapshot.params["taskId"];
    this.identificador = this.route.snapshot.params["id"];
    this.consultarInformacion();
  }

  validate() {
    this.show = true;
  }

  reject() {
    this.flag = "rechazada";
    this.Actualizarvariables("21");
    this.updateVariableParametersBPM(this.taskId,"rechazada",this.procesoInstancia);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Solicitud rechazada",
      showConfirmButton: true,
      confirmButtonColor: "#004884",
      confirmButtonText: "Aceptar",
      }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/seguimiento-directivos"]);
      }
      });

  }

  aprove() {
    this.flag = "aprobada"
    this.Actualizarvariables("20");
    this.updateVariableParametersBPM(this.taskId,"aprobada",this.procesoInstancia);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Solicitud aprobada con exito",
      showConfirmButton: true,
      confirmButtonColor: "#004884",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/seguimiento-directivos"]);
      }
    });
  }

  observacion(){
    this.guardarObservacion();

    this.flag = "validarDatos"
    this.Actualizarvariables("23");
    this.updateVariableParametersBPM(this.taskId,"validarDatos",this.procesoInstancia);
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Solicitud rechazada",
      showConfirmButton: true,
      confirmButtonColor: "#004884",
      confirmButtonText: "Aceptar",
      }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/seguimiento-directivos"]);
      }
      });

  }


  updateVariableParametersBPM(id?: string, gestion?: string, proceso?: string) {

    let idtarea = id;
    const callParameters = new RequestParamsDTO();
    callParameters.ownerUser = new OwnerUserDTO();
  callParameters.processId = "SolicitudTransporte.SolicitudTransporte",
    callParameters.containerId = "SolicitudTransporte_1.0.0-SNAPSHOT";
  callParameters.taskId = id,
    callParameters.taskStatus = statesTaskActions.started;
    callParameters.ownerUser.user = "";
    callParameters.ownerUser.password = "";
  callParameters.processInstance = "",
    callParameters.processInstanceId = proceso,
    callParameters.parametros = new ValuesDTO();
    callParameters.parametros.values = {
      "gestionTramiteDirectivo": gestion,
    };

    this.serviceBPM.actualizarVariable(callParameters).subscribe((data) => {

      this.updateParametersBPM(idtarea, proceso);
    });
  }

  updateParametersBPM(id?: string, gestion?: string, proceso?: string) {
    const callParameters = new RequestParamsDTO();
    callParameters.ownerUser = new OwnerUserDTO();
    callParameters.processId = "SolicitudTransporte.SolicitudTransporte",
      callParameters.containerId = "SolicitudTransporte_1.0.0-SNAPSHOT";
    callParameters.taskId = id,
      callParameters.taskStatus = statesTaskActions.completed;
    callParameters.ownerUser.user = "";
    callParameters.ownerUser.password = "";
    callParameters.processInstance = "",
      callParameters.processInstanceId = proceso,
      callParameters.parametros = new ValuesDTO();
    callParameters.parametros.values = {};


    this.serviceBPM.cambiarEstadoTarea(callParameters).subscribe((data) => {
     
    });
  }

  getFuncionarios(formValue: string) {
    console.log(formValue);
    this.formClerk = formValue;
    this.unlockButton();
  }

  getSolicitud(formValue: any) {
    this.formApplication = formValue;
    this.unlockButton();
  }

  unlockButton() {
    if (this.formApplication && this.formClerk) {
      this.unlock = false;
    }
  }

  Actualizarvariables(idEstado: any) {
    let data = {
      idSolicitud: this.identificador + "",
      idEstado: idEstado,
      esSolicitudAjustada: "1",
    };

    this.serviceTransporte.ActualizarSolicitud(data).subscribe((values) => {
      this.router.navigate(["/menu"]);
    });
  }

  guardarObservacion() {
    let data = {
      idSolicitud: this.identificador + "",
      observacion: this.form4.get("observacion")?.value,
      funcionarioId: this.funcionario.funcionarioCreadorId,
    };

    this.api.GuardarObservacion(data).subscribe((values) => {
    
    });
    console.log("se guardo la info");
  }

  consultarInformacion() {
    this.requestFormload = this.serviceTransporte.getSolicitud(this.identificador + "",this.procesoInstancia + ""
    );

    this.serviceTransporte.getSolicitud(this.identificador + "", this.procesoInstancia + "").subscribe((values) => {
        this.funcionario = values;
      });
  }
}
