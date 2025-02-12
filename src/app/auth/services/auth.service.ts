import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap, of, map, catchError } from 'rxjs';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.urlServicio;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/User`, user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/Auth/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
        }),
        tap(response => {
          const payload = this.decodeToken(response.token);
          this.user = payload;
        }),
        map(response => {
          const payload = this.decodeToken(response.token);
          return { ...payload, token: response.token } as User;
        })
      );
  }


  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error("Error al decodificar el token", e);
      return null;
    }
  }

  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) return of(false);


    return of(true);
    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError( err => of(false) )
      );

  }


  logout() {
    this.user = undefined;
    localStorage.clear();
  }



}
