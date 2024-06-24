import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getAllShifts(): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<any>(`${this.myAppUrl}shift`, { headers: headers });
  }

  getTurnosByDNI(dni: string): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}shift/${dni}/pat`);
  }

  getDoctorByLicenseNumber(licenseNumber: string): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}professional/${licenseNumber}`);
  }

  getTurnosByProf(licenseNumber: string): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<any>(
      `${this.myAppUrl}shift/${licenseNumber}/professional`,
      { headers: headers }
    );
  }

  cancelShift(shiftId: number): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.put<any>(
      `${this.myAppUrl}shift/${shiftId}`,
      {},
      { headers: headers }
    );
  }

  saveShift(shiftId: number, dni: string, price: number): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token}
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    const body = { price: price };
    return this.http.put<any>(`${this.myAppUrl}shift/${shiftId}/${dni}`, body, {
      headers: headers,
    });
  }

  generateShift(licenseNumber: string): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.post<any>(
      `${this.myAppUrl}shift/${licenseNumber}/professional`,
      {},
      { headers: headers }
    );
  }
}
