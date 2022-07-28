import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReferenteApiService } from 'src/app/infraestructure/services/referente-api.service';
enum CheckTransporte { Carga, Pasajero, NONE };
enum CheckServicio { Recorrido, Ida, Regreso, NONE };

@Component({
  selector: 'app-ajuste-solitudes-servicios',
  templateUrl: './ajuste-solitudes-servicios.component.html',
  styleUrls: ['./ajuste-solitudes-servicios.component.scss']
})
export class AjusteSolitudesServiciosComponent implements OnInit {
  public form:FormGroup
  public form2:FormGroup
  public form3:FormGroup
  @Input() requestForm!: Observable<any>;
  @Output() SolicitudEvent = new EventEmitter<any>() 
  // transporte
  check_type = CheckTransporte;
  actualChecked!: CheckTransporte;
  // recorrido
  check_type2 = CheckServicio;
  actualChecked2!: CheckServicio;
  public arrayDependencias:any
  public arrayName:any = []
  public dateEditado:boolean = false
  public inhabilitar:boolean = false
  @Input() title!:string; 


  // application_date: [{value: "" , disabled: true}, [Validators.required]],
  constructor(private fb: FormBuilder , public serviceTransporte:ReferenteApiService) { 
    this.form = this.fb.group({
      // temporal
      application_date: [{value: this.getDateToday() , disabled: true}, [Validators.required]],
      type_Transport: ["", Validators.required],
      Type_service: ["", Validators.required],
      number_passengers: ["", [Validators.min(1), Validators.max(99), Validators.pattern('^(0|[1-9][0-9]*)$'),]],
      principal_name: [{value:'' , disabled: true}, [Validators.required]],
      principal_id: [{disabled: true}, [Validators.required]],
      dependence: ["",Validators.required],
      justification: ["",Validators.required],
    });

    this.form2 = this.fb.group({
      place_departure: ["",Validators.required],
      destination_place: ["", Validators.required],
      return_time: ["",Validators.required],
      dynamic: this.fb.array([]) 
    });

    this.form3 = this.fb.group({
      date_service: ["",Validators.required],
      departure_time2: ["", Validators.required],
      return_time2: ["",Validators.required],
    });
  }

  ngOnInit(): void {


    this.requestForm.subscribe(values=>{
      console.log("info cargado formulario",values)
      this.dateEditado = true
      this.form.get('number_passengers')?.setValue(values['cantidadPasajeros'])
      this.form.get('justification')?.setValue(values['observacion'])
      this.form.get('place_departure')?.setValue(values['lugarSalida'])
      if(values['tipoTransporteId'] === 3){
        this.selectCheckBoxtransporte(this.check_type.Carga, 'Carga')
      }else{
        this.selectCheckBoxtransporte(this.check_type.Pasajero ,'Pasajero')
      }
      if(values['tipoServicioId'] === 6){
        this.selectCheckBoxservicio(this.check_type2.Ida, 'Ida')
      }else if(values['tipoServicioId'] === 7){
        this.selectCheckBoxservicio(this.check_type2.Recorrido, 'Recorrido')
      }else{
        this.selectCheckBoxservicio(this.check_type2.Regreso, 'Regreso')
      }

      this.form3.get('date_service')?.setValue(values['fechaPrestacionServicio'])
      this.form3.get('departure_time2')?.setValue(values['horaSalida'])
      this.form3.get('return_time2')?.setValue(values['horaRegreso'])
      this.form2.get('place_departure')?.setValue(values['lugarSalida'])

      this.serviceTransporte.getDependencias().subscribe(values2=>{
        this.arrayDependencias = values2
        this.foundName(values['dependenciaId'])
     })

     const { lugarDestino} =  values;
     lugarDestino.forEach((element:any) => {
      this.addDynamic(element)
    });

      console.log("desde hijo 1", values)
   })

        // Escuchar cambios en el formulario y enviar informacion al componente Padre.
        this.form.valueChanges.subscribe(value => {
          this.form2.valueChanges.subscribe(value => {
            this.form3.valueChanges.subscribe(value => {
              if(this.form.status == "VALID" && this.form2.status == "VALID" && this.form3.status == "VALID"){
                  let formularios = {
                    form1: this.form.value,
                    form2: this.form2.value,
                    form3: this.form3.value
                }
                this.SolicitudEvent.emit(formularios)
              }
            });
          });      
        });


          console.log(this.title)
        if(this.title==='Aprobación Solicitud De Servicio'){
          this.inhabilitar = true
          console.log(this.inhabilitar)
          this.form.get('type_Transport')?.disable()
          this.form.get('Type_service')?.disable()
          this.form.get('number_passengers')?.disable()
          this.form.get('principal_name')?.disable()
          this.form.get('dependence')?.disable()
          this.form.get('justification')?.disable()
          this.form2.get('place_departure')?.disable()
          this.form2.get('destination_place')?.disable()
          this.form2.get('return_time')?.disable()
          this.form3.get('date_service')?.disable()
          this.form3.get('departure_time2')?.disable()
          this.form3.get('return_time2')?.disable()
        }
  }

