import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../../infraestructure/services/api.service";
import { LoginI } from "../../../../infraestructure/models/login.interface";
import { Router } from "@angular/router";
import { RolesService } from "../../../../infraestructure/services/roles.service";
import { ResponseI } from "../../../../infraestructure/models/response.interface";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UserI } from "src/app/infraestructure/models/user.interface";
import { HttpStatusCode } from "@angular/common/http";

@Component({
  selector: "app-accent",
  templateUrl: "./acceso.component.html",
  styleUrls: ["./acceso.component.scss"],
})
export class AccesoComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  constructor(
    private api: ApiService,
    private rol: RolesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navbar: any = document.getElementById("myNavbar");
    navbar.style.display = "none";
  }

  UserAcces(form: LoginI) {
    this.api.loginByEmail(form).subscribe((data) => {
      if (data.httpStatus == "OK") {
        let objeto: string = data.listaObjetos[0].description;
        localStorage.setItem("roles", objeto.toLowerCase());
        localStorage.setItem("username", data.objetoRespuesta.nombrComp);
        localStorage.setItem("email", data.objetoRespuesta.email);
        localStorage.setItem("clave", data.objetoRespuesta.password);
        let correoUsuario = localStorage.getItem("email");
        let clave = localStorage.getItem("clave");
        this.rol.changeRol(objeto.toLowerCase());
        window.location.href = "/menu";
      }
    });
  }
}
