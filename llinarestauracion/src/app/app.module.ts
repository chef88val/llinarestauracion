import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireFunctionsModule, ORIGIN } from '@angular/fire/functions';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
/*
import { fakeBackendProvider } from './_services';
import { JwtInterceptor, ErrorInterceptor } from './_services';*/

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';


import {
  HomeComponent,
  LoginComponent,
  AlertComponent,
  RegisterComponent,
  ToolbarComponent,
  DashboardComponent,
  StockComponent,
  CashflowComponent,
  AdminPortalComponent,
  ReportComponent,
  DialogBoxComponent,
  ItemsComponent,
  ItemDetailComponent,
  ItemAddComponent,
  ItemEditComponent,
  ItemStatusComponent,
  SuperAdminPortalComponent,
  QuoteComponent,
  DeliveryComponent,
  OrderComponent,
  CustomerComponent,
  SaleComponent,
  ControlMessagesComponent,
  MatConfirmDialogComponent,
  CustomerDetailComponent
} from './_components';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { EmailPipe, FirestoreDatePipe } from './_pipes';
import { PageNotFoundComponent } from './_helpers/page-not-found/page-not-found.component';
import { UserComponent } from './_components/user/user.component';
import { CompanyComponent } from './_components/company/company.component';
import { OwnComponent } from './_components/own/own.component';


//import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    AdminPortalComponent,
    CashflowComponent,
    DashboardComponent,
    DialogBoxComponent,
    FirestoreDatePipe,
    EmailPipe,
    ItemsComponent,
    ItemDetailComponent,
    ItemAddComponent,
    ItemEditComponent,
    ItemStatusComponent,
    HomeComponent,
    LoginComponent,
    ReportComponent,
    RegisterComponent,
    StockComponent,
    ToolbarComponent,
    SuperAdminPortalComponent,
    QuoteComponent,
    DeliveryComponent,
    OrderComponent,
    CustomerComponent,
    SaleComponent,
    ControlMessagesComponent,
    MatConfirmDialogComponent,
    CustomerDetailComponent,
    PageNotFoundComponent,
    UserComponent,
    CompanyComponent,
    OwnComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
    NgbModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    //ChartsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    /* { provide: ORIGIN, useValue: 'https://llinarestauracion-1eecc.web.app' }
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
 
     // provider used to create fake backend
     fakeBackendProvider*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
