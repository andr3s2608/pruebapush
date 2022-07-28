import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
@Component({
  selector: "app-funcionarios-servicio",
  templateUrl: "./funcionarios-servicio.component.html",
  styleUrls: ["./funcionarios-servicio.component.scss"],
})
export class FuncionariosServicioComponent implements OnInit {
  public form: FormGroup;
  public movil: any;
  public arrayName: any = [];
  public arrayvalue: any;
  public dateEditado: boolean = false;
  @Output() FuncionarioEvent = new EventEmitter<string>();
  @Input() requestForm!: Observable<any>;
  @Input() title!: string;

  // example
  // productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      responsible: ["", Validators.required],
      name_user: ["", Validators.required],
      movil: [
        "",
        Validators.compose([Validators.pattern("[0-9]+"), Validators.required]),
      ],
      email_user: [
        "",
        Validators.compose([Validators.email, Validators.required]),
      ],
      justificacion_user: [""],
      dynamic: this.fb.array([]),
    });

    // Example
    // this.productForm = this.fb.group({
    //   responsible: ["",Validators.required],
    //   justificacion_user: ["",Validators.required],
    //   name_user: ["",Validators.required],
    //   movil: ["",Validators.required],
    //   email_user: ["",Validators.required],
    //   dynamic: this.fb.array([]) ,
    // });
  }

  ngOnInit(): void {
    //
    if (this.requestForm) {
      this.requestForm.subscribe((values) => {
        const { usuarioServicio, justificacion } = values;
        this.form.get("justificacion_user")?.setValue(justificacion);
        this.form.get("responsible")?.setValue(usuarioServicio[0].nombre);
        this.dateEditado = true;

        usuarioServicio.forEach((element: any) => {
          this.addDynamic(element);
        });
      });
    }

    // Escuchar cambios en el formulario y enviar informacion al componente Padre.
    this.form.valueChanges.subscribe((value) => {
      // permite enviar si se va hacer un ajuste
      if (this.dateEditado) {
        this.FuncionarioEvent.emit(this.form.value);
      }
      // validamos que el formulario este valido para enviar y que el Padre solo reciba la informacion validada
      console.log(this.form.status);
      if (this.form.status == "VALID") {
        console.log("valido");
        this.FuncionarioEvent.emit(this.form.value);
        // console.log(this.form.value)
      }
    });

    if (this.title === "Aprobación Solicitud De Servicio") {
      this.form.get("responsible")?.disable();
      this.form.get("name_user")?.disable();
      this.form.get("movil")?.disable();
      this.form.get("email_user")?.disable();
      this.form.get("justificacion_user")?.disable();
    }
  }

  // extrar informacion - info prueba
  add_users() {
    const { name_user, movil, email_user, justificacion_user } =
      this.form.controls;
    console.log(this.form.controls);
    console.log(this.form.status);
    console.log(this.form.valid);
    this.movil = movil.status;
  }

  // Dynamic - form
  dynamic(): FormArray {
    return this.form.get("dynamic") as FormArray;
  }

  newDynamic(element?: any): FormGroup {
    const data1 = typeof element !== "undefined" ? element["nombre"] : "";
    const data2 = typeof element !== "undefined" ? element["celular"] : "";
    const data3 =
      typeof element !== "undefined" ? element["correoElectronico"] : "";

    return this.fb.group({
      name_user: [data1, [Validators.required]],
      movil: [data2, Validators.required],
      email_user: [
        data3,
        Validators.compose([Validators.email, Validators.required]),
      ],
    });
  }

  addDynamic(element?: any) {
    const { dynamic } = this.form.controls;
    this.dynamic().push(this.newDynamic(element));
    this.add_Funcionarios();
  }

  removeDynamic(i: number) {
    this.dynamic().removeAt(i);
    this.add_Funcionarios();
  }

  sendFuncionarios() {
    // this.FuncionarioEvent.emit(this.form.value)
  }

  add_Funcionarios() {
    this.arrayName = [];

    const { name_user, dynamic } = this.form.controls;
    console.log("1 Lista", this.form.controls);
    // validacion
    if (!this.dateEditado) {
      this.arrayName.push(name_user.value);
    }
    console.log("2 Lista", this.arrayName);

    dynamic.value.forEach((element: any) => {
      if (element.name_user) {
        this.arrayName.push(element.name_user);
      }
      console.log("3 Lista", this.arrayName);
    });

    // console.log(this.arrayName)
  }
}
