import { Component, OnInit, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../_services';
@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'warning':
                        message.cssClass = 'alert alert-warning';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    action(type: boolean): any {
        //this.subscription.add(
        this.alertService.setAlert(type);
        // this.alertService.getAlert().subscribe(data =>{ data._button = type;})
        //);
    }
}