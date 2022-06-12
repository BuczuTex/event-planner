import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Errand, stateEnum } from 'src/app/models/errand';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/services/company.service';
import { concat, concatMap } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrandService } from 'src/app/services/errand.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { duration } from 'moment';

@Component({
  selector: 'app-errand-list',
  templateUrl: './errand-list.component.html',
  styleUrls: ['./errand-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ErrandListComponent implements OnInit {
  @Input() state: number;
  @ViewChild(MatTable) table: MatTable<any>;
  states = stateEnum;
  userId = localStorage.getItem('id');

  expandedElement: Errand | null;

  dataSource: MatTableDataSource<Errand>;
  displayedColumns = ['id', 'name', 'accept'];

  constructor(private companyService: CompanyService, private eventService: EventService, private router: Router, private snackBar: MatSnackBar, 
    private errandService: ErrandService) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    if(this.state === this.states.ACCEPTED) {
      this.displayedColumns = ['id', 'name', 'finish'];
    }
    else if(this.state === this.states.FINISHED) {
      this.displayedColumns = ['id', 'name'];
    }

    this.companyService.getCompanyByUserId(this.userId).subscribe(x => {
      var items = x.errands.filter(x => x.state === this.state);

      this.dataSource = new MatTableDataSource<Errand>(items);
    })
  }
  changeErrandState(index: number, state: number) {
    var errand = this.dataSource.data[index];
    console.log(state);

    errand.state = state;

    this.errandService.putErrand(errand).subscribe({
      complete: () => {
        window.location.reload();
      },
      error: (error) => {
        this.snackBar.open("Wystąpił błąd", "", {
          duration: 4000
        });
        console.log(error);
      }
    });
  }
}
