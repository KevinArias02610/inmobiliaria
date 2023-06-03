import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ){ }
  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isAuth') == 'true' ? true : false;
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      Swal.fire(
        '',
        `<b>Acceso denegado</b>`,
        'warning'
      )
      return false;
    }
  }
  
}
