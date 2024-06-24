import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professional } from 'src/app/interfaces/professional';
import { SpecialityService } from 'src/app/services/speciality.service';
import { HealthInsuranceService } from 'src/app/services/healthInsuranceService';
import { Speciality } from 'src/app/interfaces/speciality';
import { healthInsurance } from 'src/app/interfaces/healthInsurance';
import { ToastrService } from 'ngx-toastr';
import { ProfessionalService } from 'src/app/services/professional.service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-edit-professionals',
  templateUrl: './edit-professionals.component.html',
  styleUrls: ['./edit-professionals.component.css'],
})
export class EditProfessionalsComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router,
    private professionalService: ProfessionalService,
    private specialityService: SpecialityService,
    private healthInsuranceService: HealthInsuranceService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      this.getProfessional(id);
    });

    this.getAllSpecialities();
    this.getAllHealthInsurances();
  }

  getProfessional(id: number): void {
    this.professionalService.getOneProfessional(id).subscribe(
      (response: any) => {
        this.professional = response.data;
        console.log(this.professional);
        this.selectedHealthInsuranceIds =
          this.professional.healthInsurances.map((hi) => hi.id);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(
          'Error al obtener los datos del profesional',
          'Error'
        );
      }
    );
  }

  getAllSpecialities(): void {
    this.specialityService.getSpecialities().subscribe(
      (response: any) => {
        this.specialities = response.data;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Error al obtener las especialidades', 'Error');
      }
    );
  }

  getAllHealthInsurances(): void {
    this.healthInsuranceService.getHealthInsurances().subscribe(
      (response: any) => {
        this.healthInsurances = response.data;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Error al obtener las obras sociales', 'Error');
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

  isNumeric(value: any): boolean {
    return /^\d+$/.test(value);
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

  updateProfessional() {
    let newProf = {
      ...this.professional,
      healthInsurances: this.selectedHealthInsuranceIds,
    };

    this.professionalService.updateProfessional(newProf).subscribe({
      next: () => {
        this.toastr.success(
          `El profesional ${this.professional.licenseNumber} fue actualizado con éxito`,
          'Profesional actualizado'
        );
        this.router.navigate(['/admin-profesionales']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      },
    });
  }
}
