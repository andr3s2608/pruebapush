import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Observable } from "rxjs";
import { OwnerUserDTO } from "src/app/infraestructure/interfaces/request/OwnerUserDTO";
import { ProcesoDTO } from "src/app/infraestructure/interfaces/request/ProcesoDTO";
import { RequestParamsDTO } from "src/app/infraestructure/interfaces/request/RequestParamsDTO";
import { ValuesDTO } from "src/app/infraestructure/interfaces/request/ValuesDTO";
import { ApiBpmService } from "src/app/infraestructure/services/api-bpm.service";
import { RolesService } from "src/app/infraestructure/services/roles.service";
import { statesTaskActions } from "src/app/infraestructure/utils/estados.contants";
import { ApiService } from "../../../../../app/infraestructure/services/api.service";

@Component({
  selector: "app-tablet",
  templateUrl: "./tablet.component.html",
  styleUrls: ["./tablet.component.scss"],
})
export class TabletComponent implements OnInit {
  roles: any;
  value: any;
  flag: any;
  itembody: any;
  itemdirectivo: any;
  itemreferente: any;
  itemprogramador:any;
  @Input() headers!: any;
  @Input() body!: Observable<any>;
  @Input() bodydirectivo!: Observable<any>;
  @Input() bodyreferente!: Observable<any>;
  @Input() bodyprogramador!: Observable<any>;
  @Output() BandejaEvent = new EventEmitter<any>();
  constructor(
    public ListaRoles: RolesService,
    private serviceBPM: ApiBpmService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.roles = this.ListaRoles.getRoles();
    this.getParametersBPM();


    //Tabla para administrar transporte
    if (this.body) {
      this.body.subscribe((values) => {
        this.itembody = values;
        this.flag = "transporte";
      });
    }

    //Tabla para ver tareas del directivo
    if (this.bodydirectivo) {
      this.bodydirectivo.subscribe((values) => {
        this.itemdirectivo = values;
        this.flag = "directivo";
      });
    }

    //Tabla para ver tareas del referente
     if (this.bodyreferente) {
      this.bodyreferente.subscribe((valuesreferente) => {
        this.itemreferente = valuesreferente.body.tasks;

        console.log("prueba info",valuesreferente)
        this.flag = "referente";
      });
    }

        //Tabla para ver tareas del programador
        if (this.bodyprogramador) {
          this.bodyprogramador.subscribe((valuesprogramador) => {
            this.itemprogramador = valuesprogramador.body.tasks;
    
            console.log("prueba info",valuesprogramador)
            this.flag = "programador";
          });
        }

  }

  ngOnChanges(changes: SimpleChanges) {

    //Change transpote
    if (this.body) {
      this.body.subscribe((values) => {
        this.itembody = values;
        this.flag = "transporte";
      });
    }
    
    //Change directivo
    if (this.bodydirectivo) {
      this.bodydirectivo.subscribe((values2) => {

        this.itemdirectivo = values2.body.tasks;
        this.flag = "directivo";
        console.log(this.itemdirectivo);
      });
    }

     //Change programador
     if (this.bodyprogramador) {
      this.bodyprogramador.subscribe((valuesprogramdor) => {

        this.itemprogramador = valuesprogramdor.body.tasks;
        this.flag = "programador";
        console.log(this.itemdirectivo);
      });
    }


    
  }

  //Select transporte y estado
  selectRadio(item?: any) {
    let updateData = item.idVehiculo + "," + item.estadoVehiculo.valor;

    this.BandejaEvent.emit(updateData);
  }

  //capturar datos solicitud
  send(id?: string) {
    this.updateParametersBPM(id);
  }

  updateParametersBPM(id?: string) {
    const callParameters = new RequestParamsDTO();
    callParameters.ownerUser = new OwnerUserDTO();
    callParameters.processId = "SolicitudTransporte.SolicitudTransporte",
    callParameters.containerId = "SolicitudTransporte_1.0.0-SNAPSHOT";
    callParameters.taskId = id,
    callParameters.taskStatus = statesTaskActions.started;
    callParameters.ownerUser.user = "";
    callParameters.ownerUser.password = "";
    callParameters.processInstance = "",
    callParameters.processInstanceId = "",
    callParameters.parametros = new ValuesDTO();
    callParameters.parametros.values = {
      
    };
    this.serviceBPM.cambiarEstadoTarea(callParameters).subscribe((data) => {});
  }

  getParametersBPM() {
    this.serviceBPM.listarTareas().subscribe((data) => {});
  }
}
