import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReferenteApiService } from 'src/app/infraestructure/services/referente-api.service';
import { SolicitudesService } from 'src/app/infraestructure/services/solicitudes.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {
  public form:FormGroup
  public arrayDependencias:any

  constructor(private fb: FormBuilder,
    private route: Router , 
    public serviceTransporte2:ReferenteApiService,
    public serviceTransporte:SolicitudesService,

    ) {
    this.form = this.fb.group({
      request_id: [{value:'' , disabled: true}, Validators.required],
      survey_date: [{value:'' , disabled: true}],
      departure_time: [{value:'' , disabled: true}],
      driver: ["",],
      dependence: [{value:'' , disabled: true}],
      place_departure: [{value:'' , disabled: true}],
      destination_place: [{value:'' , disabled: true}],
      service_by_driver: ["",Validators.required],
      vehicle_status: ["",Validators.required],
      Observation: ["",Validators.required],
    });
   }

  ngOnInit(): void {
    this.consultarInformacion()
  }

  consultarInformacion(){
    this.serviceTransporte.getSolicitud("127","1").subscribe((values:any)=>{
      this.form.get('request_id')?.setValue(values['solicitudId'])
      this.form.get('place_departure')?.setValue(values['lugarSalida'])
      this.form.get('destination_place')?.setValue(values['lugarDestino'][0].descripcion)
      this.form.get('survey_date')?.setValue(values['fechaPrestacionServicio'])
      this.form.get('departure_time')?.setValue(values['horaSalida'])
     
      console.log(values)

      this.serviceTransporte2.getDependencias().subscribe(values2=>{
        this.arrayDependencias = values2
        console.log(this.arrayDependencias)
        this.foundName(values['dependenciaId'])
     })
   })
  }


  send(){
    this.guardarEncuesta()
  }

  guardarEncuesta(){

    let data ={
      "idSolicitud": this.form.get('request_id')?.value,
      "fechaEncuesta": this.getDateToday(),
      "idCalifConductor": this.form.get('service_by_driver')?.value,
      "idCalifVehiculo": this.form.get('vehicle_status')?.value,
      "observacion": this.form.get('Observation')?.value
    }

     this.serviceTransporte.GuardarEncuesta(data).subscribe(values=>{
      console.log(values)
      this.route.navigate([''])
   })
   
  console.log(data)

  }

  foundName(id:any) {
    const resultado = this.arrayDependencias.find( (fruta:any) => fruta.idDependencia === parseInt(id) );
    this.form.get('dependence')?.setValue(resultado['nombreDependencia'])
}

getDateToday(){
  // using slice
  let date = new Date();
  let day = `0${date.getDate()}`.slice(-2); //("0"+date.getDate()).slice(-2);
  let month = `0${date.getMonth() + 1}`.slice(-2);
  let year = date.getFullYear();
  let value1 = `${year}-${month}-${day}`
    return  value1;
}
  

}
