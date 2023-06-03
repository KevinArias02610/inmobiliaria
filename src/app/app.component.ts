import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isLogin: boolean = false;

  constructor(private ngxService: NgxUiLoaderService, private router: Router) {}

  ngOnInit(): void {
    let isLogin = localStorage.getItem('isLogin')
    this.isLogin = isLogin == 'true' ? true : false;
  }
}
