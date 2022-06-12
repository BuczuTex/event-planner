import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Errand } from 'src/app/models/errand';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-company-list-dialog',
  templateUrl: './company-list-dialog.component.html',
  styleUrls: ['./company-list-dialog.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyListDialogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  companyList: Array<Company>;
  errandProposals: Array<Errand>;

  dataSource: MatTableDataSource<Company>;
  columnsToDisplay = ["id", "name", "nip"];
  expandedElement: Company | null;

  opinionsShowed = false;
  proposalsShowed = false;

  outData: any;

  constructor(private matDialogRef: MatDialogRef<CompanyListDialogComponent>, private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) private event: any) { }

  ngOnInit(): void {
    this.outData = {};

    this.companyService.getCompanies().subscribe(res => {
      res = res.filter(x => !x.events.some(y => {
        return y.id === +this.event.id;
      }));

      let companyListFiltered = [];

      this.errandProposals = res.filter(x => x.errands.some(y => {
        if(y.eventId === 0 && y.companyId === x.id && y.categoryId === +this.event.category.id) {
          companyListFiltered.push(x);

          return true;
        }
        return false;
      })).flatMap(x => x.errands);

      this.companyList = companyListFiltered;

      this.dataSource = new MatTableDataSource(this.companyList);

      this.dataSource.paginator = this.paginator;
    });
  }
  //Branie informacji o wybranej firmie z dialoga
  selectCompany(element: Company) {
    this.outData.selectedCompany = element ? element : null;

    this.matDialogRef.close(this.outData);
  }
  showOpinions() {
    this.opinionsShowed = !this.opinionsShowed;
  }
  showProposals() {
    this.proposalsShowed = !this.proposalsShowed;
  }
  selectionChange(option: MatListOption) {
    this.outData.proposal = option.value;
  }
}
