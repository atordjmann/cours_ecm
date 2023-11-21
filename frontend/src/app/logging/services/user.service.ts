import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { User } from '../../../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    apiUrl = environment.apiUrl;

    getAll() {
        return this.http.get<User[]>(this.apiUrl + '/users');
    }

    registerStudent(user: User) {
        return this.http.post(this.apiUrl + '/users/register', user);
    }

    registerCompany(user: any) {
        return this.http.post(this.apiUrl + '/users/register', user);
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl + '/users/${id}');
    }
}
