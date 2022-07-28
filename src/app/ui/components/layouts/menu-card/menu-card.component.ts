import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/infraestructure/services/roles.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  roles:any;

  constructor(private router: Router , public ListaRoles: RolesService) { }

  ngOnInit(): void {
   this.roles= this.ListaRoles.getRoles()
   console.log("valores actuales",this.roles)
  }

  rutas(params:string){
    this.router.navigate([params]);
  }

  opt(answer:string) {

    if(answer == 'referente') {
       return 'container';
    }
    if(answer == 'programador') {
       return 'container-fluid';
    }
    if(answer == 'directivo') {
      return 'container-fluid';
    }
    if(answer == 'conductor') {
       return 'container-fluid';
    }
    if(answer == 'usuario') {
       return 'container-fluid';
    }

     return 'container';
 }

}
