import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { trace } from '@angular/fire/performance';
import { AngularFireDatabase } from '@angular/fire/database';
import { Item } from '../../_models/item.model';
import { ApiService } from 'src/app/api.service';
import { Family } from 'src/app/_models/family.model';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { isNull } from 'util';
import { isEmpty } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/functions';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @ViewChild('table') table: MatTable<any>;
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;
  familyCollectionR: AngularFirestoreCollection<Family>;
  familys: Observable<Family[]>;
  private itemsFamily: AngularFirestoreDocument<Item>;
  displayedColumns: string[] = ['Nombre', 'familiaNombre'];
  itemList: Item[] = [];
  familyList: Family[];
  isLoadingResults = true;
  isCreatingAction = false;
  itemCollectionRef: AngularFirestoreDocument<Item>;
  item$: Observable<Item[]>;
  dataSource = new MatTableDataSource(this.itemList);
  dialog: any;

  elementForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  nombreControl: FormControl = new FormControl('', [Validators.required]);
  familiaControl: FormControl = new FormControl('', [Validators.required]);
  constructor(
    private formBuilder: FormBuilder,
    private api: FirebaseService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private alertService: AlertService,
    private fns: AngularFireFunctions
    ) {
    /*this.familyCollectionRef = this.api.collection<Family>('famliy');
    this.family = this.familyCollectionRef.valueChanges();*/
    /*this.itemCollectionRef = api.doc<Item>('user/david');
    this.item$ = this.itemCollectionRef.collection<Family>('famliy').valueChanges();
    this.items = api.collection<Item>('item');*/
    this.familyList = [];
    this.familyList.push(new Family());
    this.familyList = this.api.getFamilys();
  }

  ngOnInit(): void {
    console.log('Suebn los cambios????');
    const callable = this.fns.httpsCallable('sendEmail');
    callable({ dest: 'jsm.multimedia@gmail.com' }).toPromise().then(res => {
      // Read result of the Cloud Function.
      //var sanitizedMessage = result.data.text;
      console.log(res);
    }).catch(error => {
      // Getting the Error details.
      /*var code = error.code;
      var message = error.message;
      var details = error.details;   */
      console.log(error);
    });
    this.elementForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      familia: ['', Validators.required],
      nombreControl: this.nombreControl,
      familiaControl: this.familiaControl
    });
    this.afs.collection('item').snapshotChanges().subscribe((actions) => {
      actions.forEach((a) => {
        const data = a.payload.doc.data() as Item;

        const familia: Family = new Family();
        this.afs.collection('famliy').doc(data.familia.id).get().toPromise().then(dat => {
          familia.id = data.familia.id;
        }).then(dd => {
          this.afs.collection('famliy').doc(data.familia.id).get().toPromise().then(dd => {
            familia.Nombre = dd.data().Nombre;
          });
        });
        this.itemList.push({
          id: a.payload.doc.id,
          Nombre: data.Nombre,
          familia,
          familiaNombre: familia.Nombre // this.api.getFamilyById(data.familia.id).Nombre
        });
      });
      this.isLoadingResults = false;
      this.dataSource.data = this.itemList;
      // this.table.dataSource = this.itemList;
      // this.table.renderRows();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addElement(state: boolean) {
    if (this.familyList.length < 1) {
      this.afs.collection('family').get().subscribe(ac => {
        ac.forEach(a => {
        });
      });
      /*this.api.getElements('family').then(actions => {
        console.log(actions);
        actions.forEach(a => {
          const data = a.payload.doc.data() as Family;
          this.familyList.push(data);
        });
      });*/
    } else {
      this.f.familiaControl.patchValue(this.familyList[0].id);
      this.f.familiaControl.setValue(this.familyList[0]);
      this.isCreatingAction = state;
    }
  }
  /*

  addCoffee = item => this.itemOrder.push(item);

  removeCoffee = item => {
    let index = this.itemOrder.indexOf(item);
    if (index > -1) this.itemOrder.splice(index, 1);
  };
  */

  // convenience getter for easy access to form fields
  get f() { return this.elementForm.controls; }
  onSubmit() {
    const newItem = new Item();
    newItem.Nombre = this.f.nombreControl.value;
    // newItem.familiaRef = this.afs.collection('famliy').doc(this.f.familia.value.id).ref;
    // newItem.familiaColRef = this.afs.collection('famliy').ref;
    // newItem.familia.Nombre = this.f.familia.value;
    // newItem.familiaRef = this.afs.collection('famliy').doc(this.f.familia.value.id);
    // this.afs.doc('famliy/'+this.f.familia.value.id).get().subscribe(e=> console.log(e));
    if (isNull(this.f.familiaControl.value) || isNull(this.f.nombreControl.value)){
      this.alertService.error('Faltan datos');
    } else if (this.f.familiaControl.value === '' || this.f.nombreControl.value === ''){
      this.alertService.error('Faltan datos');
    } else {
      this.api.createItem({
        Nombre: this.f.nombreControl.value,
        familia: this.afs.collection('famliy').doc(this.f.familiaControl.value).ref
      }).then(res => {
        this.alertService.success('Item creado...');
        this.isCreatingAction = false;
        const familia: Family = this.api.getFamilyById(this.f.familiaControl.value, this.familyList);
        this.itemList.push({
          id: res.id,
          Nombre: this.f.nombreControl.value,
          familia,
          familiaNombre: familia.Nombre // this.api.getFamilyById(data.familia.id).Nombre
        });
        this.table.renderRows();
      });
    }
  }

}
