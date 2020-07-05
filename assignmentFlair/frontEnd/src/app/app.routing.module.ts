import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { RandomGuard } from './auth/guard/random.guard';
import { DasboardModule } from './dasboard/dasboard.module';
import { HomeComponent } from './dasboard/container/home/home.component';
import { ProductsComponent } from './dasboard/container/products/products.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'secret-random-number',
    loadChildren: () =>DasboardModule,
    canActivate: [RandomGuard],
    canLoad: [RandomGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RandomGuard],
    canLoad: [RandomGuard]
      },
  {
    path:'products',
    component:ProductsComponent,
    canActivate: [RandomGuard],
    canLoad: [RandomGuard]
   
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
