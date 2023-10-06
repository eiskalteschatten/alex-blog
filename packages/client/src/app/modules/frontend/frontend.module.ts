import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '~/layout/header/header.component';

import { FrontendRoutingModule } from './frontend-routing.module';
import { FrontendComponent } from './frontend.component';
import { SharedModule } from '~/shared/shared.module';

@NgModule({
  declarations: [
    FrontendComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FrontendRoutingModule
  ]
})
export class FrontendModule { }
