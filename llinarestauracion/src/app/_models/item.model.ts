import { Family } from './family.model';
import { DocumentReference, CollectionReference } from '@angular/fire/firestore/interfaces';

export class Item {
    $key?: string;
    id?: string;
    Name: string;
    Family?: Family;
    familyName?: string;
    familyRef?: DocumentReference;
    familyColRef?: CollectionReference;
    price: number;   
    stock: number; 
    constructor(){
        
    }
}

export class QuoteItem {
    $key?: string;
    id?: string;
    item: Item;
    price: number;
    discount: number;
    qty: number;
    stock: number;
    constructor(){
        
    }
}