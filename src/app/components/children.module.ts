import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenRoutingModule } from './children-routing.module';
import { MainComponent } from './main/main.component';
import { CreateInmueblesComponent } from './inmuebles/create-inmuebles/create-inmuebles.component';
import { EditInmueblesComponent } from './inmuebles/edit-inmuebles/edit-inmuebles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MainComponent,
    CreateInmueblesComponent,
    EditInmueblesComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ChildrenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ChildrenModule { }
