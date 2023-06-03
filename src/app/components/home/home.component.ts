import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../services/api.service';
import { Inmuebles } from '../interfaces/inmuebles.interface';

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

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.ngxLoader.stop();
    this.getInmuebles()
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
    })
  }

}
