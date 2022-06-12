import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Errand, stateEnum } from 'src/app/models/errand';
import { EventService } from 'src/app/services/event.service';
import { CompanyListDialogComponent } from '../company-list-dialog/company-list-dialog.component';
import { Company } from 'src/app/models/company';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormVariables } from 'src/app/form-variables';
import { Event } from 'src/app/models/event';
import { ErrandService } from 'src/app/services/errand.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-errands',
  templateUrl: './errands.component.html',
  styleUrls: ['./errands.component.css']
})
export class ErrandsComponent implements OnInit {
  eventId: number;
  event: Event;

  errandList: Array<Errand>;

  selectedCompany: Company;
  states = stateEnum;

  errandForm: FormGroup;

  constructor(private eventService: EventService, private route: ActivatedRoute, private dialog: MatDialog, 
              private snackBar: MatSnackBar, private errandService: ErrandService, private fb: FormBuilder, private router: Router) {
               }

  ngOnInit(): void {
    this.errandForm = this.fb.group(FormVariables.errandForm);

    this.route.paramMap.subscribe(param => {
      this.eventId = +param.get('id');
    });

    this.eventService.getEvent(this.eventId).subscribe({
      next: x => {
        this.event = x;

      if(x.errands)
        this.errandList = x.errands;
      else 
        this.errandList = new Array<Errand>();
      },
      error: (error: HttpResponse<any>) => {
        if(error.status === 404) {
          this.snackBar.open("Brak dostępu do strony", "", {
            duration: 4000
          });

          this.router.navigate(["/"]);
        }
      }
    });
  }

  selectCompany() {
    const dialogRef = this.dialog.open(CompanyListDialogComponent, {
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.selectedCompany = result.selectedCompany;
        this.errandForm.setValue({
          title: result.proposal,
          description: null
        });
      }
    });
  }
  postErrand() {
    if(this.errandForm.valid && this.selectedCompany) {
      var errand = new Errand(this.errandForm.value['title'], this.errandForm.value['description'], this.states.WAITING_FOR_COMPANY);
      errand.companyId = this.selectedCompany.id;
      errand.eventId = this.eventId;

      this.errandService.postErrand(errand).subscribe({
        complete: () => {
          this.snackBar.open("Dodano nowe zadanie. Zadanie musi zostać potwierdzone przez administratora.", "Zamknij", {
            duration: 4000
          });
          this.selectedCompany = null;

          this.errandForm.reset();
        },
        error: (error) => console.log(error),
        next: (errand) => {
          this.errandList.push(errand);
        }
      });
    }
  }
}
