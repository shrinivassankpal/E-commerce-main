import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { AdminModule } from './admin/admin.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent ,pathMatch:"full"},
  {path:"products",component:ProductsComponent},
  {path:"products/:category",component:ProductsComponent},
  {path:"login",component:LoginComponent},
  {path:"product/:id",component:ProductComponent},
  {path:"cart",component:CartComponent},
  {path:"admin",canActivate:[AuthGuard] ,loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:"checkout",component:CheckoutComponent},
  {path:"**",redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
