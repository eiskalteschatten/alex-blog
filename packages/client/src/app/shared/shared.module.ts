import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';

@NgModule({
  declarations: [
    InputComponent,
    CardComponent,
    CardComponent,
    ButtonComponent,
    SpinnerComponent,
    AccountMenuComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    CardComponent,
    ButtonComponent,
    SpinnerComponent,
    AccountMenuComponent,
  ],
})
export class SharedModule {}
