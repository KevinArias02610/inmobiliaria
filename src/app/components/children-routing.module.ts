import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { EditInmueblesComponent } from './inmuebles/edit-inmuebles/edit-inmuebles.component';
import { CreateInmueblesComponent } from './inmuebles/create-inmuebles/create-inmuebles.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {path: '', component: NavbarComponent, children: [
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {path: 'edit/:id', component: EditInmueblesComponent, canActivate: [AuthGuard] },
    {path: 'create', component: CreateInmueblesComponent, canActivate: [AuthGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildrenRoutingModule { }
