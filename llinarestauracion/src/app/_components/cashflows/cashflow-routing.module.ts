import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashflowComponent } from './cashflow.component';


const routes: Routes = [
  {
    path: '',
    component: CashflowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashflowRoutingModule { }