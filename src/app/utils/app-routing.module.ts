import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { HomeComponent } from '../components/home/home.component';
import { MisTurnosComponent } from '../components/mis-turnos/mis-turnos.component';
import { NuevoTurnoComponent } from '../components/nuevo-turno/nuevo-turno.component';
import { LogoutComponent } from '../components/log-out/log-out.component';
import { EditarPerfilComponent } from '../components/editar-perfil/editar-perfil.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'log-out', component: LogoutComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'mis-turnos', component: MisTurnosComponent },
  { path: 'nuevo-turno', component: NuevoTurnoComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
