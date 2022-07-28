import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OwnerUserDTO } from "src/app/infraestructure/interfaces/request/OwnerUserDTO";
import { ProcesoDTO } from "src/app/infraestructure/interfaces/request/ProcesoDTO";
import { ProcessRequestDTO } from "src/app/infraestructure/interfaces/request/ProcessRequestDTO";
import { RequestParamsDTO } from "src/app/infraestructure/interfaces/request/RequestParamsDTO";
import { ValuesDTO } from "src/app/infraestructure/interfaces/request/ValuesDTO";
import { ApiBpmService } from "src/app/infraestructure/services/api-bpm.service";
import { ReferenteApiService } from "src/app/infraestructure/services/referente-api.service";
import { SolicitudesService } from "src/app/infraestructure/services/solicitudes.service";
import Swal from "sweetalert2";
import { ApiService } from "src/app/infraestructure/services/api.service";
@Component({
  selector: "app-pages-solicitud-servicio",
  templateUrl: "./pages-solicitud-servicio.component.html",
  styleUrls: ["./pages-solicitud-servicio.component.scss"],
})
export class PagesSolicitudServicioComponent implements OnInit {
  unlock: boolean = true;
  formApplication: any;
  formClerk: any;
  
  funcionario: any;
  funcionariologin:any;
  guardarResponseSolicitud: any;
  guardarBpmSolicitud: any;
  dias = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  constructor(
    private serviceBPM: ApiBpmService,
    public http: HttpClient,
    public router: Router,
    public serviceTransporte: SolicitudesService,
    private api: ApiService
  ) {}

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
  }

  send() {
    console.log("prueba send");
    // Dia de la semana
    let today = new Date();
    const numeroDia = new Date(today).getDay();
    const nombreDia = this.dias[numeroDia];
    // Detectar hora
    const str = today.toLocaleTimeString("en-US", {
      hour12: false,
    });
    console.log(str);

    switch (nombreDia) {
      case "domingo":
        this.guardarSolicitud();
        //if (str <= "12:00:00") {
          //this.guardarSolicitud();
        //} else {
          //this.unlock = true;
        //}
        break;
      case "lunes":
        this.guardarSolicitud();
        //if (str <= "18:00:00") {
          //this.guardarSolicitud();
        //} else {
         // this.unlock = true;
        //}

        break;
      case "martes":
        this.guardarSolicitud();
        //if (str <= "18:00:00") {
          //this.guardarSolicitud();
        //} else {
          //this.unlock = true;
        //}
        break;
      case "miércoles":
        this.guardarSolicitud();

        // if( str <= "16:00:00" ){
        //   this.guardarSolicitud()
        // }else{
        //   this.unlock = true
        // }
        break;
      case "jueves":
        this.guardarSolicitud();

        // if( str <= "16:00:00" ){
        //   this.guardarSolicitud()
        // }else{
        //   this.unlock = true
        // }
        break;
      case "viernes":
        this.guardarSolicitud();
        // if (str <= "16:00:00") {
        // this.guardarSolicitud();
        //} else {
        // this.unlock = true;
        //}

        break;
      case "sábado":
        this.guardarSolicitud();
        //if (str <= "12:00:00") {
          //this.guardarSolicitud();
        //} else {
          //this.unlock = true;
        //}
        break;

      default:
        break;
    }

    console.log(this.formApplication);
    console.log(this.formClerk);
    // console.log("enviado")
    //this.receiveParametersBPM();
  }

  receiveParametersBPM() {
    const callParameters = new RequestParamsDTO();
    callParameters.ownerUser = new OwnerUserDTO();
    callParameters.processId = "SolicitudTransporte.SolicitudTransporte",
    callParameters.containerId = "SolicitudTransporte_1.0.0-SNAPSHOT";
    callParameters.taskId = "",
    callParameters.taskStatus = "";
    callParameters.ownerUser.user = "";
    callParameters.ownerUser.password = "";
    callParameters.processInstance = "",
    callParameters.processInstanceId = "",
    callParameters.parametros = new ValuesDTO();
    callParameters.parametros.values = {
      idSolicitud: this.guardarResponseSolicitud.idSolicitud+"",
      codSolicitud: this.guardarResponseSolicitud.codigoSolicitud,
      nomEstadoSolicitud:"Asignada", //Esta va fijo 
      idEstadoSolicitud: "25", // Este va fijo
      nomUsuarioResponsable: this.guardarBpmSolicitud.nombre, //campo responsable
      fechaSolicitudText: this.guardarBpmSolicitud.fechaPrestacionServicio+"",
      fechaInicioServicioText: this.guardarBpmSolicitud.fechaPrestacionServicio+"",
      horaInicioServicioText: this.guardarBpmSolicitud.horaSalida+"",
      gestionDirecta: "false",//Este va fijo
      loginUsuario:this.funcionariologin,//Correo logueado
      idTipoServicio:this.guardarBpmSolicitud.tipoServicioId, // tipo servicio
      nomTipoServicio:this.guardarBpmSolicitud.servicio, // nonbre tipo servicio
      idDependencia:this.guardarBpmSolicitud.dependenciaId ,//dependencia
      horaFinServicioText:this.guardarBpmSolicitud.horaRegreso,//hora de regreso
      lugarInicioSolicitud:this.guardarBpmSolicitud.lugarSalida,// lugar de salida
    };


    // this.show=false

    this.api.IniciarInstancia(callParameters).subscribe((data) => {
      console.log("data bpm", this.serviceBPM);
      // this.show=true
      this.router.navigate(["/menu"]);
    });
  }

  getFuncionarios(formValue: string) {
    this.formClerk = formValue;
    console.log("Obtiene Formulario", this.formClerk);
    this.unlockButton();
  }

  getSolicitud(formValue: any) {
    console.log(formValue);
    this.formApplication = formValue;
    this.unlockButton();
  }

  unlockButton() {
    if (this.formApplication && this.formClerk) {
      this.unlock = false;
    }
  }

  Actualizarvariables() {
    // actualizar varibles work
    let data = {
      idSolicitud: "9",
      idEstado: "19",
      esSolicitudAjustada: "1",
    };

    this.serviceTransporte.ActualizarSolicitud(data).subscribe((values) => {
      console.log(values);
    });
  }

  guardarSolicitud() {
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
    console.log("guardar en bd",data)
    console.log("nuevo array",newArray)
    console.log("destini", form2.destination_place)

    this.serviceTransporte.GuardarSolicitud(data).subscribe((values) => {
      this.guardarBpmSolicitud = data;
      this.guardarResponseSolicitud = values;
      this.receiveParametersBPM();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Solicitud guardada con exito",
        showConfirmButton: true,
        confirmButtonColor: "#004884",
        text: `Codigo de solicitud No.:${this.guardarResponseSolicitud.codigoSolicitud}`,
        confirmButtonText: "Guardar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/menu"]);
        }
      });
    });
  }
}
