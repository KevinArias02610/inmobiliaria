import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Inmuebles } from '../../interfaces/inmuebles.interface';

@Component({
  selector: 'app-create-inmuebles',
  templateUrl: './create-inmuebles.component.html',
  styleUrls: ['./create-inmuebles.component.css']
})
export class CreateInmueblesComponent implements OnInit {
  public createForm!: FormGroup;
  public listCiudades: string[] = [];
  public listHabitaciones: number[] = [];
  public listTipoInmueble: string[] = [];
  public idMax: number = 0;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ngxLoader.stop();
    this.createForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo_inmueble: ['', Validators.required],
      ciudad: ['', Validators.required],
      habitaciones: ['', Validators.required],
      precio: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      imagen: ['', Validators.required]
    });
    this.getInmuebles()
  }

  onSubmit() {
    this.ngxLoader.start();
    if (this.createForm.valid) {
      if(this.createForm.get('imagen')!.value.includes('jpg') || this.createForm.get('imagen')!.value.includes('png')){
        this.createForm.value.habitaciones = parseInt(this.createForm.value.habitaciones);
        this.createForm.value.precio = parseInt(this.createForm.value.precio);
        this.api.createInmueble(this.createForm.value).subscribe(() =>{
          Swal.fire(
            '',
            `<b>Inmueble creado correctamente.</b>`,
            'success'
          );
          this.router.navigate(['/inmobiliaria/home']).then(()=>{
            this.ngxLoader.stop();
          });
        })
      }else{
        this.ngxLoader.stop();
        Swal.fire(
          '',
          `<b>Ingrese una imágen válida.</b>`,
          'warning'
        );
      }
    }else{
      console.log(this.createForm.value)
      this.ngxLoader.stop();
      Swal.fire(
        '',
        `<b>Verifique los campos..</b>`,
        'warning'
      );
    }
  }

  getInmuebles(){
    let max: number[] = [];
    this.api.getInmuebles().subscribe((resp: Inmuebles[]) => {
      resp.forEach(element => {
        this.listCiudades.push(element.ciudad);
        this.listHabitaciones.push(element.habitaciones);
        this.listTipoInmueble.push(element.tipo_inmueble);
        max.push(element.id);
      });
      this.listCiudades = this.listCiudades.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.listHabitaciones = this.listHabitaciones.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.listTipoInmueble = this.listTipoInmueble.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.idMax = Math.max(...max);
      this.createForm.patchValue({
        id: this.idMax + 1
      });
    })
  }

  onlyNumbers(event: any) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const numericRegex = /^[0-9]+$/;
    const isBackspaceOrDelete = keyCode === 8 || keyCode === 46;
    if (!numericRegex.test(keyValue) && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

}
