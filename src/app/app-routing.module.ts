import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomehComponent } from './homeh/homeh.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './login/auth/auth.component';
import { ListeusersComponent } from './listeusers/listeusers.component';
import { ListeQuestionComponent } from './users/liste-question/liste-question.component';
import { AppcComponent } from './users/appc/appc.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'auth', component:AuthComponent},

  { path: 'dashboard', component: DashboardComponent },
  { path: 'homeh', component: HomehComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listeuser', component: ListeusersComponent },
  { path: 'listequestion', component: ListeQuestionComponent },
  { path: 'appc', component: AppcComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
