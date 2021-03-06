import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../../_services';

@Component({templateUrl: 'login.component.html',
styleUrls: ['./login.component.scss']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    ngOnDestroy(): void {
       console.log("Method not implemented.");
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.authenticationService.loginUP(this.f.username.value, this.f.password.value).then(user => {
            console.log(user);
            if ('uid' in user){
                this.alertService.success('Accediendo...');
                this.router.navigate(['/home']);
            } else {
                this.alertService.error('Usuario o contraseña no coinciden');
                this.loading = false;
            }
            /*console.log(auth.additionalUserInfo);
            console.log(auth.credential);
            console.log(auth.operationType);
            console.log(auth.user);*/
        }).catch( error => {
            this.alertService.error(error);
            this.loading = false;
        });
        /*this.authenticationService.loginLS(this.f.username.value, this.f.password.value)
        .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/
    }
}
