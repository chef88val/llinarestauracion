import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit, ownComponent {

  constructor() { }
  ngOnDestroy(): void {
    console.log("Method not implemented.");
  }

  ngOnInit(): void {
  }

}
