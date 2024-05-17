import { HttpErrorResponse } from '@angular/common/http';
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
  healthInsurances: any[] = [];
  DNI: string = '';
  name: string = '';
  surname: string = '';
  birthdate: string = '';
  adress: string = '';
  phoneNumber: string = '';
  email: string = '';
  healthInsurance: string = '';
  sex: string = '';
  password: string = '';
  confirmPassword: string = '';
  healthInsuranceSelected: boolean = false;

  userService = inject(UserService);

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getHealthInsurances();
  }

  isNumeric(value: any): boolean {
    return /^-?\d+$/.test(value);
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  getHealthInsurances(): void {
    this._userService.getHealthInsurances().subscribe((response: any) => {
      this.healthInsurances = response.data;
    });
  }

  onHealthInsuranceSelected(): void {
    this.healthInsuranceSelected = true;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
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

  async addPatient() {
    let healthInsuranceValue: string | null;
    if (this.healthInsurance === 'null') {
      healthInsuranceValue = null;
    } else {
      healthInsuranceValue = this.healthInsurance;
    }

    let hasError = false;

    // Validar si los campos se completaron
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
      !this.confirmPassword.trim()
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      hasError = true;
    }

    // Validar si las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas son distintas', 'Error');
      hasError = true;
    }

    // Validar DNI
    if (!this.validateField(this.DNI, 7, 8, /^\d+$/)) {
      this.toastr.error(
        'El DNI debe ser numérico y tener entre 7 y 8 dígitos',
        'Error'
      );
      hasError = true;
    }

    // Validar nombre
    if (!this.validateField(this.name, 1, 20)) {
      this.toastr.error(
        'El nombre no puede exceder los 20 caracteres',
        'Error'
      );
      hasError = true;
    }

    // Validar apellido
    if (!this.validateField(this.surname, 1, 20)) {
      this.toastr.error(
        'El apellido no puede exceder los 20 caracteres',
        'Error'
      );
      hasError = true;
    }

    // Validar teléfono
    if (!this.validateField(this.phoneNumber, 1, 15, /^\d+$/)) {
      this.toastr.error(
        'El teléfono debe ser numérico y tener máximo 15 caracteres',
        'Error'
      );
      hasError = true;
    }

    // Validar correo electrónico
    if (
      !this.validateField(this.email, 1, 100) ||
      !this.isEmailValid(this.email)
    ) {
      this.toastr.error('Ingrese un email válido', 'Error');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const user: User = {
      DNI: this.DNI,
      name: this.name,
      surname: this.surname,
      birthdate: this.birthdate,
      adress: this.adress,
      phoneNumber: this.phoneNumber,
      email: this.email,
      healthInsurance: healthInsuranceValue,
      sex: this.sex,
      password: this.password,
    };

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
