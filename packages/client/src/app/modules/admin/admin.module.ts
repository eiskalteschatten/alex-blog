import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHeaderComponent } from '~/layout/admin-header/admin-header.component';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '~/shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
