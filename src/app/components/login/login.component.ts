import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  redirect(){
    this.ngxLoader.start();
    localStorage.setItem('isAuth', 'true')
    this.router.navigate(['/inmobiliaria/home'])
  }
  

}
