import { Component, OnInit } from '@angular/core';
import { Headers1 } from 'src/app/infraestructure/utils/cabezeras.constants';

@Component({
  selector: 'app-seguimiento-solicitudes-conductor',
  templateUrl: './seguimiento-solicitudes-conductor.component.html',
  styleUrls: ['./seguimiento-solicitudes-conductor.component.scss']
})
export class SeguimientoSolicitudesConductorComponent implements OnInit {
  headers:any = Headers1

  constructor() { }

  ngOnInit(): void {
  }

  getSearch(formValue:any){
    console.log("esuchando papa")
    console.log(formValue)
  }
}
