import { Customer } from '.';

export class Cashflow {    
    $key?: string;
    id?: string;
    Name: string;
    customer: Customer;
    qty: number;
    when: Date;
    constructor(){
        
    }
}
