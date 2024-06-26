import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../services/api.service';
import { Inmuebles } from '../interfaces/inmuebles.interface';
import { FormControl } from '@angular/forms';
import { InmueblesResponse } from '../interfaces/ApiResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listInmuebles: Inmuebles[] = [];
  public listCiudades: string[] = [];
  public listHabitaciones: number[] = [];
  public listTipoInmueble: string[] = [];
  public selectedOption: FormControl = new FormControl();
  public selectedOption2: FormControl = new FormControl();
  public selectedOption3: FormControl = new FormControl();

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.ngxLoader.stop();
    this.getInmuebles();
    localStorage.removeItem('isLogin')
  }

  singOut(){
    this.ngxLoader.start();
    this.router.navigate(['/login']);
  }

  getInmuebles(){
    this.api.getInmuebles().subscribe((resp: InmueblesResponse) => {
      this.listInmuebles = resp.data;
      resp.data.forEach((element: Inmuebles) => {
        this.listCiudades.push(element.ciudad);
        this.listHabitaciones.push(element.habitaciones);
        this.listTipoInmueble.push(element.tipo_inmueble);
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
    })
  }

  onSelectionChange(tipo: string, event: any){

    this.ngxLoader.start()

    this.api.getInmuebles().subscribe((resp: InmueblesResponse) => {

      if(tipo == 'inmueble'){
        this.listInmuebles = resp.data.filter(inmueble => inmueble.tipo_inmueble === event.value);
        this.selectedOption2.reset();
        this.selectedOption3.reset();
      }else if(tipo == 'ciudad'){
        this.listInmuebles = resp.data.filter(inmueble => inmueble.ciudad === event.value);
        this.selectedOption.reset();
        this.selectedOption3.reset();
      }else if(tipo == 'habitaciones'){
        this.listInmuebles = resp.data.filter(inmueble => inmueble.habitaciones === event.value);
        this.selectedOption.reset();
        this.selectedOption2.reset();
      }

      this.ngxLoader.stop()
    })
  }

  editProduct(id: number){
    this.ngxLoader.start()
    this.router.navigate(['/inmobiliaria/edit', id])
  }

  createProduct(){
    this.ngxLoader.start()
    this.router.navigate(['/inmobiliaria/create'])
  }
}
