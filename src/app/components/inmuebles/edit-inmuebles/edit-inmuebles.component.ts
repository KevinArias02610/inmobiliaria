import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-inmuebles',
  templateUrl: './edit-inmuebles.component.html',
  styleUrls: ['./edit-inmuebles.component.css']
})
export class EditInmueblesComponent implements OnInit {

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.ngxLoader.stop()
  }

}
