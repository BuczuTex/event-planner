import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import '@angular/common/locales/global/pl';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './register/register.component';
import { UnloggedInGuard } from './guards/unlogged-in.guard';

import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserPanelComponent } from './user-module/user-panel/user-panel.component';

import { USER_ROUTES } from './user-module/user.module';
import { COMPANY_ROUTES } from './company-module/company.module';
import { SharedModule } from './shared/shared.module';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { CompanyRegisterFormComponent } from './forms/company-register-form/company-register-form.component';
import { CompanyPanelComponent } from './company-module/company-panel/company-panel.component';
import { UserRoles } from './models/user';
import { AdminPanelComponent } from './admin-module/admin-panel/admin-panel.component';
import { ADMIN_ROUTES } from './admin-module/admin.module';


export function tokenGetter() {
  return localStorage.getItem("token");
}

const appRoutes : Routes =  [
  { 
    path: '',
    component: HomeComponent
  },
  { path: 'login', 
    component: LoginComponent,
    canActivate: [UnloggedInGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnloggedInGuard]
  },
  {
    path: 'company-register',
    component: CompanyRegisterComponent,
    canActivate: [UnloggedInGuard],
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: UserPanelComponent,
    data: { role: UserRoles.USER },
    children: USER_ROUTES,
  },
  {
    path: 'company',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: CompanyPanelComponent,
    data: { role: UserRoles.COMPANY_USER },
    children: COMPANY_ROUTES
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: AdminPanelComponent,
    data: { role: UserRoles.ADMINISTRATOR },
    children: ADMIN_ROUTES
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserPanelComponent,
    CompanyRegisterComponent,
    RegisterFormComponent,
    CompanyRegisterFormComponent
  ],
  imports: [
    RouterModule.forRoot( appRoutes, { enableTracing: true }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7290"],
      }
    }),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "pl"},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
