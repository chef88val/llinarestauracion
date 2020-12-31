import { Customer } from '.';

export class Delivery {
    $key?: string;
    id?: string;
    Name: string;
    customer: Customer;
    deliveryName: string;
    tempDate: Date;
    realDate: Date;
    adress: string;
    
    constructor() {

    }
}
