import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../services/api.service';
import { Inmuebles } from '../interfaces/inmuebles.interface';
import { FormControl } from '@angular/forms';

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
    this.api.getInmuebles().subscribe((resp: Inmuebles[]) => {
      this.listInmuebles = resp;
      resp.forEach(element => {
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
    let params = '';
    if(tipo == 'inmueble'){
      params = `?tipo_inmueble=${event.value}`;
      this.selectedOption2.reset();
      this.selectedOption3.reset();
    }else if(tipo == 'ciudad'){
      params = `?ciudad=${event.value}`;
      this.selectedOption.reset();
      this.selectedOption3.reset();
    }else if(tipo == 'habitaciones'){
      params = `?habitaciones=${event.value}`;
      this.selectedOption.reset();
      this.selectedOption2.reset();
    }
    this.api.getInmueblesByParam(params).subscribe((resp: Inmuebles[]) => {
      this.listInmuebles = resp;
      this.ngxLoader.stop()
    })
  }

  editProduct(id: number){
    this.ngxLoader.start()
    this.router.navigate(['/inmobiliaria/edit', id])
  }
}
