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
  selector: "app-ajuste-solicitud-servicios",
  templateUrl: "./ajuste-solicitud-servicios.component.html",
  styleUrls: ["./ajuste-solicitud-servicios.component.scss"],
})
export class AjusteSolicitudServiciosComponent implements OnInit {
  show: boolean = false;
  identificador?: string;
  procesoInstancia?: string;
  flag?: string;
  formClerk: any;
  formApplication: any;
  unlock: boolean = false;
  public form4: FormGroup;
  requestFormload: any;
  funcionario: any;
  taskId: any;
  nameUser: any;

  funcionariologin:any;
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
    let correoUsuario = localStorage.getItem("email");

    let data = {
      correo: correoUsuario,
    };

    let idfuncionario = 0;
    let email = '';
    this.api.BusquedaFcorreo(data).subscribe((values) => {
      email = values.correoElectronico;
      idfuncionario = values.id;
      this.funcionario = idfuncionario;
      this.funcionariologin = email;
    });
    this.nameUser = localStorage.getItem("email");
    this.procesoInstancia = this.route.snapshot.params["processid"];
    this.taskId = this.route.snapshot.params["taskId"];
    this.identificador = this.route.snapshot.params["id"];
    this.consultarInformacion();
  }

  send() {
    this.actualizarSolicitud();
    this.flag = "Asignada"
    this.Actualizarvariables("25");
    this.updateVariableParametersBPM(this.taskId,"Asignada",this.procesoInstancia);
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


  actualizarSolicitud(){
    
    let newArray:any[]=[];
    console.log("entro al metodo", this.formApplication);
    const { form1, form2, form3 } = this.formApplication;

    console.log("formulario 1", form1);
    console.log("formulario 2", form2);
    console.log("formulario 3", form3);

    //convertir array
    /**if (form2.dynamic.length > 0) {
      newArray = form2.dynamic.map((item: any) => {
        return {
          descripcion: item.destination_place,
          horaRegreso: item.return_time,
        };
      });
    }*/
    console.log("formulario 2" ,form2)

      newArray.push({
        descripcion: form2.destination_place,
        horaRegreso: form2.return_time,
       })

    /*for (let index = 0; index < form2.length; index++) {
      newArray.push({
        descripcion: form2[index].destination_place,
        horaRegreso: form2[index].return_time,
       })
      
    }*/
    
    /*newArray = form2.dynamic.map((item: any) => {
    console.log("lugar destino formulario2",item.destination_place,item.return_time)
      return {
        descripcion: item.destination_place,
        horaRegreso: item.return_time,
      };
    });
    */
    //convertir array 2
    let newArray2 = this.formClerk.dynamic.map((item: any) => {
      return {
        nombre: item.name_user,
        celular: item.movil,
        correoElectronico: item.email_user,
        usuarioResponsableId: 0,
      };
    });
    let datacombination = {
      nombre: this.formClerk.name_user,
      celular: this.formClerk.movil,
      correoElectronico: this.formClerk.email_user,
      usuarioResponsableId: 1,
    };
    let data = {
      tramiteId: 0,
      tipoTransporteId: form1.type_Transport,
      cantidadPasajeros: form1.number_passengers,
      estadoId: 7,
      solicitudAjustadaId: 0,
      funcionarioCreadorId: this.funcionario,
      tipoServicioId: form1.Type_service,
      lugarSalida: form2.place_departure,
      fechaPrestacionServicio: form3.date_service,
      horaSalida: form3.departure_time2,
      horaRegreso: form3.return_time2,
      dependenciaId: form1.dependence,
      directorJefeDependenciaId: form1.principal_id,
      justificacion: this.formClerk.justificacion_user,
      lugarDestino:newArray ?? form2.destination_place,
      usuarioServicio: newArray2.concat(datacombination),
    };

  
     this.serviceTransporte.AjustarSolicitud(data ,this.taskId+"").subscribe(values=>{
      this.router.navigate(['/menu'])
   })
   
  console.log(data)

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
