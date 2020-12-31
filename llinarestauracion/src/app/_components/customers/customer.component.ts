
import { isNull } from 'util';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Customer, Family, endpoints } from 'src/app/_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService, AlertService } from 'src/app/_services';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ownComponent } from '..';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
//clientes
export class CustomerComponent implements OnInit, ownComponent {

  @ViewChild('table') table: MatTable<any>;
  displayedColumns: string[] = ['Nombre', 'Email', 'Telefono', 'Actions'];
  elementActive: Customer = new Customer();
  elementList: Customer[] = [];
  dataSource = new MatTableDataSource(this.elementList);
  elementForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  isCreatingAction: boolean = false;
  isLoadingResults: boolean = false;
  componentName = { singular: 'Cliente', plural: 'Clientes' };

  constructor(
    private formBuilder: FormBuilder,
    private api: FirebaseService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private alertService: AlertService,
    private fns: AngularFireFunctions,
    private route: ActivatedRoute,
    private router: Router, 
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

  ngOnDestroy(): void {
    console.log("Method not implemented.");
  }

  ngOnInit(): void {
    this.elementForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      surname: ['', Validators.required],
      extraData: ['', null]
    });
    this.route.params.subscribe(params => {
      this.elementActive.id = params['id'];
    });

    this.api.getElements(endpoints._customer).then(data => {
      data.forEach(a => {
        const data = a.data() as Customer;
        data.id = a.id;
        this.elementList.push(data);
      });
      this.isLoadingResults = false;
      this.dataSource.data = this.elementList;
    });
  }
  navigateTo(row: any, tag: string) {
    this.router.navigate([`/customer/${row.id}/${tag}`]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  addElement(state: boolean) {
    this.isCreatingAction = state;
  }
  get f() { return this.elementForm.controls; }

  beforeSubmit(newElement: Customer): boolean {
    this.dataSource.filter = newElement.Name.trim().toLowerCase();
    return this.dataSource.data.length > 0
  }
  onSubmit() {
    const newElement = new Customer();
    newElement.Name = this.f.name.value;
    newElement.Phone = this.f.phone.value;
    newElement.Email = this.f.email.value;
    newElement.Surname = this.f.surname.value;

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
      this.api.createElement(endpoints._customer, newElement as Customer).then(res => {
        this.alertService.success('Item creado...');
        this.isCreatingAction = false;

        this.table.renderRows();

      });
    }
  }
}
