import { Component, OnInit } from '@angular/core';
import { ownComponent } from '../..';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/_models';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit, ownComponent {
  customerActive: Customer = new Customer();
  tabActive: string;
  isTabActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,) { }
  displayWith(value: any): string {
    throw new Error("Method not implemented.");
  }
  applyFilter(event: Event): void {
    throw new Error("Method not implemented.");
  }
  createElement(state: boolean): void {
    throw new Error("Method not implemented.");
  }
  beforeSubmit(newElement: any): boolean {
    throw new Error("Method not implemented.");
  }
  onSubmit() {
    throw new Error("Method not implemented.");
  }
  afterSubmit(action: boolean, newElement: any) {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    /*this.customerActive.id = this.route.params..value.id;
    this.tabActive = this.route.params.value.tag;*/
    this.route.params.subscribe(params => {
      this.customerActive.id = params['id'];
      this.tabActive = params['tag'];
    });
    this.isTabActive = this.tabActive == undefined;
  }

}
