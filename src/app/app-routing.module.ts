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
import { PostsComponent } from './users/posts/posts.component';
import { AccountusersComponent } from './users/accountusers/accountusers.component';
import { AnswersComponent } from './users/answers/answers.component';
import { ModifpostComponent } from './users/modifpost/modifpost.component';
import { UsrComponent } from './users/usr/usr.component';
import { MessageComponent } from './users/message/message.component';
import { HomeAComponent } from './admin/home-a/home-a.component';
import { AccountAdminComponent } from './admin/account-admin/account-admin.component';
import { ListDomaineComponent } from './admin/list-domaine/list-domaine.component';
import { ListNatureComponent } from './admin/list-nature/list-nature.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { ListPostAdminComponent } from './admin/list-post-admin/list-post-admin.component';
import { ListAnswersAdminComponent } from './admin/list-answers-admin/list-answers-admin.component';
import { ChangermotpasseuserComponent } from './users/changermotpasseuser/changermotpasseuser.component';
import { ChangermotpasseadminComponent } from './admin/changermotpasseadmin/changermotpasseadmin.component';
import { DialogsComponent } from './users/dialogs/dialogs.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'auth', component:AuthComponent},
  { path: 'dashboard', component: DashboardComponent  },
  { path: 'homeh', component: HomehComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listeuser', component: ListeusersComponent },
  { path: 'listequestion', component: ListeQuestionComponent },
  { path: 'appc', component: AppcComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'account', component: AccountusersComponent },
  { path: 'answ', component: AnswersComponent },
  { path: 'listepost', component: ModifpostComponent },
  { path: 'usr', component: UsrComponent },
  { path: 'listemessage', component: DialogsComponent },
  { path: 'homeA', component: HomeAComponent },
  { path: 'profileAdmin', component: AccountAdminComponent },
  { path: 'listdomaine', component: ListDomaineComponent },
  { path: 'listnature', component: ListNatureComponent },
  { path: 'boardadmin', component: BoardAdminComponent },
  { path: 'listeusers', component: ListUsersComponent },
  { path: 'listepostadmin', component: ListPostAdminComponent },
  { path: 'listanswersadmin', component: ListAnswersAdminComponent },

  { path: 'changermotuser', component: ChangermotpasseuserComponent },
  { path: 'changermotadmin', component: ChangermotpasseadminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
