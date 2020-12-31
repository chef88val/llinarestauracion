import { OnInit, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role, fillerNavItem } from './_models';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('snav') snav: any;
  mobileQuery: MediaQueryList;
  title = 'sdfdsf';
  nameStore = 'Llinarestauracion';
  currentUser: User;
  fillerNav: fillerNavItem[] = [
    { label: 'Inicio', routerLink: 'home' },
    { label: 'Items', routerLink: 'items' },
    { label: 'Reporte diario', routerLink: 'report' }
  ];

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private media: MediaMatcher, 
    private changeDetectorRef: ChangeDetectorRef) {
    changeDetectorRef.detach()
  
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  clickHandler() {
    this.changeDetectorRef.detectChanges()
  }
  ngOnInit(): void {
  }


  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.snav.toggle();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
