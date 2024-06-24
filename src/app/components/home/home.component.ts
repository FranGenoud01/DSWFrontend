import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from 'src/app/interfaces/shift';
import { ShiftService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ShiftService],
})
export class HomeComponent implements OnInit {
  name: string = '';
  surname: string = '';
  document: string = '';
  nextShif: Shift | undefined;
  public isAdmin: boolean = false;
  constructor(private shiftService: ShiftService) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isAdmin = user.role === 'admin';
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.name = user.name;
      this.surname = user.surname;
      this.document = user.document;
      this.getNextShift(this.document);
    }
  }

  getNextShift(dni: string) {
    this.shiftService.getTurnosByDNI(dni).subscribe((shifts) => {
      if (shifts && shifts.data && shifts.data.length > 0) {
        const nextShif = shifts.data[0];
        const parts = nextShif.dateShift.split('-');
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const day = parseInt(parts[2]);
        const dateShift = new Date(year, month, day);
        if (!isNaN(dateShift.getTime())) {
          const dia = dateShift.getDate();
          const mes = dateShift.getMonth() + 1;
          const anio = dateShift.getFullYear();
          const dateFormatted = `${dia < 10 ? '0' : ''}${dia}/${
            mes < 10 ? '0' : ''
          }${mes}/${anio}`;
          this.getInformationProfessional(
            nextShif.licenseProfessional
          ).subscribe((professional) => {
            this.nextShif = {
              ...nextShif,
              dateShift: dateFormatted,
              doctorName: professional.data.name,
              speciality: professional.data.speciality.description,
              doctorSurname: professional.data.surname,
            };
          });
        }
      }
    });
  }

  getInformationProfessional(licenseNumber: string): Observable<any> {
    return this.shiftService.getDoctorByLicenseNumber(licenseNumber);
  }
}
