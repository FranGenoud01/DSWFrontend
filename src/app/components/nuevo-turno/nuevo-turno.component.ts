// nuevo-turno.component.ts

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HealthInsuranceService } from 'src/app/services/healthInsuranceService';
import { ProfessionalService } from 'src/app/services/professional.service.service';
import { ShiftService } from 'src/app/services/shift.service';
import { SpecialityServiceService } from 'src/app/services/speciality.service.service';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css'],
})
export class NuevoTurnoComponent implements OnInit {
  specialities: any[] = [];
  professionals: any[] = [];
  healthInsurances: any[] = [];
  selectedHealthInsurance: any;
  selectedSpeciality: any;
  selectedProfessional: any;
  selectedDate: any;
  selectedShiftId: any;
  selectedInsuranceType: any;
  availableShifts: any[] = [];
  selectedShift: any[] = [];
  document: string = '';
  minDate: Date = new Date();
  formValid: boolean = false;

  constructor(
    private specialityService: SpecialityServiceService,
    private healthInsuranceService: HealthInsuranceService,
    private profesionalService: ProfessionalService,
    private shiftService: ShiftService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.selectedSpeciality = '';
    this.selectedHealthInsurance = '';
    this.selectedProfessional = '';
    this.selectedDate = '';
    this.selectedShiftId = '';
    this.selectedInsuranceType = '';
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.document = user.document;
    }
    this.getSpecialities();
    this.getHealthInsurances();
  }

  checkFormValidity(): void {
    if (
      this.selectedSpeciality &&
      this.selectedInsuranceType &&
      (this.selectedInsuranceType === 'without' ||
        (this.selectedInsuranceType === 'with' &&
          this.selectedHealthInsurance)) &&
      this.selectedProfessional &&
      this.selectedDate &&
      this.selectedShiftId
    ) {
      this.formValid = true;
    } else {
      this.formValid = false;
    }
  }

  getSpecialities() {
    this.specialityService.getSpecialities().subscribe((response: any) => {
      this.specialities = response.data;
    });
  }

  onHealthInsuranceTypeSelected() {
    this.checkFormValidity();
    if (this.selectedInsuranceType === 'with') {
    } else if (this.selectedInsuranceType === 'without') {
      this.selectedHealthInsurance = '';
    }
  }

  getHealthInsurances() {
    this.healthInsuranceService
      .getHealthInsurances()
      .subscribe((response: any) => {
        this.healthInsurances = response.data;
      });
  }

  onSpecialitySelected() {
    this.checkFormValidity();
    if (this.selectedSpeciality) {
      this.profesionalService
        .getProfessionalsBySpeciality(this.selectedSpeciality)
        .subscribe((response: any) => {
          this.professionals = response.data;
        });
    } else {
      this.professionals = [];
    }
  }

  onHealthInsuranceSelected() {
    this.checkFormValidity();
    if (this.selectedHealthInsurance) {
      this.profesionalService
        .getProfessionalsByHealthInsurance(this.selectedHealthInsurance)
        .subscribe((response: any) => {
          this.professionals = response.data;
        });
    }
  }

  onProfessionalSelected() {
    this.checkFormValidity();
    if (this.selectedProfessional) {
      this.getAvailableShifts();
    } else {
      this.availableShifts = [];
    }
  }

  getAvailableShifts() {
    this.profesionalService
      .getAvailableShiftsByProf(this.selectedProfessional)
      .subscribe(
        (response: any) => {
          this.availableShifts = response.data;
          if (this.availableShifts.length == 0) {
            this.toastr.info('No hay turnos disponibles', 'Mensaje');
          }
        },
        (error) => {
          console.error('Error al obtener los turnos libres:', error);
        }
      );
  }

  onDateSelected() {
    this.checkFormValidity();
    if (this.selectedDate) {
      this.profesionalService
        .getAvailableShiftsByDate(this.selectedDate, this.selectedProfessional)
        .subscribe(
          (response: any) => {
            this.availableShifts = response.data;
          },
          (error) => {
            console.error('Error al obtener los horarios libres:', error);
          }
        );
    }
  }

  onHourSelected() {
    this.checkFormValidity();
    if (this.selectedShiftId) {
      console.log(this.selectedShiftId, this.document);
    }
  }

  saveShift() {
    let price = 0;
    if (this.selectedInsuranceType === 'with') {
      price = 0;
    } else if (this.selectedInsuranceType === 'without') {
      const selectedProfessional = this.professionals.find(
        (professional) =>
          professional.licenseNumber === this.selectedProfessional
      );
      price = selectedProfessional.price;
    }
    this.shiftService
      .saveShift(this.selectedShiftId, this.document, price)
      .subscribe({
        next: (data) => {},
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
        },
      });
    this.toastr.success(
      `El turno se registró correctamente`,
      'Turno registrado'
    );
    this.router.navigate(['/home']);
  }
}
