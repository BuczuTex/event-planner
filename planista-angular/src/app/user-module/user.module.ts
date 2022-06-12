import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelOverviewComponent } from './user-panel-overview/user-panel-overview.component';
import { EventListComponent } from './event-list/event-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from '../shared/edit-event/edit-event.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { NoteListComponent } from './note-list/note-list.component';
import { CompanyListDialogComponent } from './company-list-dialog/company-list-dialog.component';
import { ErrandsComponent } from './errands/errands.component';
import { UserRoles } from '../models/user';
import { ErrandListComponent } from './errand-list/errand-list.component';
import { NotesComponent } from './notes/notes.component';
import { ToDoListItemFormComponent } from './to-do-list-item-form/to-do-list-item-form.component';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { CUSTOM_DATE_FORMAT } from '../custom-ngx-date-time-adapter';
import { RecomendationSystemComponent } from './recomendation-system/recomendation-system.component';
import { MatChipsModule } from '@angular/material/chips';
import { CompanyAddOpinionComponent } from './company-add-opinion/company-add-opinion.component';

export const USER_ROUTES: Routes = [
  {
    path: 'overview',
    component: UserPanelOverviewComponent,
    data: { role: UserRoles.USER },
  },
  {
    path: 'events',
    component: EventListComponent,
    data: { role: UserRoles.USER },
  },
  {
    path: 'events/create',
    component: AddEventComponent,
    data: { role: UserRoles.USER },
  },
  {
    path: 'events/:id',
    component: EditEventComponent,
    data: { role: UserRoles.USER },
  },
  {
    path: 'events/:id/errands',
    component: ErrandsComponent,
    data: { role: UserRoles.USER },
  },
  {
    path: 'events/:id/notes',
    component: NotesComponent,
    data: { role: UserRoles.USER }
  },
  {
    path: 'events/:id/to-do-list',
    component: ToDoListComponent,
    data: { role: UserRoles.USER }
  }
]

@NgModule({
  declarations: [
    UserPanelOverviewComponent,
    EventListComponent,
    ToDoListComponent,
    NoteListComponent,
    CompanyListDialogComponent,
    ErrandsComponent,
    ErrandListComponent,
    NotesComponent,
    ToDoListItemFormComponent,
    RecomendationSystemComponent,
    CompanyAddOpinionComponent
  ],
  imports: [
    RouterModule.forRoot(USER_ROUTES, { enableTracing: true }),
    CommonModule,
    SharedModule,
    MatChipsModule
  ],
  providers: [
    {provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT}
  ],
})
export class UserModule { }
