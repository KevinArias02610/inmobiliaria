import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../services/api.service';
import { Usuario } from '../interfaces/usarios.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public usuario = '';
  public password = '';
  public formulario: FormGroup;

  constructor(
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private api: ApiService
  ) {
    this.formulario = new FormGroup({
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    localStorage.clear();
    this.ngxLoader.stop();
    localStorage.setItem('isLogin', 'true')
  }

  redirect() {
    this.ngxLoader.start();
    let redirect = false;
    this.api.getUusarios().subscribe((resp: Usuario[]) => {
      resp.forEach((element: Usuario) => {
        if (
          element.usuario == this.formulario.value.usuario &&
          element.contrasena == this.formulario.value.contrasena
        ) {
          redirect = true;
        }
      });
      if (redirect) {
        localStorage.setItem('isAuth', 'true');
        this.router.navigate(['/inmobiliaria/home']);
      } else {
        Swal.fire(
          '',
          `<b>Credenciales incorrectas.</b>`,
          'warning'
        )
        this.ngxLoader.stop();
      }
    });
  }
}
