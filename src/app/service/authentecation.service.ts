import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalVariable } from '../constant/global.variable';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    currentUser;
    constructor(private http: HttpClient,
                private router: Router) {
                  if (localStorage.getItem('currentUser')) {
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                  }
                }

    login(username: string, password: string) {
        return this.http.post<any>(`${GlobalVariable.BASE_PUBLIC_URL}test-conductor/login`, { userName: username, password: password })
            .pipe(map(response => {
                if (response['object'] && response['object'].token) {
                    localStorage.setItem('currentUser', JSON.stringify(response['object']));
                    if (localStorage.getItem('currentUser')) {
                        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                      }
                }

                return response['object'];
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);

    }
}
