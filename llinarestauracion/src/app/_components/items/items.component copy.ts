import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Item } from '../../_models/item.model';
import { Family } from 'src/app/_models';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, FirebaseService } from 'src/app/_service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, ownComponent {

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;
  familyCollectionR: AngularFirestoreCollection<Family>;
  familys: Observable<Family[]>;
  displayedColumns: string[] = ['Nombre', 'familiaNombre'];
  itemList: Item[] = [];
  familyList: Family[];
  isLoadingResults = true;
  isCreatingAction = false;
  itemCollectionRef: AngularFirestoreDocument<Item>;
  item$: Observable<Item[]>;
  dataSource = new MatTableDataSource(this.itemList);
  dialog: any;

  itemForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private api: FirebaseService,
    private afs: AngularFirestore,
    private alertService: AlertService
    ) {
    /*this.familyCollectionRef = this.api.collection<Family>('family');
    this.family = this.familyCollectionRef.valueChanges();*/
    /*this.itemCollectionRef = api.doc<Item>('user/david');
    this.item$ = this.itemCollectionRef.collection<Family>('family').valueChanges();
    this.items = api.collection<Item>('item');*/
    this.familyList = [];
    this.familyList.push(new Family());
    this.familyList = this.api.getFamilys();
  }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      familia: ['', Validators.required]
    });
    this.afs.collection('item').snapshotChanges().subscribe((actions) => {
      actions.forEach((a) => {
        const data = a.payload.doc.data() as Item;

        const familia: Family = new Family();
        this.afs.collection('family').doc(data.familia.id).get().toPromise().then(dat => {
          console.log(dat.data().Nombre);
          console.log(data.familia.id);
          familia.id = data.familia.id;
        }).then(() => {
          this.afs.collection('family').doc(data.familia.id).get().toPromise().then(dd => {
            console.log(dd.data());
            familia.Nombre = dd.data().Nombre;
          });
        });
        this.itemList.push({
          id: a.payload.doc.id,
          Nombre: data.Nombre,
          familia,
          familiaNombre: familia.Nombre // this.api.getFamilyById(data.familia.id).Nombre
        });
        console.log(this.itemList);
      });
      console.log(this.itemList);
      this.isLoadingResults = false;

      this.table.dataSource = this.itemList;
      this.table.renderRows();    });
    console.log(this.itemList);

    /* console.log(this.familyList.find(e => e.id === data.familia.id).Nombre);
    console.log(this.db.database.ref('/family').ref);
    console.log(this.db.database.ref('/family').key);
    console.log(this.db.database.ref('/family').parent);
    console.log(this.db.database.ref('/family').root);
    console.log(this.db.database.ref('family/'+data.familia.id));
    console.log(this.db.database.ref('family/'+data.familia.id).toString());
    console.log(this.db.database.ref('family/'+data.familia.id).key);
    console.log(this.db.database.ref('family/'+data.familia.id).parent);
    console.log(this.db.database.ref('family/'+data.familia.id).ref);
    console.log(this.db.database.ref('family/'+ data.familia.id).child('/Nombre'));*/

    /*this.familys.subscribe(locationData => {
      this.locationData = locationData
    })*/



    /*this.api.getCases()
    .subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });*/
    // this.api.getItems().subscribe((res: any) => {
    /*console.log(this.familyCollectionRef);
    console.log(this.family$);
    console.log(this.itemCollectionRef);
    console.log(this.item$);

    this.family$.subscribe(data => {
      console.log(data);
      data.map(e => {
        console.log(e);

        this.api.doc('family/' + e.Nombre).get().subscribe(data => {
        console.log(data.id);
        console.log(data.ref);
      });
      });
    });*/

    /*this.api.getItems().subscribe(data => {
      data.map(e => {
        // this.api.doc<Item>('item/');
        console.log(e.payload.doc.id);
        console.log(e.payload.doc.ref.parent);
        console.log(e.payload.doc.ref.path);
        console.log(e.payload.doc.ref.firestore);
        console.log(e.payload.doc.ref.collection('family').path);
        console.log(e.payload.doc.ref.collection('family').parent);
        console.log(e.payload.doc.ref.collection('family').firestore);
        console.log(e.payload.doc.ref.collection('family').doc());
        console.log(e.payload.doc.ref.collection('family'));
        console.log(e.payload.doc.ref.collection('family').get());
        console.log(e.payload.doc.data());
      });
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });*/
  }
  /*openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add'){
        this.addRowData(result.data);
      }else if (result.event === 'Update'){
        this.updateRowData(result.data);
      }else if (result.event === 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    const d = new Date();
    this.itemList.push({
      // id: d.getTime(),
      // name: row_obj.name
    });
    this.table.renderRows();

  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== row_obj.id;
    });
  }
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addItem(state: boolean) {
    if (this.familyList.length < 1) {
      this.afs.collection('family').get().subscribe(ac => {
        console.log(ac);
        ac.forEach(a => {
          console.log(a.data());
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
      this.f.familia.patchValue(this.familyList[0]);
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
  get f() { return this.itemForm.controls; }
  onSubmit() {
    const newItem = new Item();
    newItem.Nombre = this.f.name.value;
    // newItem.familiaRef = this.afs.collection('family').doc(this.f.familia.value.id).ref;
    // newItem.familiaColRef = this.afs.collection('family').ref;
    // newItem.familia.Nombre = this.f.familia.value;
    // newItem.familiaRef = this.afs.collection('family').doc(this.f.familia.value.id);
    // this.afs.doc('family/'+this.f.familia.value.id).get().subscribe(e=> console.log(e));
    this.api.createItem({
      Nombre: this.f.name.value,
      familia: this.afs.collection('family').doc(this.f.familia.value.id).ref
    }).then(res => {
      console.log(res.id);
      this.alertService.success('Item creado...');
      this.isCreatingAction = false;
      const familia: Family = this.f.familia.value;
      this.itemList.push({
        id: res.id,
        Nombre: this.f.name.value,
        familia,
        familiaNombre: familia.Nombre // this.api.getFamilyById(data.familia.id).Nombre
      });
      this.table.dataSource = this.itemList;
      this.table.renderRows();

    });
  }

}
