import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from './_models/item.model';
import { Family } from './_models/family.model';
import { endpoints } from './_models/index';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService{
  [x: string]: any;
  familyList: Family[] = [];

  constructor(private firestore: AngularFirestore) { }

  getEndpoints(){
    return endpoints;
  }

  getFamilys(): Family[]{
    this.firestore.collection('famliy').snapshotChanges().subscribe((actions) => {
      actions.forEach((a) => {
        const data = a.payload.doc.data() as Family;
        this.familyList.push( {
          id: a.payload.doc.id,
          Nombre: data.Nombre
        });
      });
    });
    return this.familyList;
  }

  getFamilyById(id: string, list2Search: Family[]): Family {
    return list2Search.find(i => i.id === id);
  }

  getFamily(documentId: string){
    return this.firestore.collection('famliy').doc(documentId).snapshotChanges();
  }
  getItem(documentId: string){
    return this.firestore.collection('item').doc(documentId).snapshotChanges();
  }
  getItems(){
    return this.firestore.collection('item').snapshotChanges();
  }

  createItem(item: any){
    return this.firestore.collection('item').add(item);
  }

  updateItem(item: Item){
    /*delete item.id;
    this.firestore.doc('items/' + item.id).update(item);*/
    this.firestore.collection('item').doc(item.id).set(item);
  }

  deleteItem(item: Item){
    this.firestore.collection('item').doc(item.id).delete();
    // this.firestore.doc('items/' + itemId).delete();
  }
  getElement(path: string, documentId: string){
    return this.firestore.collection(path).doc(documentId).snapshotChanges();
  }
  getElements(path: string ){
    return this.firestore.collection(path).get().toPromise();
  }

  createElement(path: string, item: any){
    return this.firestore.collection(path).add(item);
  }

  updateElement(path: string, item: any){
    /*delete item.id;
    this.firestore.doc('items/' + item.id).update(item);*/
    this.firestore.collection(path).doc(item.id).set(item);

  }

  deleteElement(path: string, item: any){
    this.firestore.collection(path).doc(item.id).delete();
    // this.firestore.doc('items/' + itemId).delete();
  }
}
