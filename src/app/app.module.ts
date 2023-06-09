import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HomehComponent } from './homeh/homeh.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './login/register/register.component';
import { AuthComponent } from './login/auth/auth.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListeusersComponent } from './listeusers/listeusers.component';
import { DialogElementsExampleDialogComponent } from './dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import { ProfileuserComponent } from './users/profileuser/profileuser.component';
import { ListeQuestionComponent } from './users/liste-question/liste-question.component';
import { NavbaruserComponent } from './users/navbaruser/navbaruser.component';
import { HeaderuserComponent } from './users/headeruser/headeruser.component';
import { AppcComponent } from './users/appc/appc.component';
import { DialogcommentComponent } from './users/dialogcomment/dialogcomment.component';
import { ListedesusersComponent } from './users/listedesusers/listedesusers.component';
import { AccountusersComponent } from './users/accountusers/accountusers.component';
import { DialogsComponent } from './users/dialogs/dialogs.component';
import { PostsComponent } from './users/posts/posts.component';
import { ModifpostComponent } from './users/modifpost/modifpost.component';
import { AnswersComponent } from './users/answers/answers.component';
import { EditanswersComponent } from './users/editanswers/editanswers.component';
import { DialogquestionaddComponent } from './users/dialogquestionadd/dialogquestionadd.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { UsrComponent } from './users/usr/usr.component';
import { MessageComponent } from './users/message/message.component';
import { HomeAComponent } from './admin/home-a/home-a.component';
import { SidenavAdminComponent } from './admin/sidenav-admin/sidenav-admin.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { ListDomaineComponent } from './admin/list-domaine/list-domaine.component';
import { ListNatureComponent } from './admin/list-nature/list-nature.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { ListPostAdminComponent } from './admin/list-post-admin/list-post-admin.component';
import { ListAnswersAdminComponent } from './admin/list-answers-admin/list-answers-admin.component';
import { AccountAdminComponent } from './admin/account-admin/account-admin.component';
import { SettingAdminComponent } from './admin/setting-admin/setting-admin.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { ChangermotpasseuserComponent } from './users/changermotpasseuser/changermotpasseuser.component';
import { ChangermotpasseadminComponent } from './admin/changermotpasseadmin/changermotpasseadmin.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    DashboardComponent,
    HomehComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    ListeusersComponent,
    DialogElementsExampleDialogComponent,
    ProfileuserComponent,
    ListeQuestionComponent,
    NavbaruserComponent,
    HeaderuserComponent,
    AppcComponent,
    DialogcommentComponent,
    ListedesusersComponent,
    AccountusersComponent,
    DialogsComponent,
    PostsComponent,
    ModifpostComponent,
    AnswersComponent,
    EditanswersComponent,
    DialogquestionaddComponent,
    UsrComponent,
    MessageComponent,
    HomeAComponent,
    SidenavAdminComponent,
    HeaderAdminComponent,
    ListDomaineComponent,
    ListNatureComponent,
    ListUsersComponent,
    ListPostAdminComponent,
    ListAnswersAdminComponent,
    AccountAdminComponent,
    SettingAdminComponent,
    BoardAdminComponent,
    ChangermotpasseuserComponent,
    ChangermotpasseadminComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    HttpClientModule,
    MatGridListModule,
    MatSelectModule,

   

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
