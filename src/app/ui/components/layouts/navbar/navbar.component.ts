import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/infraestructure/services/roles.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  roles:any;
  username:any;

  constructor(public ListaRoles: RolesService) { }

  ngOnInit(): void {
    let objeto: null| string = localStorage.getItem("roles");
    this.ListaRoles.changeRol(objeto!=null?objeto:'');
    this.roles= this.ListaRoles.getRoles()
    console.log("navbar",this.roles)
    
    this.username = localStorage.getItem("username");
    
  }

}
