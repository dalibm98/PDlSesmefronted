import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomehComponent } from './homeh/homeh.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './login/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'auth', component:AuthComponent},

  { path: 'dashboard', component: DashboardComponent },
  { path: 'homeh', component: HomehComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
