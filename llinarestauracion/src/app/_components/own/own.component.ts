import { Component, OnInit, Input } from '@angular/core';
import { ownComponent } from '..';

@Component({
  selector: 'app-own',
  templateUrl: './own.component.html',
  styleUrls: ['./own.component.scss']
})
export class OwnComponent implements OnInit, ownComponent {
  @Input() singleTag: String;
  @Input() pluralTag: String;
  @Input() endpoint: String;
  constructor() { }
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
  }

}
