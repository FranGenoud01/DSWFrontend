import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  obrasSociales: any[] = [];
  DNI: string = '';
  name: string = '';
  surname: string = '';
  age: string = '';
  birthdate: string = '';
  adress: string = '';
  phoneNumber: string = '';
  email: string = '';
  healthInsurance: string = '';
  sex: string = '';
  password: string = '';
  confirmPassword: string = '';
  obraSocialSelected: boolean = false;

  userService = inject(UserService);

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getObrasSociales();
  }

  getObrasSociales(): void {
    this._userService.getHealthInsurances().subscribe((response: any) => {
      this.obrasSociales = response.data;
      console.log(this.obrasSociales);
    });
  }

  onHealthInsuranceSelected(): void {
    this.obraSocialSelected = true;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  async addPatient() {
    if (
      !this.DNI.trim() ||
      !this.name.trim() ||
      !this.surname.trim() ||
      !this.adress.trim() ||
      !this.phoneNumber.trim() ||
      !this.email.trim() ||
      !this.sex.trim() ||
      !this.password.trim() ||
      !this.birthdate.trim() ||
      !this.healthInsurance.trim() ||
      !this.age.trim() ||
      !this.confirmPassword.trim()
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Verificar si las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas son distintas', 'Error');
      return;
    }

    const user: User = {
      DNI: this.DNI,
      name: this.name,
      surname: this.surname,
      age: this.age,
      birthdate: this.birthdate,
      adress: this.adress,
      phoneNumber: this.phoneNumber,
      email: this.email,
      healthInsurance: this.healthInsurance,
      sex: this.sex,
      password: this.password,
    };

    console.log(user);

    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.toastr.success(
          `El paciente ${this.DNI} fue registrado con exito`,
          'Paciente registrado'
        );
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      },
    });
  }
}
