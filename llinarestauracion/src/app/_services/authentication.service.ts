import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, public afAuth: AngularFireAuth) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    loginLS(username: string, password: string) {
            return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }
    loginUP(username: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(username, password).then(auth => {
            console.log(auth);
            console.log(auth.additionalUserInfo);
            console.log(auth.credential);
            console.log(auth.operationType);
            console.log(auth.user);
            if (auth.user.uid){
                localStorage.setItem('currentUser', JSON.stringify(auth.user));
                const us =  new User();
                //us.l = auth.user.l;
                us.uid = auth.user.uid;
                us.email = auth.user.email;
                us.emailVerified = auth.user.emailVerified;
                us.isAnonymous = auth.user.isAnonymous;
                us.refreshToken = auth.user.refreshToken;
                this.currentUserSubject.next(us);
                return auth.user;
            } else { return null; }
        }).catch(error => {
            console.log(error);
            return error;
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
