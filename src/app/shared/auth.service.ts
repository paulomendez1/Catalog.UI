import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { authenticationResponse } from '../models/auth/auth-response';
import { userCredentials } from '../models/auth/user-credentials';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + "/user"
  private readonly tokenKey: string = 'token'
  private readonly expirationTokenKey: string = 'token-expiration'

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }
    const expiration: any = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(expiration)

    if (expirationDate <= new Date()) {
      this.logout();
      return false;
    }
    else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.expirationTokenKey)
  }

  getFieldFromJWT(field: string): string {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return ''
    }
    const dataToken = JSON.parse(atob(token.split('.')[1]))
    return dataToken[field];
  }

  register(userCredentials: userCredentials): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(this.apiURL, userCredentials)
  }

  login(userCredentials: userCredentials): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(this.apiURL + "/auth", userCredentials)
  }

  saveToken(authenticationResponse: authenticationResponse) {
    localStorage.setItem(this.tokenKey, authenticationResponse.token)
    localStorage.setItem(this.expirationTokenKey, authenticationResponse.expirationDate.toString())
  }

  getToken() {
    return localStorage.getItem(this.tokenKey)
  }
}
