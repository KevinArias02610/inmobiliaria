import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inmuebles } from '../interfaces/inmuebles.interface';
import { Usuario } from '../interfaces/usarios.interface';
import { InmueblesResponse, UsersResponse } from '../interfaces/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.myjson.online/v1/records/'; // Reemplaza con tu URL de API real
  private recordUsersId  = 'eed6e3f6-7db3-4ca6-aec6-e27bd10a8ec3';
  private recordInmueblesId  = 'a3b1174d-ae0e-48b3-a7dc-add401967d86';
  private collectionInmueblesId  = 'dcc9a4f8-473a-4616-b4b5-95f8b26cd85b';
  private inmobiliariaTokenCollection  = '5197325c-7f64-418f-9b35-8406e34317fa';

  constructor(public http: HttpClient) { }

  //API MYJSON 

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}${this.recordUsersId}`);
  }

  getInmuebles() : Observable<InmueblesResponse>{
    return this.http.get<InmueblesResponse>(`${this.apiUrl}${this.recordInmueblesId}`);
  }

  updateInmueble(inmuebleData: string): Observable<any> {
    debugger
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('x-collection-access-token', this.inmobiliariaTokenCollection)
      .set('x-record-metadata', 'true');

    const body = new HttpParams()
        .set('jsonData', inmuebleData)
        .set('collectionId', this.collectionInmueblesId);

    return this.http.put(`${this.apiUrl}${this.recordInmueblesId}`, body.toString(), { headers });
  }

  //API Heroku (Deprecated)

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
