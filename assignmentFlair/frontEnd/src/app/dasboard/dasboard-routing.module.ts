import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './container/home/home.component';
import { ProductsComponent } from './container/products/products.component';
import { ProfileComponent } from './container/profile/profile.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RandomGuard } from '../auth/guard/random.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
      },
  {
    path:'products/:id',
    component:ProductsComponent,
   
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
