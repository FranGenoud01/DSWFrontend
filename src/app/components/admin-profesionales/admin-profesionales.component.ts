import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Professional } from 'src/app/interfaces/professional';
import { Speciality } from 'src/app/interfaces/speciality';
import { ErrorService } from 'src/app/services/error.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import { ProfessionalService } from 'src/app/services/professional.service.service';
import { HealthInsuranceService } from 'src/app/services/healthInsuranceService';
import { healthInsurance } from 'src/app/interfaces/healthInsurance';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profesionales',
  templateUrl: './admin-profesionales.component.html',
  styleUrls: ['./admin-profesionales.component.css'],
})
export class AdminProfesionalesComponent implements OnInit {
  professionals: Professional[] = [];
  professional: Professional = {
    licenseNumber: '',
    name: '',
    surname: '',
    speciality: { id: 0, description: '' },
    price: 0,
    healthInsurances: [],
  };
  specialities: Speciality[] = [];
  healthInsurances: healthInsurance[] = [];
  selectedHealthInsuranceIds: number[] = [];

  constructor(
    private professionalService: ProfessionalService,
    private specialityService: SpecialityService,
    private healthInsuranceService: HealthInsuranceService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProfessionals();
    this.getAllSpecialities();
    this.getAllHealthInsurances();
  }

  isNumeric(value: any): boolean {
    return /^-?\d+$/.test(value);
  }

  validateField(
    value: string,
    minLength: number,
    maxLength: number,
    regex?: RegExp
  ): boolean {
    if (
      !value ||
      value.trim().length < minLength ||
      value.trim().length > maxLength
    ) {
      return false; // El valor no cumple con la longitud requerida
    }
    if (regex && !regex.test(value.trim())) {
      return false; // El valor no cumple con el patrón regex (si se proporciona)
    }
    return true; // El valor es válido
  }

  getAllProfessionals(): void {
    this.professionalService.getAllProfessional().subscribe(
      (response: any) => {
        this.professionals = response.data;
        console.log(response.data);
      },
      (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    );
  }

  getAllSpecialities(): void {
    this.specialityService.getSpecialities().subscribe(
      (response: any) => {
        this.specialities = response.data;
      },
      (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    );
  }

  getAllHealthInsurances(): void {
    this.healthInsuranceService.getHealthInsurances().subscribe(
      (response: any) => {
        console.log(response.data);
        this.healthInsurances = response.data;
      },
      (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    );
  }

  onInsuranceChange(event: any) {
    const insuranceId = Number(event.target.value);

    if (event.target.checked) {
      this.selectedHealthInsuranceIds.push(insuranceId);
    } else {
      this.selectedHealthInsuranceIds = this.selectedHealthInsuranceIds.filter(
        (id) => id !== insuranceId
      );
    }
  }

  async addProfessional() {
    console.log(this.selectedHealthInsuranceIds);

    let hasError = false;

    if (
      !this.professional.licenseNumber.trim() ||
      !this.professional.name.trim() ||
      !this.professional.surname.trim()
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      hasError = true;
    }

    let newProf = {
      ...this.professional,
      healthInsurances: this.selectedHealthInsuranceIds,
    };

    if (hasError) {
      return;
    }

    console.log(newProf);
    this.professionalService.addProfessional(newProf).subscribe({
      next: (v) => {
        this.toastr.success(
          `El profesional ${newProf.licenseNumber} fue registrado con exito`,
          'Profesional registrado'
        );
        this.getAllProfessionals();
        newProf = {
          licenseNumber: '',
          surname: '',
          name: '',
          speciality: this.specialities[0],
          price: 0,
          healthInsurances: [],
        };
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      },
    });
  }

  editProfessional(professional: any) {
    this.router.navigate(['/editar-profesional', professional.licenseNumber]);
  }

  deleteProfessional(professional: any) {
    const confirmation = window.confirm(
      `Está seguro que desea eliminar al profesional ${professional.surname}, ${professional.name} ?`
    );
    if (confirmation) {
      this.professionalService
        .deleteProfessional(professional.licenseNumber)
        .subscribe(
          () => {
            this.getAllProfessionals();
          },
          (e: HttpErrorResponse) => {
            this._errorService.msjError(e);
          }
        );
    }
  }
}
