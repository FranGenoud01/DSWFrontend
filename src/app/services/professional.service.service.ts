import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Professional, Professional2 } from '../interfaces/professional';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getAllProfessional(): Observable<any[]> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.get<any[]>(`${this.myAppUrl}professional/`, {
      headers: headers,
    });
  }

  getOneProfessional(licenseNumber: number): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.get<any[]>(
      `${this.myAppUrl}professional/${licenseNumber}`,
      {
        headers: headers,
      }
    );
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

  getProfessionalsBySpecialityAndHealthInsurance(
    specialityId: number,
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
      `${this.myAppUrl}professional/${specialityId}/speciality/${healthInsuranceId}/healthInsurance`,
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

  addProfessional(professional: Professional2): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.post(`${this.myAppUrl}professional`, professional, {
      headers: headers,
    });
  }

  deleteProfessional(licenseNumber: number): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.delete<any>(
      `${this.myAppUrl}professional/${licenseNumber}`,
      { headers: headers }
    );
  }

  updateProfessional(professional: Professional2): Observable<any> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.put(
      `${this.myAppUrl}professional/${professional.licenseNumber}`,
      professional,
      {
        headers: headers,
      }
    );
  }
}
