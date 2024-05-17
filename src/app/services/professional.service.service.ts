import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getProfessionalsBySpeciality(specialityId: number): Observable<any[]> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<any[]>(
      `${this.myAppUrl}professional/${specialityId}/speciality`,
      {
        headers: headers,
      }
    );
  }

  getProfessionalsByHealthInsurance(
    healthInsuranceId: number
  ): Observable<any[]> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<any[]>(
      `${this.myAppUrl}professional/${healthInsuranceId}/healthInsurance`,
      {
        headers: headers,
      }
    );
  }

  getAvailableShiftsByProf(licenseNumber: string): Observable<any[]> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<any[]>(
      `${this.myAppUrl}shift/${licenseNumber}/professional`,
      {
        headers: headers,
      }
    );
  }

  getAvailableShiftsByDate(
    date: string,
    licenseNumber: string
  ): Observable<any[]> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<any[]>(
      `${this.myAppUrl}shift/${licenseNumber}/professional/${date}/free`,
      {
        headers: headers,
      }
    );
  }
}
