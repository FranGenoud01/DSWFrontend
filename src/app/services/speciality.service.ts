import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Speciality } from '../interfaces/speciality';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getSpecialities(): Observable<Speciality[]> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<Speciality[]>(`${this.myAppUrl}speciality/`, {
      headers: headers,
    });
  }

  getSpeciality(id: number): Observable<Speciality> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<Speciality>(`${this.myAppUrl}/${id}`, {
      headers: headers,
    });
  }

  createSpeciality(speciality: Speciality): Observable<Speciality> {
    const tokenData: string = localStorage.getItem('token') || ''; // Obtener el token como una cadena JSON
    const tokenObj = JSON.parse(tokenData); // Convertir la cadena JSON a un objeto JavaScript
    const accessToken = tokenObj.token.accessToken; // Acceder al accessToken dentro del objeto token

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    const body = { description: speciality.description };
    return this.http.post<Speciality>(`${this.myAppUrl}speciality/`, body, {
      headers: headers,
    });
  }
}
