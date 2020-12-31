import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService, AlertService } from 'src/app/_services';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Customer } from "../../_models";

@Component({
  selector: 'app-account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit, ownComponent {

  @ViewChild('table') table: MatTable<any>;
  displayedColumns: string[] = ['Name', 'Email', 'Telefono'];
  itemList: Customer[] = [];
  dataSource = new MatTableDataSource(this.itemList);
  elementForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  isCreatingAction: boolean = false;
  isLoadingResults: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private api: FirebaseService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private alertService: AlertService,
    private fns: AngularFireFunctions) { }

  ngOnDestroy(): void {
   console.log("Method not implemented.");
  }

  ngOnInit(): void {
    this.elementForm = this.formBuilder.group({
      nameControl: ['', Validators.required],
      emailControl: ['', Validators.required],
      phoneControl: ['', Validators.required],
      surnameControl: ['', Validators.required]
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

  onSubmit() {
    const newAccount = new Customer();
    newAccount.Name = this.f.nameControl.value;
    newAccount.Phone = this.f.phoneControl.value;
    newAccount.Email = this.f.emailControl.value;
    newAccount.Surname = this.f.surnameControl.value;
  }

}
