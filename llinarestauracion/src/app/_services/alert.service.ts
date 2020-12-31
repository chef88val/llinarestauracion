import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;
    private subjectAfter: BehaviorSubject<any>;
    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {

        return this.subject.asObservable();
    }
    setAlert(type: boolean): any {
        this.subject.next({ buttonAction: type });
        //return new BehaviorSubject<any>(this.subject).asObservable();;
    }

    success(message: string, _button: boolean = false, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ button: _button, type: 'success', text: message });
        setTimeout(() => {
            this.clear();
        }, 6000);
        //if(_button) return this.subject.toPromise();
    }

    error(message: string, _button: boolean = false, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ button: _button, type: 'error', text: message });
        setTimeout(() => {
            this.clear();
        }, 6000);
        //if(_button) return this.subject.toPromise();
    }

    warning(message: string, _button: boolean = false, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ button: _button, type: 'warning', text: message });
        setTimeout(() => {
            this.clear();
        }, 6000);
        //if(_button) return this.subject.toPromise();
        /*if(_button)
            this.subject.subscribe((event) => event);*/
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }
}