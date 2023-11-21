import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import { User } from '../../../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    apiUrl = environment.apiUrl;
    private currentUserSubject: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
    public currentUser: Observable<User|null> = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        const currentUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User|null>(currentUser == null ? null : JSON.parse(currentUser));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.apiUrl + '/users/authenticate', { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
