import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenRoutingModule } from './children-routing.module';
import { MainComponent } from './main/main.component';
import { CreateInmueblesComponent } from './inmuebles/create-inmuebles/create-inmuebles.component';
import { EditInmueblesComponent } from './inmuebles/edit-inmuebles/edit-inmuebles.component';


@NgModule({
  declarations: [
    MainComponent,
    CreateInmueblesComponent,
    EditInmueblesComponent
  ],
  imports: [
    CommonModule,
    ChildrenRoutingModule
  ]
})
export class ChildrenModule { }
