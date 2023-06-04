import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.ngxLoader.stop();
    localStorage.removeItem('isLogin');
  }

  singOut() {
    this.ngxLoader.start();
    this.router.navigate(['/login']);
  }

  redirect() {
    this.ngxLoader.start();
    this.router.navigate(['/inmobiliaria/home']).then(()=>{
      this.ngxLoader.stop()
    });
  }
}
