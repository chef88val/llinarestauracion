import { OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { fillerNavItem } from './fillerNavItem';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  implements OnInit, OnDestroy{
  mobileQuery: MediaQueryList;
  title = 'sdfdsf';
  nameStore = 'JLuis && Nati';
  currentUser: User;
  fillerNav: fillerNavItem[] = [
    {label: 'Items', routerLink: 'items'},
    {label: 'Reporte diario', routerLink: 'report'}
  ];

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private changeDetectorRef: ChangeDetectorRef,
      private media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
