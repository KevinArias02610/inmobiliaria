import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inmuebles } from '../../interfaces/inmuebles.interface';
import Swal from 'sweetalert2';
import { InmueblesResponse } from '../../interfaces/ApiResponse';

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
  public inmueble!: Inmuebles;
  public inmuebles!: Inmuebles[];

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
      debugger
      if(this.editForm.get('imagen')!.value.includes('jpg') || this.editForm.get('imagen')!.value.includes('png')){

        this.editForm.value.habitaciones = parseInt(this.editForm.value.habitaciones);
        this.editForm.value.precio = parseInt(this.editForm.value.precio);

        this.inmueble = this.editForm.value;
        const index = this.inmuebles.findIndex(inmueble => inmueble.id === this.inmueble.id);
        if (index !== -1) {
          this.inmuebles[index] = this.inmueble;
        }

        this.api.updateInmueble(JSON.stringify(this.inmuebles)).subscribe((resp: any) =>{
            debugger
            console.log(resp);
            Swal.fire(
              '',
              `<b>Inmueble editado correctamente.</b>`,
              'success'
            );
            this.router.navigate(['/inmobiliaria/home']).then(()=>{
              this.ngxLoader.stop();
            });
        });

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
    debugger
    this.api.getInmuebles().subscribe((resp: InmueblesResponse) => {
      this.inmueble = resp.data.find(inmueble => inmueble.id.toString() === id)!;
      console.log(this.inmueble);
      this.editForm.patchValue({
        id: this.inmueble.id,
        nombre: this.inmueble.nombre,
        tipo_inmueble: this.inmueble.tipo_inmueble,
        ciudad: this.inmueble.ciudad,
        habitaciones: this.inmueble.habitaciones,
        precio: this.inmueble.precio,
        telefono: this.inmueble.telefono,
        disponible: this.inmueble.disponible,
        propietario: this.inmueble.propietario,
        inquilino: this.inmueble.inquilino,
        correo: this.inmueble.correo,
        imagen: this.inmueble.imagen
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
    this.api.getInmuebles().subscribe((resp: InmueblesResponse) => {
      this.inmuebles = resp.data;
      resp.data.forEach((element: Inmuebles) => {
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
