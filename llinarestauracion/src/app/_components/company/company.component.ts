import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, AlertService } from 'src/app/_services';

@Component({
  selector: 'app-company',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: FirebaseService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private alertService: AlertService,
    private fns: AngularFireFunctions, 
    private changeDetectorRef: ChangeDetectorRef) {
    changeDetectorRef.detach()
  }
  clickHandler() {
    this.changeDetectorRef.detectChanges()
  }

  ngOnInit(): void {
  }

}
