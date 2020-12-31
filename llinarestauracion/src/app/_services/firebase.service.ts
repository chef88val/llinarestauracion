import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item, Family, endpoints } from '../_models';
import { AuthenticationService } from '.';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  [x: string]: any;
  familyList: Family[] = [];
  isCompanyActive: boolean = true;

  constructor(private firestore: AngularFirestore,
    private authenticationService: AuthenticationService) { }

  getEndpoints() {
    return endpoints;
  }

  custom2Object(obj: any): Object {
    return Object.assign({}, obj);
  }
  getIsCompanyActive(data: any): string {
    let path = this.isCompanyActive ? this.authenticationService.currentUserValue.company.id : '';
    return path += data.join('/');
  }

  getFamilys(): Family[] {
    this.firestore.collection('family').snapshotChanges().subscribe((actions) => {
      actions.forEach((a) => {
        const data = a.payload.doc.data() as Family;
        this.familyList.push({
          id: a.payload.doc.id,
          Name: data.Name
        });
      });
    });
    return this.familyList;
  }

  getFamilyById(id: string, list2Search: Family[]): Family {
    return list2Search.find(i => i.id === id);
  }

  getFamily(documentId: string) {
    return this.firestore.collection('family').doc(documentId).snapshotChanges();
  }
  getItem(documentId: string) {
    return this.firestore.collection('item').doc(documentId).snapshotChanges();
  }
  getItems() {
    return this.firestore.collection('item').snapshotChanges();
  }

  createItem(item: any) {
    return this.firestore.collection('item').add(item);
  }

  updateItem(item: Item) {
    /*delete item.id;
    this.firestore.doc('items/' + item.id).update(item);*/
    this.firestore.collection('item').doc(item.id).set(item);
  }

  deleteItem(item: Item) {
    this.firestore.collection('item').doc(item.id).delete();
    // this.firestore.doc('items/' + itemId).delete();
  }
  getElement(path: string, documentId: string) {
    return this.firestore.collection(path).doc(documentId).snapshotChanges();
  }
  getElements(path: string) {
    return this.firestore.collection(path).get().toPromise();
  }

  createElement(path: string, item: any) {
    //return this.firestore.collection(path).add(Object.assign({}, item));
    return this.firestore.collection(path).add(this.custom2Object(item));
  }

  updateElement(path: string, item: any) {
    /*delete item.id;
    this.firestore.doc('items/' + item.id).update(item);*/
    this.firestore.collection(path).doc(item.id).set(item);

  }

  deleteElement(path: string, item: any) {
    this.firestore.collection(path).doc(item.id).delete();
    // this.firestore.doc('items/' + itemId).delete();
  }
  createChildElements(data: any[], item: any): any {
    let path = this.isCompanyActive ? 'x' : '';
    this.firestore.collection(path += data.join('/')).add(item);
  }
  updateChildElements(data: any[], item: any): any {
    let path = this.isCompanyActive ? 'x' : '';
    this.firestore.collection(path += data.join('/')).doc(item.id).set(item);
  }
  deleteChildElements(data: any[], item: any): any {
    this.firestore.collection(this.getIsCompanyActive(data)).doc(item.id);
  }
}
