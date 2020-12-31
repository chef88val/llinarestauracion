import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';

@NgModule({
  imports: [
    CommonModule,
    SaleRoutingModule
  ],
  declarations: [SaleComponent]
})
export class SaleModule { }