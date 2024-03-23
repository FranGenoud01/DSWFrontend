import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from 'src/app/interfaces/shift';
import { TurnoService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css'],
})
export class MisTurnosComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  document: string = '';
  proximosTurnos: Shift[] = [];
  constructor(private turnoService: TurnoService) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.nombre = user.nombre;
      this.apellido = user.apellido;
      this.document = user.document;
      this.obtenerTodosLosTurnos(this.document);
    }
  }

  obtenerTodosLosTurnos(dni: string) {
    this.turnoService.getTurnosByDNI(dni).subscribe((turnos) => {
      if (turnos && turnos.data && turnos.data.length > 0) {
        this.proximosTurnos = turnos.data
          .map((turno: Shift) => {
            const parts = turno.dateShift.split('-');
            const year = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1;
            const day = parseInt(parts[2]);
            const fechaTurno = new Date(year, month, day);
            if (!isNaN(fechaTurno.getTime())) {
              const dia = fechaTurno.getDate();
              const mes = fechaTurno.getMonth() + 1;
              const anio = fechaTurno.getFullYear();
              const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${
                mes < 10 ? '0' : ''
              }${mes}/${anio}`;
              return {
                ...turno,
                dateShift: fechaFormateada,
              } as Shift;
            } else {
              return null;
            }
          })
          .filter((turno: Shift) => turno !== null);
        this.obtenerInformacionDoctores(this.proximosTurnos);
        console.log(this.proximosTurnos);
      } else {
        this.proximosTurnos = [];
      }
    });
  }

  obtenerInformacionDoctores(turnos: Shift[]): void {
    turnos.forEach((turno) => {
      this.obtenerInformacionDoctor(turno.licenseProfessional).subscribe(
        (doctor) => {
          turno.doctorName = doctor.data.name;
          turno.doctorSurname = doctor.data.surname;
          turno.speciality = doctor.data.speciality.description;
        }
      );
    });
  }

  obtenerInformacionDoctor(licenseNumber: string): Observable<any> {
    return this.turnoService.getDoctorByLicenseNumber(licenseNumber);
  }

  cancelarTurno(idTurno: number) {
    this.turnoService.cancelarTurno(idTurno).subscribe(
      () => {
        this.proximosTurnos = this.proximosTurnos.filter(
          (turno) => turno.id !== idTurno
        );
      },
      (error: any) => {
        console.error('Error al cancelar el turno:', error);
      }
    );
  }
}
