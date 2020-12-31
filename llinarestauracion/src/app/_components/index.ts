export * from './cashflows/cashflow.component';
export * from './admin-portal/admin-portal.component';
export * from './orders/order.component';
export * from './stocks/stock.component';

export * from './alert/alert.component';
export * from './home/home.component';
export * from './dashboard/dashboard.component';
export * from './toolbar/toolbar.component';
export * from './register/register.component';
export * from './login/login.component';
export * from './items/items.component';
export * from './sales/sale.component'
export * from './reports/report.component';
export * from './dialog-box/dialog-box.component';
export * from './items/items.component';
export * from './items/item-detail/item-detail.component';
export * from './items/item-add/item-add.component';
export * from './items/item-edit/item-edit.component';
export * from './items/item-status/item-status.component'

export * from './super-admin-portal/super-admin-portal.component';
export * from './customers/customer.component';
export * from './customers/customer-detail/customer-detail.component';
export * from './quotes/quote.component';
export * from './deliverys/delivery.component';
export * from './controlmessages/controlmessages.component';
export * from './user/user.component';
export * from './own/own.component';
export * from './mat-confirm-dialog/mat-confirm-dialog.component';
export * from './company/company.component';


export interface ownComponent {
    displayWith(value: any): string ;
    applyFilter(event: Event): void;
    createElement(state: boolean): void;
    beforeSubmit(newElement: any): boolean;
    onSubmit();
    afterSubmit(action: boolean, newElement: any);
}
