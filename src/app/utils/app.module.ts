import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomeComponent } from '../components/home/home.component';
import { MisTurnosComponent } from '../components/mis-turnos/mis-turnos.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NuevoTurnoComponent } from '../components/nuevo-turno/nuevo-turno.component';
import { LogoutComponent } from '../components/log-out/log-out.component';
import { EditarPerfilComponent } from '../components/editar-perfil/editar-perfil.component';
import { AdminEspecialidadesComponent } from '../components/admin-especialidades/admin-especialidades.component';
import { AdminProfesionalesComponent } from '../components/admin-profesionales/admin-profesionales.component';
import { AdminObrasSocialesComponent } from '../components/admin-obras-sociales/admin-obras-sociales.component';
import { EditProfessionalsComponent } from '../components/edit-professionals/edit-professionals.component';
import { AdminTurnosComponent } from '../components/admin-turnos/admin-turnos.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignInComponent,
    NavbarComponent,
    FooterComponent,
    MisTurnosComponent,
    NuevoTurnoComponent,
    LogoutComponent,
    EditarPerfilComponent,
    AdminEspecialidadesComponent,
    AdminProfesionalesComponent,
    AdminObrasSocialesComponent,
    EditProfessionalsComponent,
    AdminTurnosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
