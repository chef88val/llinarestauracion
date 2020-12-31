import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { trace } from '@angular/fire/performance';
import { AngularFireDatabase } from '@angular/fire/database';
import { Item } from '../../_models/item.model';
import { Family } from 'src/app/_models/family.model';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService, ApiService, FirebaseService } from 'src/app/_services';
import { isNull } from 'util';
import { isEmpty } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ownComponent } from '..';
import { endpoints } from 'src/app/_models';
@Component({
  selector: 'app-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, ownComponent {

  familyList: Family[];
  elementList: Item[] = [];
  @ViewChild('table') table: MatTable<any>;
  elementForm: any;
  displayedColumns: string[] = ['Nombre', 'Familia', 'Precio', 'Stock'];
  isLoadingResults = true;
  isCreatingAction = false;
  item$: Observable<Item[]>;
  dataSource = new MatTableDataSource(this.elementList);
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;
  familyCollectionR: AngularFirestoreCollection<Family>;
  familys: Observable<Family[]>;
  private itemsFamily: AngularFirestoreDocument<Item>;
  itemCollectionRef: AngularFirestoreDocument<Item>;
  dialog: any;

  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private api: FirebaseService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private alertService: AlertService,
    private fns: AngularFireFunctions,
    private changeDetectorRef: ChangeDetectorRef) {
      changeDetectorRef.detach()

      /*this.familyCollectionRef = this.api.collection<Family>(endpoints._family);
      this.family = this.familyCollectionRef.valueChanges();*/
      /*this.itemCollectionRef = api.doc<Item>('user/david');
      this.item$ = this.itemCollectionRef.collection<Family>(endpoints._family).valueChanges();
      this.items = api.collection<Item>('item');*/
      this.familyList = [];
  }
  clickHandler() {
    this.changeDetectorRef.detectChanges()
  }
  //this.familyList = this.api.getFamilys();

  displayWith(value: any): string {
    throw new Error("Method not implemented.");
  }
  createElement(state: boolean): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    console.log('Suebn los cambios????');

    this.elementForm = this.formBuilder.group({
      name: ['', Validators.required],
      family: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    });
    this.afs.collection('item').snapshotChanges().subscribe((actions) => {
      actions.forEach((a) => {
        const data = a.payload.doc.data() as Item;

        const family: Family = new Family();
        this.afs.collection(endpoints._family).doc(data.Family.id).get().toPromise().then(dat => {
          family.id = data.Family.id;
        }).then(dd => {
          this.afs.collection(endpoints._family).doc(data.Family.id).get().toPromise().then(dd => {
            family.Name = dd.data().Name;
          });
        });
        this.elementList.push({
          id: a.payload.doc.id,
          Name: data.Name,
          Family: family,
          familyName: family.Name, // this.api.getFamilyById(data.Family.id).Name
          price: data.price,
          stock: data.stock
        });
      });
      this.isLoadingResults = false;
      this.dataSource.data = this.elementList;
      // this.table.dataSource = this.elementList;
      // this.table.renderRows();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addElement(state: boolean) {

    this.isCreatingAction = state;
    if (this.familyList.length < 1) {
      /* const newF: Family = new Family();
       newF.id = '123456';
       newF.Name = 'test';
       this.familyList.push(newF);*/
      this.api.getElements(endpoints._family).then(actions => {
        console.log(actions);
        actions.forEach(a => {
          const data = a.data() as Family;
          data.id = a.id;
          this.familyList.push(data);
        });
      });
    } else {
      this.f.family.patchValue(this.familyList[0].id);
      this.f.family.setValue(this.familyList[0]);
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
  beforeSubmit(newElement: Item): boolean {
    this.dataSource.filter = newElement.Name.trim().toLowerCase();
    return this.dataSource.data.length > 0
  }
  onSubmit() {
    const newElement = new Item();
    newElement.Name = this.f.name.value;;
    if (this.beforeSubmit(newElement)) {
      this.alertService.warning(`existe un item con el nombre ${newElement.Name}`, true)
      this.alertService.getAlert().subscribe(
        (data) => {
          console.log(data);
          if (data != undefined)
            this.afterSubmit(data.buttonAction, newElement);
        });
    } else this.afterSubmit(true, newElement);
  }

  afterSubmit(action: boolean, newElement: any) {
    if (action) {
      // newElement.familyRef = this.afs.collection(endpoints._family).doc(this.f.family.value.id).ref;
      // newElement.familyColRef = this.afs.collection(endpoints._family).ref;
      // newElement.family.Name = this.f.family.value;
      // newElement.familyRef = this.afs.collection(endpoints._family).doc(this.f.family.value.id);
      // this.afs.doc('family/'+this.f.family.value.id).get().subscribe(e=> console.log(e));
      if (isNull(this.f.family.value) || isNull(this.f.name.value)) {
        this.alertService.error('Faltan datos');
      } else if (this.f.family.value === '' || this.f.name.value === '') {
        this.alertService.error('Faltan datos');
      } else {
        this.api.createItem({
          Name: this.f.name.value,
          family: this.afs.collection(endpoints._family).doc(this.f.family.value).ref
        }).then(res => {
          this.alertService.success('Item creado...');
          this.isCreatingAction = false;
          const family: Family = this.api.getFamilyById(this.f.family.value, this.familyList);
          this.elementList.push({
            id: res.id,
            Name: this.f.name.value,
            Family: family,
            familyName: family.Name, // this.api.getFamilyById(data.Family.id).Name
            price: this.f.price.value,
            stock: this.f.stock.value
          });
          this.table.renderRows();

        });
      }
    }
  }
}
