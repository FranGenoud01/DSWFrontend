import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  user: any = {};
  document: string = '';
  healthInsurances: any[] = [];
  healthInsuranceSelected: boolean = false;
  name: string = '';
  surname: string = '';
  adress: string = '';
  phoneNumber: string = '';
  email: string = '';
  healthInsurance: string = '';
  sex: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.document = user.document;
    }
    this.getUserData();
    this.getHealthInsurances();
  }

  isNumeric(value: any): boolean {
    return /^-?\d+$/.test(value);
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  getUserData() {
    this.userService.getPatient(this.document).subscribe((response: any) => {
      this.user = response.data;
      if (this.user.healthInsurance) {
        this.user.healthInsurance = this.user.healthInsurance.id;
      }
    });
  }

  getHealthInsurances(): void {
    this.userService.getHealthInsurances().subscribe((response: any) => {
      this.healthInsurances = response.data;
    });
  }

  onHealthInsuranceSelected(): void {
    this.healthInsuranceSelected = true;
    if (this.healthInsurance === 'null') {
      this.user.healthInsurance = null;
    }
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
      return false;
    }
    if (regex && !regex.test(value.trim())) {
      return false;
    }
    return true;
  }

  async updatePatient() {
    // Verifica si la contraseña y la confirmación de contraseña son diferentes
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas son distintas', 'Error');
      return;
    }

    // Verifica si no se ha cambiado la contraseña pero se están ingresando nuevas contraseñas
    if (
      this.password.trim() === '' &&
      this.confirmPassword.trim() === '' &&
      this.user.password &&
      this.user.password.trim() !== ''
    ) {
      this.toastr.error('Debe ingresar su contraseña anterior', 'Error');
      return;
    }

    const updatedUser = { ...this.user }; // Copia los datos del usuario actual

    // Actualiza los campos que han sido modificados por el usuario
    if (this.name.trim() !== '') {
      updatedUser.name = this.name;
    }
    if (this.surname.trim() !== '') {
      updatedUser.surname = this.surname;
    }
    if (this.adress.trim() !== '') {
      updatedUser.adress = this.adress;
    }
    if (this.phoneNumber.trim() !== '') {
      updatedUser.phoneNumber = this.phoneNumber;
    }
    if (this.email.trim() !== '') {
      updatedUser.email = this.email;
    }
    if (this.healthInsurance !== null) {
      updatedUser.healthInsuranceId = this.healthInsurance;
    } else {
      updatedUser.healthInsuranceId = null;
    }
    if (this.sex.trim() !== '') {
      updatedUser.sex = this.sex;
    }

    if (this.password.trim() !== '' && this.confirmPassword.trim() !== '') {
      updatedUser.password = this.password;
    }

    this.userService.updatePatient(updatedUser).subscribe({
      next: (v) => {
        this.toastr.success(
          `Sus datos fueron actualizados con éxito`,
          'Datos actualizados'
        );
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      },
    });
    this.router.navigate(['/home']);
  }
}
