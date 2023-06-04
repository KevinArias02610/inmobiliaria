import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inmuebles } from '../interfaces/inmuebles.interface';
import { Usuario } from '../interfaces/usarios.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getInmuebles(){
    return this.http.get<Inmuebles[]>('https://areandinaeje4.herokuapp.com/inmuebles');
  }

  getUusarios(){
    return this.http.get<Usuario[]>('https://areandinaeje4.herokuapp.com/usuarios');
  }

  getInmueblesByParam(params: string){
    return this.http.get<Inmuebles[]>(`https://areandinaeje4.herokuapp.com/inmuebles${params}`);
  }

  getInmueblesById(params: string){
    return this.http.get<Inmuebles>(`https://areandinaeje4.herokuapp.com/inmuebles${params}`);
  }

  editInmueble(inmueble: Inmuebles){
    return this.http.put<Inmuebles>(`https://areandinaeje4.herokuapp.com/inmuebles/${inmueble.id}`, inmueble);
  }

  createInmueble(inmueble: Inmuebles){
    return this.http.post<Inmuebles>(`https://areandinaeje4.herokuapp.com/inmuebles`, inmueble);
  }
}
