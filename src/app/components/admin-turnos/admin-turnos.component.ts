import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Shift } from 'src/app/interfaces/shift';
import { ErrorService } from 'src/app/services/error.service';
import { ShiftService } from 'src/app/services/shift.service';
import { ProfessionalService } from 'src/app/services/professional.service.service';
import { Professional } from 'src/app/interfaces/professional';
import { SpecialityService } from 'src/app/services/speciality.service';
import { Speciality } from 'src/app/interfaces/speciality';

@Component({
  selector: 'app-admin-turnos',
  templateUrl: './admin-turnos.component.html',
  styleUrls: ['./admin-turnos.component.css'],
})
export class AdminTurnosComponent implements OnInit {
  licenseNumber: string = '';
  shifts: any[] = [];
  professionals: Professional[] = [];
  specialities: Speciality[] = [];
  displayedColumns: string[] = [
    'licenseProfessional',
    'speciality',
    'dateShift',
    'hourShift',
    'status',
    'price',
    'dniPatient',
  ];
  dataSource: MatTableDataSource<Shift>;
  filterCriteria = {
    status: '',
    licenseNumber: '',
    speciality: '',
    futureDates: false,
    sortByPrice: '',
  };

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private shiftService: ShiftService,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private professionalService: ProfessionalService,
    private specialityService: SpecialityService
  ) {
    this.dataSource = new MatTableDataSource<Shift>([]);
  }

  ngOnInit(): void {
    this.getAllShifts();
    this.getAllProfessionals();
    this.getAllSpecialities();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  generateShifts(): void {
    this.shiftService.generateShift(this.licenseNumber).subscribe(
      (response) => {
        this.toastr.success('Turnos generados exitosamente', 'Éxito');
        this.getAllShifts(); // Actualiza la lista de turnos después de generar
      },
      (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    );
  }

  getAllShifts(): void {
    this.shiftService.getAllShifts().subscribe(
      (response: any) => {
        console.log(response.data);
        this.shifts = response.data;
        this.applyFilters();
      },
      (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    );
  }

  getAllProfessionals(): void {
    this.professionalService.getAllProfessional().subscribe(
      (response: any) => {
        console.log(response.data);
        this.professionals = response.data;
      },
      (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    );
  }

  getAllSpecialities(): void {
    this.specialityService.getSpecialities().subscribe(
      (response: any) => {
        console.log(response.data);
        this.specialities = response.data;
      },
      (error: HttpErrorResponse) => {
        this._errorService.msjError(error);
      }
    );
  }

  applyFilters(): void {
    let filteredShifts = this.shifts;

    if (this.filterCriteria.status) {
      filteredShifts = filteredShifts.filter(
        (shift) => shift.status === this.filterCriteria.status
      );
    }

    if (this.filterCriteria.licenseNumber) {
      filteredShifts = filteredShifts.filter((shift) =>
        shift.licenseProfessional.licenseNumber.includes(
          this.filterCriteria.licenseNumber
        )
      );
    }

    if (this.filterCriteria.speciality) {
      filteredShifts = filteredShifts.filter((shift) =>
        shift.licenseProfessional.speciality.description.includes(
          this.filterCriteria.speciality
        )
      );
    }

    if (this.filterCriteria.futureDates) {
      const today = new Date().toISOString().split('T')[0];
      filteredShifts = filteredShifts.filter(
        (shift) => shift.dateShift > today
      );
    }

    if (this.filterCriteria.sortByPrice) {
      filteredShifts = filteredShifts.sort((a, b) => {
        return this.filterCriteria.sortByPrice === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      });
    }

    this.dataSource.data = filteredShifts;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onFilterChange(): void {
    this.applyFilters();
  }
}