  selectCheckBoxtransporte(targetType: CheckTransporte , value:string) {
    const { type_Transport } = this.form.controls;
    // si esta chekeado, limpia la actual variable
    if(this.actualChecked === targetType) {
      this.actualChecked = CheckTransporte.NONE;
      return;
    }
    this.actualChecked = targetType;
    // Enviar el valor al formcontrol
    type_Transport.setValue((value == "Pasajero" ? "2" : "3"))
  }

  selectCheckBoxservicio(targetType: CheckServicio , value:string) {
    const { Type_service } = this.form.controls;
    // si esta chekeado, limpia la actual variable
    if(this.actualChecked2 === targetType) {
      this.actualChecked = CheckTransporte.NONE;
      return;
    }
    this.actualChecked2 = targetType;
    // Enviar el valor al formcontrol
    Type_service.setValue((value == "Ida" ? "6" : value == "Regreso" ? "7" : "5" ))
  }

// temporal
  getDateToday(){
    // using slice
    let date = new Date();
    let day = `0${date.getDate()}`.slice(-2); //("0"+date.getDate()).slice(-2);
    let month = `0${date.getMonth() + 1}`.slice(-2);
    let year = date.getFullYear();
    let value1 = `${year}-${month}-${day}`
      return  value1;
  }


    // Dynamic - form
    dynamic() : FormArray {
      return this.form2.get("dynamic") as FormArray
    }
     
    newDynamic(element?:any): FormGroup {
      const data1 = (typeof element !== "undefined") ? element['descripcion'] : '';
      const data2 = (typeof element  !== "undefined") ? element['horaRegreso'] : '';

      return this.fb.group({
        destination_place: [data1, Validators.required],
        return_time: [data2,Validators.required],
      })
    }
     
    addDynamic(element?:any) {
      const {dynamic} = this.form2.controls;
      this.dynamic().push(this.newDynamic(element));
      this.add_Funcionarios()
    }
     
    removeDynamic(i:number) {
      this.dynamic().removeAt(i);
      this.add_Funcionarios()
    }

    add_Funcionarios(){
      this.arrayName = []
  
      const { name_user , dynamic } = this.form.controls;
  
      dynamic.value.forEach((element:any) => {
        if(element.name_user){
          this.arrayName.push(element.name_user)
        }
      });
  
      // console.log(this.arrayName)

    }

    foundName(id:any) {
      const resultado = this.arrayDependencias.find( (fruta:any) => fruta.idDependencia === parseInt(id) );
  
      const { principal_name } = this.form.controls;
      const { principal_id} = this.form.controls;
      const { dependence} = this.form.controls;
      dependence.setValue(id)
      principal_id.setValue(resultado.idDirectorJefe)
      principal_name.setValue(resultado.nombreDirectorJefe)

      // permite pasar el formulario correctamente sin errores
      if(this.dateEditado){
        let formularios = {
          form1: this.form.value,
          form2: this.form2.value,
          form3: this.form3.value
      }
      this.SolicitudEvent.emit(formularios)
      }
  }

}
