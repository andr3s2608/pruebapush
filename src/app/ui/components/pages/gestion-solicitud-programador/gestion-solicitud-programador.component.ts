import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
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
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: 'app-gestion-solicitud-programador',
  templateUrl: './gestion-solicitud-programador.component.html',
  styleUrls: ['./gestion-solicitud-programador.component.scss']
})
export class GestionSolicitudProgramadorComponent implements OnInit {
  formClerk: any;
  public form: FormGroup;
  formApplication: any;
  unlock: boolean = true;
  public arrayVehiculo: any;
  public vehiculo: any;
  filas: any;
  placa:any;
  conductor:any;
  funcionario: any;
  funcionariologin: any;
  guardarResponseSolicitud: any;
  @Input() requestForm!: Observable<any>;
  guardarBpmSolicitud: any;
  public subcontratado:any;
  dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado",];

  constructor(
    private fb: FormBuilder,
    private serviceBPM: ApiBpmService,
    public http: HttpClient,
    public router: Router,
    public serviceTransporte: SolicitudesService,
    private api: ApiService
  ) {
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
      tipoTransporte: "2",
    };

     // placa
     this.api.getVehiculos(data).subscribe((values2) => {
      this.arrayVehiculo = values2;
      
    });

    let correoUsuario = localStorage.getItem("email");
    let dataUsuario = {
      correo: correoUsuario,
    };

    let idfuncionario = 0;
    let email = "";
    this.api.BusquedaFcorreo(dataUsuario).subscribe((values) => {
      email = values.correoElectronico;
      idfuncionario = values.id;
      this.funcionario = idfuncionario;
      this.funcionariologin = email;
    });
  }

  send() {

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
    callParameters.taskId = "", (callParameters.taskStatus = "");
    callParameters.ownerUser.user = "";
    callParameters.ownerUser.password = "";
    callParameters.processInstance = "",
    callParameters.processInstanceId = "",
    callParameters.parametros = new ValuesDTO();
    callParameters.parametros.values = {
      idSolicitud: this.guardarResponseSolicitud.idSolicitud + "",
      codSolicitud: this.guardarResponseSolicitud.codigoSolicitud,
      nomEstadoSolicitud: "Asignada", //Esta va fijo
      idEstadoSolicitud: "25", // Este va fijo
      nomUsuarioResponsable: this.guardarBpmSolicitud.nombre, //campo responsable
      fechaSolicitudText: this.guardarBpmSolicitud.fechaPrestacionServicio + "",
      fechaInicioServicioText:
        this.guardarBpmSolicitud.fechaPrestacionServicio + "",
      horaInicioServicioText: this.guardarBpmSolicitud.horaSalida + "",
      gestionDirecta: "false", //Este va fijo
      loginUsuario: this.funcionariologin, //Correo logueado
      idTipoServicio: this.guardarBpmSolicitud.tipoServicioId, // tipo servicio
      nomTipoServicio: this.guardarBpmSolicitud.servicio, // nonbre tipo servicio
      idDependencia: this.guardarBpmSolicitud.dependenciaId, //dependencia
      horaFinServicioText: this.guardarBpmSolicitud.horaRegreso, //hora de regreso
      lugarInicioSolicitud: this.guardarBpmSolicitud.lugarSalida, // lugar de salida
    };

    // this.show=false

    this.api.IniciarInstancia(callParameters).subscribe((data) => {
      console.log("data bpm", this.serviceBPM);
      // this.show=true

    });
  }

  getFuncionarios(formValue:string){
    this.formClerk = formValue
      this.unlockButton()
  }

  
  getSolicitud(formValue:any){
    this.formApplication = formValue 
    this.unlockButton()
  }

  unlockButton(){
    if(this.formApplication && this.formClerk){
      this.unlock = false
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
    let newArray: any[] = [];
    console.log("entro al metodo", this.formApplication);
    const { form1, form2, form3 } = this.formApplication;

    console.log("formulario 1", form1);
    console.log("formulario 2", form2);
    console.log("formulario 3", form3);


    console.log("formulario 2", form2);

    newArray.push({
      descripcion: form2.destination_place,
      horaRegreso: form2.return_time,
    });

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
    console.log("carro selecccionado" + this.placa+this.conductor);

    let contractor:any=''
 contractor=this.form.get("contractor");
 
 let driver:any=''
 driver=this.form.get("driver");
 
 let license_plate:any=''
 license_plate=this.form.get("license_plate");
 
 let observation:any=''
 observation=this.form.get("observation");


    console.log("contractor ",contractor.value);
    console.log("driver ",driver.value);
    console.log("license_plate ",license_plate.value);
    console.log("observation ",observation.value);

    let carrosubcontratado: any = [];

    



    const carro : any = [];
      
    carro.push({
        vehiculoId:this.placa,
        conductorId:this.conductor
    });



   

    console.log("carro selecccionado" + carro + carro.vehiculoId+ carro.conductorId);

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
      lugarDestino: newArray ?? form2.destination_place,
      usuarioServicio: newArray2.concat(datacombination),
      vehiculo:carro
     
    }



  
    this.serviceTransporte.GuardarSolicitud(data).subscribe((values) => {
      this.guardarBpmSolicitud = data;
      this.guardarResponseSolicitud = values;
      
      
if(contractor.value!="")
{
  carrosubcontratado={
    idSolicitud: this.guardarResponseSolicitud.idSolicitud,
    nombreContratista: contractor.value+"",
    nombreConductorContratista: driver.value+"",
    placaVehiculoContratista : license_plate.value+""
  };
}

let observacionsubcontratacion: any = [];
if(observation.value!="")
{
  observacionsubcontratacion={
    idSolicitud: this.guardarResponseSolicitud.idSolicitud,
    observacion: observation.value,
  funcionarioId: this.funcionario
  };
}

this.api.carroSubcontratado(carrosubcontratado).subscribe((values) =>
{
  console.log(values);
});
this.api.GuardarObservacion(observacionsubcontratacion).subscribe((values) =>
{
  console.log(values);
 
});

      this.receiveParametersBPM();     
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Solicitud guardada con exito",
        showConfirmButton: true,
        confirmButtonColor: "#004884",
        text: `Codigo de solicitud No.:${this.guardarResponseSolicitud.codigoSolicitud}`,
        confirmButtonText: "Guardar",
      })      .then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/menu"]);
        }
      });
    });
   
            

  }

 selectRadio(item?: any) {
  this.placa = item.idVehiculo;
  this.conductor = item.conductor.valor;

  let data = {
    idVehiculo:item.idVehiculo,
    idConductor:item.conductor.valor,
  };

  this.arrayVehiculo = this.serviceTransporte.buscarVehiculos(data);
  console.log("info carros", data)
  
}
}
