import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemsComponent } from './_components/items/items.component';
import { ItemDetailComponent } from './_components/item-detail/item-detail.component';
import { ItemAddComponent } from './_components/item-add/item-add.component';
import { ItemEditComponent } from './_components/item-edit/item-edit.component';
import { ItemStatusComponent } from './_components/item-status/item-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireFunctionsModule, ORIGIN } from '@angular/fire/functions';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
/*
import { fakeBackendProvider } from './_services';
import { JwtInterceptor, ErrorInterceptor } from './_services';*/

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';


import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { AlertComponent } from './_components/alert/alert.component';
import { RegisterComponent } from './_components/register/register.component';

import { ToolbarComponent } from './_components/toolbar/toolbar.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { StockComponent } from './_components/stock/stock.component';
import { CashflowComponent } from './_components/cashflow/cashflow.component';
import { AdminPortalComponent } from './_components/admin-portal/admin-portal.component';
import { PedidosComponent } from './_components/pedidos/pedidos.component';
import { VentasComponent } from './_components/ventas/ventas.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { ReportComponent } from './_components/report/report.component';
import { DialogBoxComponent } from './_components/dialog-box/dialog-box.component';
import { FirestoreDatePipe } from './firestore-date.pipe';
import { EmailPipe } from './email.pipe';


//import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    ItemAddComponent,
    ItemEditComponent,
    ItemStatusComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    ToolbarComponent,
    DashboardComponent,
    StockComponent,
    CashflowComponent,
    AdminPortalComponent,
    PedidosComponent,
    VentasComponent,
    ReportComponent,
    DialogBoxComponent,
    FirestoreDatePipe,
    EmailPipe
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
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: ORIGIN, useValue: 'https://llinarestauracion-1eecc.web.app' }/*
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider*/
],
  bootstrap: [AppComponent]
})
export class AppModule { }
