import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NgxMatDatetimePickerModule, NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';

import { AddressFormComponent } from './address-form/address-form.component';
import { EventFormComponent } from './event-form/event-form.component';
import { AddEventComponent } from '../user-module/add-event/add-event.component';
import { ErrandFormComponent } from './errand-form/errand-form.component';
import { NoteFormComponent } from './note-form/note-form.component';

import { EditEventComponent } from './edit-event/edit-event.component';
import { EventDeleteDialogComponent } from './event-delete-dialog/event-delete-dialog.component';
import { OpinionFormComponent } from './opinion-form/opinion-form.component';

const CUSTOM_DATE_FORMAT: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'DD.MM.YYYY, HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@NgModule({
  declarations: [
    EventFormComponent,
    AddressFormComponent,
    AddEventComponent,
    ErrandFormComponent,
    EditEventComponent,
    EventDeleteDialogComponent,
    NoteFormComponent,
    OpinionFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    OverlayModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatAutocompleteModule
  ],
  exports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    MatSelectModule,
    MatStepperModule,
    OverlayModule,
    EventFormComponent,
    AddressFormComponent,
    AddEventComponent,
    ErrandFormComponent,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    NoteFormComponent,
    OpinionFormComponent,
    MatAutocompleteModule,
  ],
  providers: [
    {provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT}
  ]
})
export class SharedModule { }
