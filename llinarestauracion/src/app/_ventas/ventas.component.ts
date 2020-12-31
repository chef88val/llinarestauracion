import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit, ownComponent {

  constructor() { }
  ngOnDestroy(): void {
    console.log("Method not implemented.");
  }

  ngOnInit(): void {
  }

}
