import { Component, OnInit } from '@angular/core';
import { healthInsurance } from 'src/app/interfaces/healthInsurance';
import { ErrorService } from 'src/app/services/error.service';
import { HealthInsuranceService } from 'src/app/services/healthInsuranceService';

@Component({
  selector: 'app-admin-obras-sociales',
  templateUrl: './admin-obras-sociales.component.html',
  styleUrls: ['./admin-obras-sociales.component.css'],
})
export class AdminObrasSocialesComponent implements OnInit {
  healthInsurances: healthInsurance[] = [];
  healthInsurance: healthInsurance = { id: 0, description: '' };

  constructor(
    private healthInsuranceService: HealthInsuranceService,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getAllHealthInsurances();
  }

  getAllHealthInsurances(): void {
    this.healthInsuranceService
      .getHealthInsurances()
      .subscribe((response: any) => {
        this.healthInsurances = response.data;
      });
  }

  saveSpeciality(): void {
    this.healthInsuranceService
      .createHealthInsurance(this.healthInsurance)
      .subscribe(() => {
        this.getAllHealthInsurances();
      });
  }
}
