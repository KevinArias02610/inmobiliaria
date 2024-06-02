import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inmuebles } from '../interfaces/inmuebles.interface';
import { Usuario } from '../interfaces/usarios.interface';
import { ApiResponse } from '../interfaces/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.myjson.online/v1/records/'; // Reemplaza con tu URL de API real
  private recordUsersId  = 'eed6e3f6-7db3-4ca6-aec6-e27bd10a8ec3';

  constructor(public http: HttpClient) { }

  //API MYJSON 

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}${this.recordUsersId}`);
  }
  //API Heroku (Deprecated)
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
