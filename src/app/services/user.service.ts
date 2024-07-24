import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: any;
  private myAppUrl: string;
  private myApiUrl: string;
  private healthInsApiUrl: string;
  private authApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'patients/';
    this.healthInsApiUrl = 'healthInsurance/';
    this.authApiUrl = 'auth/';
  }
  setUser(user: any): void {
    this.currentUser = user;
  }

  getUser(): any {
    return this.currentUser;
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  getHealthInsurances(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.healthInsApiUrl}`);
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(
      `${this.myAppUrl}${this.authApiUrl}login`,
      user
    );
  }

  getPatient(dni: string): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${dni}`, {
      headers: headers,
    });
  }

  updatePatient(user: any): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${user.DNI}`, user, {
      headers: headers,
    });
  }
}
