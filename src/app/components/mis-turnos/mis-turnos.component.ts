import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from 'src/app/interfaces/shift';
import { ErrorService } from 'src/app/services/error.service';
import { ShiftService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-mis-shifts',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css'],
})
export class MisTurnosComponent implements OnInit {
  name: string = '';
  surname: string = '';
  document: string = '';
  nextShifts: Shift[] = [];
  constructor(
    private turnoService: ShiftService,
    private _errorService: ErrorService
  ) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.name = user.name;
      this.surname = user.surname;
      this.document = user.document;
      this.getAllShifts(this.document);
    }
  }

  getAllShifts(dni: string) {
    this.turnoService.getTurnosByDNI(dni).subscribe((shifts) => {
      if (shifts && shifts.data && shifts.data.length > 0) {
        this.nextShifts = shifts.data
          .map((shift: Shift) => {
            const parts = shift.dateShift.split('-');
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
              return {
                ...shift,
                dateShift: dateFormatted,
              } as Shift;
            } else {
              return null;
            }
          })
          .filter((shift: Shift) => shift !== null);
        this.getInformationProfessionals(this.nextShifts);
      } else {
        this.nextShifts = [];
      }
    });
  }

  getInformationProfessionals(shifts: Shift[]): void {
    shifts.forEach((shift) => {
      this.getInformationProfessional(shift.licenseProfessional).subscribe(
        (doctor) => {
          shift.doctorName = doctor.data.name;
          shift.doctorSurname = doctor.data.surname;
          shift.speciality = doctor.data.speciality.description;
        }
      );
    });
  }

  getInformationProfessional(licenseNumber: string): Observable<any> {
    return this.turnoService.getDoctorByLicenseNumber(licenseNumber);
  }

  cancelShift(idTurno: number) {
    const confirmation = window.confirm(
      '¿Está seguro de que desea cancelar este turno?'
    );
    if (confirmation) {
      this.turnoService.cancelShift(idTurno).subscribe(
        () => {
          this.nextShifts = this.nextShifts.filter(
            (shift) => shift.id !== idTurno
          );
        },
        (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
        }
      );
    }
  }
}
