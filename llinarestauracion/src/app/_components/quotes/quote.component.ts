import { Component, OnInit, ViewChild } from '@angular/core';
import { Item, QuoteItem, Quote, Family, Customer } from 'src/app/_models';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService, AlertService } from 'src/app/_services';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireFunctions } from '@angular/fire/functions';
import { isNull } from 'util';
import { ownComponent } from '..';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
//Presupuestos
export class QuoteComponent implements OnInit, ownComponent {
  @ViewChild('table') table: MatTable<any>;
  quoteItems: QuoteItem[] = [];
  elementForm: any;
  elementList: Quote[] = [];
  customersList: Customer[] = [];
  displayedColumns: string[] = ['Name', 'familyName'];
  isLoadingResults = true;
  isCreatingAction = false;
  item$: Observable<Item[]>;
  dataSource = new MatTableDataSource(this.elementList);
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;  
  componentName = { singular: 'Presupuestos', plural: 'Presupuesto' };

  
  elementActive: Quote = new Quote();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: FirebaseService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private alertService: AlertService,
    private fns: AngularFireFunctions) { }
  displayWith(value: any): string {
    throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.elementForm = this.formBuilder.group({
      customer: ['', Validators.required],
      name: ['', Validators.required],
      date: [Date.now().toString(), Validators.required],
      price: [0, Validators.required],
      terms: [0, Validators.required],
      tax: [0, Validators.required],
      otherTax: [false, Validators.required],
      discount: [0, Validators.required],
      extraData: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      this.elementActive.id = params['id'];
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addElement(state: boolean) {
    this.isCreatingAction = state;
  }
  get f() { return this.elementForm.controls; }

  initElementForm(): void {
    this.elementForm = this.formBuilder.group({
      //item: ['', Validators.required],
    })
  }

  addQuoteItem(_item: Item): void {
    const newItem: QuoteItem = new QuoteItem();
    newItem.item = _item;
    newItem.price = _item.price;
    newItem.discount = this.elementForm.value.discount;
    newItem.qty = this.elementForm.value.qty;
    newItem.stock = this.elementForm.value.stock;

    this.quoteItems.push(newItem)
  }

  closeQuote(): void {
    const newQuote: Quote = new Quote();
    newQuote.items = this.quoteItems;
    newQuote.priceTotal = newQuote.totalPrice;
    newQuote.itemsTotal = newQuote.totalItems
    newQuote.customer = this.elementForm.value.customer;
    newQuote.dataCustomer = this.elementForm.value.dataCustomer;
    newQuote.tax = this.elementForm.value.tax;
    newQuote.discount = this.elementForm.value.discount;
  }

  beforeSubmit(newElement: Quote): boolean {
    //this.dataSource.filter = newElement.Name.trim().toLowerCase();
    return this.dataSource.data.length > 0
  }
  onSubmit() {
    const newElement = new Quote();
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
  afterSubmit(action: boolean,newElement: any) {
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
          this.elementList.push({
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

  createElement(state: boolean) {
    if (state) {
      state = !this.elementList.some(element => {
        const tempElement =
          element.Date.toDate().getDay() + '/' +
          element.Date.toDate().getMonth() + '/' +
          element.Date.toDate().getFullYear();

        const temp = new Date().getDay() + '/' +
          new Date().getMonth() + '/' +
          new Date().getFullYear();
        return tempElement === temp;
      });
      if (state) {
        this.api.getElements('customer').then((res) => {
          res.forEach(customer => {
            const temp: Customer = customer.data() as Customer;
            temp.id = customer.id;
            this.customersList.push(temp);
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
}
