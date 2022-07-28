import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReferenteApiService } from 'src/app/infraestructure/services/referente-api.service';
import { SolicitudesService } from 'src/app/infraestructure/services/solicitudes.service';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.scss']
})
export class NovedadComponent implements OnInit {
  public form:FormGroup
  public arrayTipo:any

  constructor(private fb: FormBuilder , private location: Location , public serviceTransporte:ReferenteApiService,
    public service:SolicitudesService,public router:Router,) {
    this.form = this.fb.group({
      novelty: [""],
      justification: [""],
    });
   }

  ngOnInit(): void {
    this.getConstantesServices()
  }

  back(): void {
    this.location.back()
  }

  send(): void {
    this.guardarNovedad()

  }


  getConstantesServices(){
    this.serviceTransporte.getConstantes("8").subscribe(values=>{
       this.arrayTipo = values
    })
  }

  guardarNovedad(){


    //idSolicitud quemado
   // idFuncionario quemado

    let data ={
      "idSolicitud": "65",
      "idTipoNovedad": this.form.get('novelty')?.value,
      "descripcion": this.form.get('justification')?.value,
      "idFuncionario": "20"
    }
  
     this.service.GuardarNovedad(data).subscribe(values=>{
      console.log(values)
      this.router.navigate([''])
   })
   
 

  }



}
