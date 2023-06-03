import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ngxLoader.stop();
  }

  singOut(){
    this.router.navigate(['/login']);
  }

}
