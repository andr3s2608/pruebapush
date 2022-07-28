import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../../infraestructure/services/api.service";
import { LoginI } from "../../../../infraestructure/models/login.interface";
import { Router } from "@angular/router";
import { ResponseI } from "../../../../infraestructure/models/response.interface";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-clave',
  templateUrl: './clave.component.html',
  styleUrls: ['./clave.component.scss']
})
export class ClaveComponent implements OnInit {
  forgotForm = new FormGroup({
    usuario: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  UserForgot(form: LoginI) {

  }

}
