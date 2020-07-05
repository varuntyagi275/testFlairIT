import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DasboardRoutingModule } from './dasboard-routing.module';
import { HomeComponent } from './container/home/home.component';
import { ProductsComponent } from './container/products/products.component';
import { ProfileComponent } from './container/profile/profile.component';


import {MatSidenavModule} from '@angular/material/sidenav'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ProductsComponent, ProfileComponent],
  imports: [
    CommonModule,
    DasboardRoutingModule,
    MatSidenavModule,
    ReactiveFormsModule
  ]
})
export class DasboardModule { }
