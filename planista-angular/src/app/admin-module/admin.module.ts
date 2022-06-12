import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ConfirmListComponent } from './confirm-list/confirm-list.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserRoles } from '../models/user';
import { UserListComponent } from './user-list/user-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { OpinionListComponent } from './opinion-list/opinion-list.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: "confirm-list",
    component: ConfirmListComponent,
    data: { role: UserRoles.ADMINISTRATOR }
  },
  {
    path: "users",
    component: UserListComponent,
    data: { role: UserRoles.ADMINISTRATOR }
  },
  {
    path: "events",
    component: EventListComponent,
    data: { role: UserRoles.ADMINISTRATOR }
  },
  {
    path: "opinions",
    component: OpinionListComponent,
    data: { role: UserRoles.ADMINISTRATOR }
  }
];

@NgModule({
  declarations: [
    AdminPanelComponent,
    ConfirmListComponent,
    UserListComponent,
    EventListComponent,
    OpinionListComponent
  ],
  imports: [
    RouterModule.forRoot(ADMIN_ROUTES, { enableTracing: true }),
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
