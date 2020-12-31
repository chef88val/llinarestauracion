import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashflowRoutingModule } from './cashflow-routing.module';
import { CashflowComponent } from './cashflow.component';

@NgModule({
  imports: [
    CommonModule,
    CashflowRoutingModule
  ],
  declarations: [CashflowComponent]
})
export class CashflowModule { }