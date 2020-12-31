import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AdminPortalComponent,
  CompanyComponent,
  CustomerDetailComponent,
  CustomerComponent,
  CashflowComponent,
  DashboardComponent,
  DeliveryComponent,
  HomeComponent,
  ItemsComponent,
  ItemAddComponent,
  ItemDetailComponent,
  ItemEditComponent,
  ItemStatusComponent,
  LoginComponent,
  OrderComponent,
  RegisterComponent,
  ReportComponent,
  SaleComponent,
  StockComponent,
  QuoteComponent,
} from './_components';
import { PageNotFoundComponent } from "./_helpers/page-not-found/page-not-found.component";
import { PreloadAllModules } from '@angular/router';

import { AuthGuard } from './_services';

const appRoutes: Routes = [
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
    data: { title: 'Home' },
    canActivate: [AuthGuard]
  },
  {
    path: 'company',
    component: CompanyComponent,
    data: { title: 'Company' },
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportComponent,
    data: { title: 'Reporte diario' },
    canActivate: [AuthGuard]
  },
  {
    path: 'report/new',
    component: ReportComponent,
    data: { title: 'Nuevo Reporte' },
    canActivate: [AuthGuard]
  },
  {
    path: 'report/:id',
    component: ReportComponent,
    data: { title: 'Reporte diario' },
    canActivate: [AuthGuard]
  },
  {
    path: 'report/:id/edit',
    component: ReportComponent,
    data: { title: 'Reporte diario' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    component: CustomerComponent,
    data: { title: 'Lista de productos' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id',
    component: CustomerDetailComponent,
    data: { title: 'Cliente Details' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-stat',
    component: CustomerComponent,
    data: { title: 'Cliente Statistic' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/new',
    component: CustomerComponent,
    data: { title: 'Add Cliente' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id/edit',
    component: CustomerComponent,
    data: { title: 'Edit Cliente' },
    canActivate: [AuthGuard]
  },
  {
    path: 'deliverys',
    component: DeliveryComponent,
    data: { title: 'Lista de productos' },
    canActivate: [AuthGuard]
  },
  {
    path: 'delivery/:id',
    component: DeliveryComponent,
    data: { title: 'Item Details' },
    canActivate: [AuthGuard]
  },
  {
    path: 'delivery-stat',
    component: DeliveryComponent,
    data: { title: 'Item Statistic' },
    canActivate: [AuthGuard]
  },
  {
    path: 'delivery/new',
    component: DeliveryComponent,
    data: { title: 'Add Item' },
    canActivate: [AuthGuard]
  },
  {
    path: 'delivery/:id/edit',
    component: DeliveryComponent,
    data: { title: 'Edit Item' },
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrderComponent,
    data: { title: 'Lista de productos' },
    canActivate: [AuthGuard]
  },
  {
    path: 'order/:id',
    component: OrderComponent,
    data: { title: 'Item Details' },
    canActivate: [AuthGuard]
  },
  {
    path: 'order-stat',
    component: OrderComponent,
    data: { title: 'Item Statistic' },
    canActivate: [AuthGuard]
  },
  {
    path: 'order/new',
    component: OrderComponent,
    data: { title: 'Add Item' },
    canActivate: [AuthGuard]
  },
  {
    path: 'order/:id/edit',
    component: OrderComponent,
    data: { title: 'Edit Item' },
    canActivate: [AuthGuard]
  },
  {
    path: 'sales',
    component: SaleComponent,
    data: { title: 'Lista de productos' },
    canActivate: [AuthGuard]
  },
  {
    path: 'sale/:id',
    component: SaleComponent,
    data: { title: 'Item Details' },
    canActivate: [AuthGuard]
  },
  {
    path: 'sale-stat',
    component: SaleComponent,
    data: { title: 'Item Statistic' },
    canActivate: [AuthGuard]
  },
  {
    path: 'sale/new',
    component: SaleComponent,
    data: { title: 'Add Item' },
    canActivate: [AuthGuard]
  },
  {
    path: 'sale/:id/edit',
    component: SaleComponent,
    data: { title: 'Edit Item' },
    canActivate: [AuthGuard]
  },
  {
    path: 'items',
    component: ItemsComponent,
    data: { title: 'Lista de productos' },
    canActivate: [AuthGuard]
  },
  {
    path: 'item/:id',
    component: ItemDetailComponent,
    data: { title: 'Item Details' },
    canActivate: [AuthGuard]
  },
  {
    path: 'item-stat',
    component: ItemStatusComponent,
    data: { title: 'Item Statistic' },
    canActivate: [AuthGuard]
  },
  {
    path: 'item/new',
    component: ItemAddComponent,
    data: { title: 'Add Item' },
    canActivate: [AuthGuard]
  },
  {
    path: 'item/:id/edit',
    component: ItemEditComponent,
    data: { title: 'Edit Item' },
    canActivate: [AuthGuard]
  },
  {
    path: 'dashBoard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [AuthGuard]
  },
  {
    path: 'stock',
    component: StockComponent,
    data: { title: 'Stock' },
    canActivate: [AuthGuard]
  },
  {
    path: 'stock/new',
    component: StockComponent,
    data: { title: 'Nuevo tock' },
    canActivate: [AuthGuard]
  },
  {
    path: 'stock/:id',
    component: StockComponent,
    data: { title: 'Stock ' },
    canActivate: [AuthGuard]
  },
  {
    path: 'stock/:id/edit',
    component: StockComponent,
    data: { title: 'Stock ' },
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos',
    component: QuoteComponent,
    data: { title: 'Pedidos' },
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos/:id',
    component: QuoteComponent,
    data: { title: 'Pedido ' },
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos/new',
    component: QuoteComponent,
    data: { title: 'Nuevo Pedido' },
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos/:id/edit',
    component: QuoteComponent,
    data: { title: 'Pedido ' },
    canActivate: [AuthGuard]
  },
  {
    path: 'cashFlow',
    component: CashflowComponent,
    data: { title: 'Flujo de caja (diario)' },
    canActivate: [AuthGuard]
  },
  {
    path: 'cashFlow/new',
    component: CashflowComponent,
    data: { title: 'Nuevo flujo de caja (diario)' },
    canActivate: [AuthGuard]
  },
  {
    path: 'adminPortal',
    component: AdminPortalComponent,
    data: { title: 'Portal del admn.' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id',
    component: CustomerDetailComponent,
    data: { title: 'Detalle del cliente' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/new',
    component: CustomerDetailComponent,
    data: { title: 'Detalle del cliente' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id/edit',
    component: CustomerDetailComponent,
    data: { title: 'Detalle del cliente' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id/:tag',
    component: CustomerDetailComponent,
    data: { title: 'Detalle del cliente' },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '_cashflows',
    loadChildren: () => import('./_components/cashflows/cashflow.module').then(m => m.CashflowModule)
  },
  {
    path: '_deliverys',
    loadChildren: () => import('./_components/deliverys/delivery.module').then(m => m.DeliveryModule)
  },
  {
    path: '_customers',
    loadChildren: () => import('./_components/customers/customer.module').then(m => m.CustomerModule)
  },
  {
    path: '_orders',
    loadChildren: () => import('./_components/orders/order.module').then(m => m.OrderModule)
  },
  {
    path: '_stocks',
    loadChildren: () => import('./_components/stocks/stock.module').then(m => m.StockModule)
  },
  {
    path: '_quotes',
    loadChildren: () => import('./_components/quotes/quote.module').then(m => m.QuoteModule)
  },
  {
    path: '_sales',
    loadChildren: () => import('./_components/sales/sale.module').then(m => m.SaleModule)
  },
  {
    path: '_reports',
    loadChildren: () => import('./_components/reports/report.module').then(m => m.ReportModule)
  },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
