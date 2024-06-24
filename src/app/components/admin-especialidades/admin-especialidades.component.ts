import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Speciality } from 'src/app/interfaces/speciality';
import { ErrorService } from 'src/app/services/error.service';
import { SpecialityService } from 'src/app/services/speciality.service';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-especialidades',
  templateUrl: './admin-especialidades.component.html',
  styleUrls: ['./admin-especialidades.component.css'],
})
export class AdminEspecialidadesComponent implements OnInit {
  specialities: Speciality[] = [];
  speciality: Speciality = { id: 0, description: '' };

  constructor(
    private specialityService: SpecialityService,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getAllSpecialities();
  }

  getAllSpecialities(): void {
    this.specialityService.getSpecialities().subscribe((response: any) => {
      this.specialities = response.data;
    });
  }

  saveSpeciality(): void {
    this.specialityService.createSpeciality(this.speciality).subscribe(() => {
      this.getAllSpecialities();
    });
  }
}
