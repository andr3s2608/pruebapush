import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portal-secretaria';
  show:boolean = true


  constructor() {

    //Primero comprobar si existe una sesion en localstorage
    //Obtener lo que se guarda en el localstorage
    //Llamar change rol para verificar rol de usuario logueado

    console.log("usuario",localStorage.getItem('roles'))

    if( window.location.pathname === '/Acceso'){
      this.show = false
    }
    if( window.location.pathname === '/menu'){
      this.show = true
    }
    if( window.location.pathname !== '/Acceso'){
      this.show = true
    }
  }
}
