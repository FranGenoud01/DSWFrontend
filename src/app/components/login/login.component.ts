import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const user: User = {
      DNI: this.username,
      password: this.password,
      name: '',
      surname: '',
      birthdate: '',
      adress: '',
      phoneNumber: '',
      email: '',
      healthInsurance: '',
      sex: '',
    };

    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        const payload = this.decodeJWT(token);
        const name = payload.name;
        const surname = payload.surname;
        const document = payload.DNI;
        this._userService.setUser({ name, surname, document });
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ name, surname, document })
        );
        this.router.navigate(['/home']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      },
    });
  }

  decodeJWT(tokenObj: any) {
    const accessToken = tokenObj.token.accessToken;
    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
