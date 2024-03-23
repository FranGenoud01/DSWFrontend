import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from 'src/app/interfaces/shift';
import { TurnoService } from 'src/app/services/shift.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TurnoService],
})
export class HomeComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  document: string = '';
  proximoTurno: Shift | undefined;

  constructor(
    private userService: UserService,
    private turnoService: TurnoService
  ) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.nombre = user.nombre;
      this.apellido = user.apellido;
      this.document = user.document;
      this.obtenerProximoTurno(this.document);
    }
  }

  obtenerProximoTurno(dni: string) {
    this.turnoService.getTurnosByDNI(dni).subscribe((turnos) => {
      if (turnos && turnos.data && turnos.data.length > 0) {
        const proximoTurno = turnos.data[0];
        const parts = proximoTurno.dateShift.split('-');
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
          this.obtenerInformacionDoctor(
            proximoTurno.licenseProfessional
          ).subscribe((doctor) => {
            console.log(doctor);
            this.proximoTurno = {
              ...proximoTurno,
              dateShift: fechaFormateada,
              doctorName: doctor.data.name,
              speciality: doctor.data.speciality.description,
              doctorSurname: doctor.data.surname,
            };
            console.log(this.proximoTurno?.speciality);
          });
        }
      }
    });
  }

  obtenerInformacionDoctor(licenseNumber: string): Observable<any> {
    return this.turnoService.getDoctorByLicenseNumber(licenseNumber);
  }
}
