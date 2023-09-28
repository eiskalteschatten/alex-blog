import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedMaterialModule } from '../../shared/modules/material.module';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedMaterialModule
  ]
})
export class AccountModule { }
