import { QuoteItem } from './item.model';
import { Customer } from './customer.model';

export class Order {
    $key?: string;
    id?: string;
    Name: string;
    priceTotal: number;
    itemsTotal: number;
    items: QuoteItem[];
    customer: Customer;
    dataCustomer: string;
    tax: number;
    discount: number;
    
    constructor(){
        
    }

    get totalPrice(): number {
        return this.items.reduce((accumulator, item) => { return accumulator + item.price }, 0);
    }

    get totalItems(): number {
        return this.items.length;
    }
}
