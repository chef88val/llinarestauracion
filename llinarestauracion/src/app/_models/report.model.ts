import { Item } from './item.model';
import { firestore } from 'firebase';

export class Report {
    $key?: string;
    id: string;
    Fecha: firestore.Timestamp;
    fechaValue: Date;
    item: Item[];
    tag: number;
    items: number;
    constructor(){
        
    }
}
