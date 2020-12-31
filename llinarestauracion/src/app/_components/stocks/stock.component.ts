import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Item, Family, Stock, Delivery } from 'src/app/_models';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService, AlertService } from 'src/app/_services';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireFunctions } from '@angular/fire/functions';
import { isNull } from 'util';
import { ownComponent } from '..';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
//Stock
export class StockComponent implements OnInit, ownComponent {

  @ViewChild('table') table: MatTable<any>;
  elementForm: any;
  itemList: Item[] = [];
  displayedColumns: string[] = ['Name', 'familyName'];
  isLoadingResults = true;
  isCreatingAction = false;
  item$: Observable<Item[]>;
  dataSource = new MatTableDataSource(this.itemList);
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;
  elementActive: Stock = new Stock();
  componentName = { singular: 'Stock', plural: 'Stock' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: FirebaseService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private alertService: AlertService,
    private fns: AngularFireFunctions, 
    private changeDetectorRef: ChangeDetectorRef) {
    changeDetectorRef.detach()
  }
  clickHandler() {
    this.changeDetectorRef.detectChanges()
  }
  displayWith(value: any): string {
    throw new Error("Method not implemented.");
  }
  createElement(state: boolean): void {
    throw new Error("Method not implemented.");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addElement(state: boolean) {
    this.isCreatingAction = state;
  }
  get f() { return this.elementForm.controls; }

  ngOnInit(): void {
    this.elementForm = this.formBuilder.group({
      name: ['', Validators.required],
      family: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    });
    this.route.params.subscribe(params => {
      this.elementActive.id = params['id'];
    });
  }
  beforeSubmit(newElement: Stock): boolean {
    //this.dataSource.filter = newElement.Name.trim().toLowerCase();
    return this.dataSource.data.length > 0
  }
  onSubmit() {
    const newElement = new Stock();
    /*newElement.Name = this.f.name.value;
    newElement.Phone = this.f.phone.value;
    newElement.Email = this.f.email.value;
    newElement.Surname = this.f.surname.value;*/

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
      // newElement.familyRef = this.afs.collection('family').doc(this.f.Family.value.id).ref;
      // newElement.familyColRef = this.afs.collection('family').ref;
      // newElement.Family.Name = this.f.Family.value;
      // newElement.familyRef = this.afs.collection('family').doc(this.f.Family.value.id);
      // this.afs.doc('family/'+this.f.Family.value.id).get().subscribe(e=> console.log(e));
      if (isNull(this.f.Family.value) || isNull(this.f.name.value)) {
        this.alertService.error('Faltan datos');
      } else if (this.f.Family.value === '' || this.f.name.value === '') {
        this.alertService.error('Faltan datos');
      } else {
        this.api.createItem({
          Name: this.f.name.value,
          family: this.afs.collection('family').doc(this.f.Family.value).ref
        }).then(res => {
          this.alertService.success('Item creado...');
          this.isCreatingAction = false;
          /*const family: Family = this.api.getFamilyById(this.f.Family.value, this.familyList);
          this.itemList.push({
            id: res.id,
            Name: this.f.name.value,
            Family: family,
            familyName: family.Name, // this.api.getFamilyById(data.Family.id).Name
            price: this.f.price.value,
            stock: this.f.stock.value
          });*/
          this.table.renderRows();

        });
      }
    }
  }
}
