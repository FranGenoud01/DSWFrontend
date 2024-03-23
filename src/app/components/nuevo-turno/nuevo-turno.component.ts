// nuevo-turno.component.ts

import { Component, OnInit } from '@angular/core';
import { ProfessionalService } from 'src/app/services/professional.service.service';
import { SpecialitieServiceService } from 'src/app/services/specialitie.service.service';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css'],
})
export class NuevoTurnoComponent implements OnInit {
  specialities: any[] = [];
  professionals: any[] = [];
  selectedEspecialidad: any;
  selectedProfesional: any;

  constructor(
    private especialidadService: SpecialitieServiceService,
    private profesionalService: ProfessionalService
  ) {}

  ngOnInit(): void {
    this.getEspecialidades();
  }

  getEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe((response: any) => {
      this.specialities = response.data;
    });
  }

  onEspecialidadSelected() {
    if (this.selectedEspecialidad) {
      this.profesionalService
        .getProfesionalesPorEspecialidad(this.selectedEspecialidad)
        .subscribe((response: any) => {
          this.professionals = response.data;
          this.selectedProfesional = null;
        });
      console.log(this.selectedEspecialidad);
      console.log(this.professionals);
    } else {
      this.professionals = [];
    }
  }
}
