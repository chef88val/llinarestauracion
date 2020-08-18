import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
export interface Calcu {
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.scss']
})
export class CashflowComponent implements OnInit {

  subText = '';
  mainText = 0.0;
  operand1: number;
  operand2: number;
  operator = '';
  calculationString = '';
  answered = false;
  operatorSet = false;
  totalOfToday = [];

  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'Three', cols: 2, rows: 2, color: 'lightgreen'},
    {text: 'Two', cols: 4, rows: 2, color: 'lightgreen'},
  ];
  calcu1: Calcu[] = [
    {text: '1', cols: 1, rows: 1},
    {text: '2', cols: 1, rows: 1},
    {text: '3', cols: 1, rows: 1},
    {text: '4', cols: 1, rows: 1},
  ];
  calcu2: Calcu[] = [
   {text: '5', cols: 1, rows: 1},
    {text: '6', cols: 1, rows: 1},
    {text: '7', cols: 1, rows: 1},
    {text: '8', cols: 1, rows: 1},
  ];
  calcu3: Calcu[] = [
    {text: '.', cols: 1, rows: 1},
    {text: '9', cols: 1, rows: 1},
    {text: '0', cols: 1, rows: 1},
    {text: 'C', cols: 1, rows: 1}
  ];
  constructor() { }

  ngOnInit(): void {
  }


  pressKey(key: string) {
      if(key === 'C') {
        this.allClear();
      }else {
        this.subText += key;
    }
  }

  allClear() {
    this.subText = '';
  }


  saveValue(){
    this.totalOfToday.push(parseFloat(this.subText));
    this.allClear();
  }

  getTotalOfToday(){
    return this.totalOfToday.reduce((acc, cur) => acc + cur, 0);
  }


}
