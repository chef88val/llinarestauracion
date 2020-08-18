import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { ItemsComponent} from './_components/items/items.component';
import { HomeComponent} from './_components/home/home.component';
import { ItemAddComponent} from './_components/item-add/item-add.component';
import { ItemDetailComponent} from './_components/item-detail/item-detail.component';
import { ItemEditComponent} from './_components/item-edit/item-edit.component';
import { ItemStatusComponent} from './_components/item-status/item-status.component';
import { ReportComponent} from './_components/report/report.component';


import { LoginComponent} from './_components/login/login.component';
import { RegisterComponent} from './_components/register/register.component';
import { AuthGuard } from './_services';
import { DashboardComponent } from './_components';

import { CashflowComponent, PedidosComponent, StockComponent, AdminPortalComponent } from './_components';


const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'register',
    component: RegisterComponent 
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'report',
    component: ReportComponent,
    data: { title: 'Reporte diario' }
  },
  {
    path: 'items',
    component: ItemsComponent,
    data: { title: 'List of Items' }
  },
  {
    path: 'item-details/:id',
    component: ItemDetailComponent,
    data: { title: 'Item Details' }
  },
  {
    path: 'item-stat',
    component: ItemStatusComponent,
    data: { title: 'Item Statistic' }
  },
  {
    path: 'add-item',
    component: ItemAddComponent,
    data: { title: 'Add Item' }
  },
  {
    path: 'edit-item/:id',
    component: ItemEditComponent,
    data: { title: 'Edit Item' }
  },
  {
    path: 'dashBoard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'stock',
    component: StockComponent,
    data: { title: 'Stock' }
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    data: { title: 'Pedidos' }
  },
  {
    path: 'cashFlow',
    component: CashflowComponent,
    data: { title: 'Flujo de caja (diario)' }
  },
  {
    path: 'adminPortal',
    component: AdminPortalComponent,
    data: { title: 'Portal del admn.' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
