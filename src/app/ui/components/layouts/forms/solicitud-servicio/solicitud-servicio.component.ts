import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReferenteApiService } from "src/app/infraestructure/services/referente-api.service";
enum CheckTransporte {
  Carga,
  Pasajero,
  NONE,
}
enum CheckServicio {
  Ida,
  Regreso,
  Recorrido,
  NONE,
}

@Component({
  selector: "app-solicitud-servicio",
  templateUrl: "./solicitud-servicio.component.html",
  styleUrls: ["./solicitud-servicio.component.scss"],
})
export class SolicitudServicioComponent implements OnInit {
  @Input() title!: string;
  public form: FormGroup;
  public form2: FormGroup;
  public form3: FormGroup;
  public arrayTipo: any;
  public arrayServicio: any;
  public arrayDependencias: any;

  @Output() SolicitudEvent = new EventEmitter<any>();
  // transporte
  check_type = CheckTransporte;
  actualChecked!: CheckTransporte;
  // recorrido
  check_type2 = CheckServicio;
  actualChecked2!: CheckServicio;

  constructor(
    private fb: FormBuilder,
    public serviceTransporte: ReferenteApiService
  ) {
    this.form = this.fb.group({
      application_date: [
        { value: this.getDateToday(), disabled: true },
        [Validators.required],
      ],
      type_Transport: ["", Validators.required],
      Type_service: ["", Validators.required],
      number_passengers: [
        "",
        [
          Validators.min(1),
          Validators.max(99),
          Validators.pattern("^(0|[1-9][0-9]*)$"),
        ],
      ],
      principal_name: [{ value: "", disabled: true }, [Validators.required]],
      principal_id: [{ disabled: true }, [Validators.required]],
      dependence: ["", Validators.required],
    });

    this.form2 = this.fb.group({
      place_departure: ["", Validators.required],
      destination_place: ["", Validators.required],
      return_time: ["", Validators.required],
      dynamic: this.fb.array([]),
    });

    this.form3 = this.fb.group({
      date_service: ["", Validators.required],
      departure_time2: ["", Validators.required],
      return_time2: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // Consumo de servicios
    this.getConstantesServices();

    const { application_date } = this.form.controls;
    if (this.title == "Aprobación Solicitud De Servicio") {
      application_date.setValue("");
    }

    // Escuchar cambios en el formulario y enviar informacion al componente Padre.
    this.form.valueChanges.subscribe((value) => {
      this.form2.valueChanges.subscribe((value) => {
        this.form3.valueChanges.subscribe((value) => {
          if (
            this.form.status == "VALID" &&
            this.form2.status == "VALID" &&
            this.form3.status == "VALID"
          ) {
            let formularios = {
              form1: this.form.value,
              form2: this.form2.value,
              form3: this.form3.value,
              
            };
            console.log("info form",formularios)
            this.SolicitudEvent.emit(formularios);
          }
        });
      });
    });
  }

  getDateToday() {
    // using slice
    let date = new Date();
    let day = `0${date.getDate()}`.slice(-2); //("0"+date.getDate()).slice(-2);
    let month = `0${date.getMonth() + 1}`.slice(-2);
    let year = date.getFullYear();
    let value1 = `${year}-${month}-${day}`;
    return value1;
  }

  selectCheckBoxtransporte(targetType: CheckTransporte, value: string) {
    const { type_Transport } = this.form.controls;
    // si esta chekeado, limpia la actual variable
    if (this.actualChecked === targetType) {
      this.actualChecked = CheckTransporte.NONE;
      return;
    }
    this.actualChecked = targetType;
    // Enviar el valor al formcontrol
    type_Transport.setValue(value == "Pasajero" ? "2" : "3");
  }

  selectCheckBoxservicio(targetType: CheckServicio, value: string) {
    const { Type_service } = this.form.controls;
    // si esta chekeado, limpia la actual variable
    if (this.actualChecked2 === targetType) {
      this.actualChecked = CheckTransporte.NONE;
      return;
    }
    this.actualChecked2 = targetType;
    // Enviar el valor al formcontrol
    Type_service.setValue(
      value == "Ida" ? "6" : value == "Regreso" ? "7" : "5"
    );
  }

  getConstantesServices() {
    this.serviceTransporte.getConstantes("1").subscribe((values) => {
      this.arrayTipo = values;
      console.log("prueba",this.arrayTipo)
      this.serviceTransporte.getConstantes("4").subscribe((values) => {
        this.arrayServicio = values;
      });
    });

    this.serviceTransporte.getDependencias().subscribe((values) => {
      this.arrayDependencias = values;
    });
  }

  // Dynamic - form
  dynamic(): FormArray {
    return this.form2.get("dynamic") as FormArray;
  }

  newDynamic(i: number): FormGroup {
    return this.fb.group({
      destination_place: ["", Validators.required],
      return_time: ["", Validators.required],
    });
  }

  addDynamic() {
    const { dynamic } = this.form2.controls;
    this.dynamic().push(this.newDynamic(dynamic.value.length));
  }

  removeDynamic(i: number) {
    this.dynamic().removeAt(i);
  }

  prueba() {
    console.log(this.form3.controls["departure_time2"].value);
    console.log(this.form3.controls["return_time2"].value);

    if (
      this.form3.controls["departure_time2"].value >
      this.form3.controls["return_time2"].value
    ) {
      console.log("es mayor");
    } else {
      console.log("no lo es");
    }
  }

  foundName(id: any) {
    const resultado = this.arrayDependencias.find(
      (fruta: any) => fruta.idDependencia === parseInt(id)
    );

    const { principal_name } = this.form.controls;
    const { principal_id } = this.form.controls;
    principal_id.setValue(resultado.idDirectorJefe);
    principal_name.setValue(resultado.nombreDirectorJefe);
  }
}
