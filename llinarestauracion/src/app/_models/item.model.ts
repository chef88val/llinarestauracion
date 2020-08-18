import { Family } from './family.model';
import { DocumentReference, CollectionReference } from '@angular/fire/firestore/interfaces';

export class Item {
    id?: string;
    Nombre: string;
    familia?: Family;
    familiaNombre?: string;
    familiaRef?: DocumentReference;
    familiaColRef?: CollectionReference;
}
