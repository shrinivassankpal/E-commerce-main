import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {path:"",component:LandingComponent,children:[
    {path:"dashboard",component:DashboardComponent},
    {path:"orders",component:OrdersComponent},
    {path:"products",component:ProductsComponent},
    {path:"addproduct",component:AddproductComponent},
    {path:"addproduct/:id",component:AddproductComponent},
    {path:"**",component:DashboardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
