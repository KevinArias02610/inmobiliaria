import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inmuebles } from '../../interfaces/inmuebles.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-inmuebles',
  templateUrl: './edit-inmuebles.component.html',
  styleUrls: ['./edit-inmuebles.component.css']
})
export class EditInmueblesComponent implements OnInit {

  public editForm!: FormGroup;
  public id: any;
  public listCiudades: string[] = [];
  public listHabitaciones: number[] = [];
  public listTipoInmueble: string[] = [];
  public listDisponible: string[] = [];

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ngxLoader.stop()
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo_inmueble: ['', Validators.required],
      ciudad: ['', Validators.required],
      habitaciones: ['', Validators.required],
      precio: ['', Validators.required],
      disponible: ['', Validators.required],
      propietario: ['', Validators.required],
      inquilino: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      imagen: ['', Validators.required]
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInmueble(this.id);
    this.getInmuebles()
  }

  onSubmit() {
    this.ngxLoader.start();
    if (this.editForm.valid) {
      if(this.editForm.get('imagen')!.value.includes('jpg') || this.editForm.get('imagen')!.value.includes('png')){
        this.editForm.value.habitaciones = parseInt(this.editForm.value.habitaciones);
        this.editForm.value.precio = parseInt(this.editForm.value.precio);
        this.api.editInmueble(this.editForm.value).subscribe((resp: any) =>{
          Swal.fire(
            '',
            `<b>Inmueble editado correctamente.</b>`,
            'success'
          );
          this.router.navigate(['/inmobiliaria/home']).then(()=>{
            this.ngxLoader.stop();
          });
        })
      }else{
        Swal.fire(
          '',
          `<b>Ingrese una imágen válida.</b>`,
          'warning'
        )
      }
    }
  }

  getInmueble(id: string){
    const param = `/${id}`
    this.api.getInmueblesById(param).subscribe((resp: Inmuebles) => {
      this.editForm.patchValue({
        id: resp.id,
        nombre: resp.nombre,
        tipo_inmueble: resp.tipo_inmueble,
        ciudad: resp.ciudad,
        habitaciones: resp.habitaciones,
        precio: resp.precio,
        telefono: resp.telefono,
        disponible: resp.disponible,
        propietario: resp.propietario,
        inquilino: resp.inquilino,
        correo: resp.correo,
        imagen: resp.imagen
      });
    })
  };

  onlyNumbers(event: any) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const numericRegex = /^[0-9]+$/;
    const isBackspaceOrDelete = keyCode === 8 || keyCode === 46;
    if (!numericRegex.test(keyValue) && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }
  
  getInmuebles(){
    this.api.getInmuebles().subscribe((resp: Inmuebles[]) => {
      resp.forEach(element => {
        this.listCiudades.push(element.ciudad);
        this.listHabitaciones.push(element.habitaciones);
        this.listTipoInmueble.push(element.tipo_inmueble);
        this.listDisponible.push(element.disponible)
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
      this.listDisponible = this.listDisponible.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    })
  }
  

}
