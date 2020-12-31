import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Report, Item, Family, ElementItem } from 'src/app/_models';
import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { firestore } from 'firebase';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertService, FirebaseService } from 'src/app/_services';
import { isNull } from 'util';
import { ownComponent } from '..';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})


export class ReportComponent implements OnInit, ownComponent {
  @ViewChild('table') table: MatTable<any>;
  @ViewChild('table') table2: MatTable<any>;
  isLoadingResults = true;
  displayedColumns: string[] = ['Id', 'Fecha', 'Items'];
  displayedColumns2: string[] = ['Id', 'Name', 'QTY', 'Action'];
  elementList: Report[] = [];
  newElementItems: ElementItem[] = [];
  dataSource = new MatTableDataSource(this.elementList);
  dataSource2 = new MatTableDataSource(this.newElementItems);
  elementForm: FormGroup;
  isCreatingAction: boolean;
  itemList: any;
  loading = false;
  itemsList: Item[] = [];
  itemControl: FormControl = new FormControl('', [Validators.required]);
  qtyControl: FormControl = new FormControl('', [Validators.required]);
  fechaControl: FormControl = new FormControl('', [Validators.required]);

  elementActive: Report = new Report(); 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: FirebaseService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private alertService: AlertService) {
    this.itemsList = [];
    this.newElementItems = [];
    this.elementList = [];
  }
  beforeSubmit(newElement: any): boolean {
    throw new Error("Method not implemented.");
  }
  afterSubmit(action: boolean, newElement: any) {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.elementForm = this.formBuilder.group({
      fecha: [Date.now().toString(), Validators.required],
      item: ['', Validators.required],
      qty: [0, Validators.required],
      itemControl: this.itemControl,
      qtyControl: this.qtyControl,
      fechaControl: this.fechaControl
    });
    this.route.params.subscribe(params => {
      this.elementActive.id = params['id'];
    });
    this.getReports();
  }

  getReports() {
    // this.afs.collection('report').snapshotChanges().subscribe((actions) => {
    this.api.getElements('report').then((actions) => {
      actions.forEach(a => {
        const report = a.data() as Report;
        report.fechaValue = report.Fecha.toDate();
        const item: Item = new Item();
        /*this.afs.collection('item').doc(report.item.id).get().toPromise().then(dd => {
          console.log(dd.data());
          item.Name = dd.data().Name;
        });*/
        /*if(isNaN(report.tag)) report.tag  = 0;
        else report.tag += 1;*/
        report.tag = this.elementList.length;
        this.elementList.push(report);
      });
      this.isLoadingResults = false;
      // if (this.elementList.length > 0) {
      this.dataSource.data = this.elementList;
      // this.table.dataSource = this.elementList;
      // this.table.renderRows();
      // }
    }).catch(err => {
      this.alertService.error('No se han recuperado los datos');
      this.isLoadingResults = false;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.elementForm.controls; }
  updateForm(ev: any, idd: any, componentid: any) {
    if (ev.isUserInput) {
      if (componentid === 'itemControl') {
        // this.countryid = idd;
        this.elementForm.controls.itemControl.setValue(idd);
      } else {
      }
    }
  }
  displayWith(value: any): string {
    return typeof value === 'string' ? value : (value == null ? '' : value.text);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createElement(state: boolean) {
    if (state) {
      state = !this.elementList.some(element => {
        const tempElement =
          element.Fecha.toDate().getDay() + '/' +
          element.Fecha.toDate().getMonth() + '/' +
          element.Fecha.toDate().getFullYear();

        const temp = new Date().getDay() + '/' +
          new Date().getMonth() + '/' +
          new Date().getFullYear();
        return tempElement === temp;
      });
      if (state) {
        this.api.getElements('item').then((res) => {
          res.forEach(item => {
            const temp: Item = item.data() as Item;
            temp.id = item.id;
            this.itemsList.push(temp);
          });

          this.isLoadingResults = false;
          // this.alertService.success('Item creado...');
        }).catch(err => {
          this.isLoadingResults = false;
          // this.isCreatingAction = false;
          this.alertService.error('No se han recuperado los datos');
        });
      }
    }
    if (!state) { this.alertService.warning('Ya hay un reporte para el dia de hoy'); }

    this.isCreatingAction = state;
  }

  deleteElementItem(index: number) {
    this.newElementItems.splice(index, 1);
    this.dataSource2.data = this.newElementItems;
    this.table2.renderRows();
  }

  onSubmit() {
    const newItem = new ElementItem();
    newItem.qty = this.f.qtyControl.value;
    newItem.item = this.f.itemControl.value;
    newItem.tag = this.newElementItems.length;
    if (isNull(this.f.qtyControl.value) || isNull(this.f.itemControl.value)) {
      this.alertService.error('Faltan datos');
    } else if (this.f.qtyControl.value === '' || this.f.itemControl.value === '') {
      this.alertService.error('Faltan datos');
    } else {
      this.newElementItems.push(newItem);

      this.dataSource2.data = this.newElementItems;
      this.table2.renderRows();
    }
    // newItem.familyRef = this.afs.collection('family').doc(this.f.family.value.id).ref;
    // newItem.familyColRef = this.afs.collection('family').ref;
    // newItem.family.Name = this.f.family.value;
    // newItem.familyRef = this.afs.collection('family').doc(this.f.family.value.id);
    // this.afs.doc('family/'+this.f.family.value.id).get().subscribe(e=> console.log(e));
    /*this.api.createItem({
      Name: this.f.name.value,
      family: this.afs.collection('report').doc(this.f.family.value).ref
    }).then(res => {
      console.log(res.id);
      this.alertService.success('Item creado...');
      this.isCreatingAction = false;*/
    /*const family: Family = this.api.getFamilyById(this.f.family.value, this.familyList);
    this.itemList.push({
      id: res.id,
      Name: this.f.name.value,
      family,
      familyName: family.Name // this.api.getFamilyById(data.family.id).Name
    });*/
    /*  this.table.renderRows();
    });*/
  }

  /*switchTS2Date(ts: firestore.Timestamp): Date{
    return Date.
      year: ts.toDate().getFullYear(),
      month: ts.toDate().getMonth() + 1,
      day: ts.toDate().getDate()
    };
  }*/

  updateElement() {
    this.afs.collection('report').add({
      Fecha: firestore.Timestamp.now(),
      items: this.newElementItems.length
    }).then(res => {
      this.alertService.success('Reporte creado');
      const docID = res.id;
      const promises = [];
      this.newElementItems.forEach(item => {

        promises.push(this.afs.collection('report').doc(docID).collection('items').add({
          item: this.afs.collection('item').doc(item.item.id).ref,
          qty: item.qty
        }));
      });
      Promise.all(promises).then(ress => {
        this.alertService.success(`Todos los items han sido refrenciados`);
        this.isCreatingAction = false;
        this.getReports();
      });
    });

  }
}
