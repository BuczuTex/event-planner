import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { switchMap, Observable } from 'rxjs';
import { FormVariables } from 'src/app/form-variables';
import { Category } from 'src/app/models/category';
import { Company } from 'src/app/models/company';
import { Errand, stateEnum } from 'src/app/models/errand';
import { CompanyService } from 'src/app/services/company.service';
import { ErrandService } from 'src/app/services/errand.service';
import { EventService } from 'src/app/services/event.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-manage-errand-proposals',
  templateUrl: './manage-errand-proposals.component.html',
  styleUrls: ['./manage-errand-proposals.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManageErrandProposalsComponent implements OnInit {
  userId: string;
  company: Company;

  isEditing = false;
  editIndex = -1;

  displayedColumns = ['id', 'name', 'edit', 'delete'];
  dataSource: MatTableDataSource<Errand>;

  @ViewChild(MatTable) table: MatTable<any>;

  categories: Observable<string>;

  form: FormGroup;

  constructor(private companyService: CompanyService, private snackBar: MatSnackBar, private fb: FormBuilder, 
    private eventService: EventService, private errandService: ErrandService) { }

  ngOnInit(): void {
    this.form = this.fb.group(FormVariables.errandForm);
    this.categories = this.eventService.getCategories();
    this.form.addControl("category", this.fb.control('', Validators.required));

    this.companyService.getCompanyByUserId(localStorage.getItem('id')).pipe(
      switchMap(x => {
        this.company = x;
        return this.companyService.getCompanyProposals(x.id)
      })
      ).subscribe({
        next: (proposals) => {
          this.dataSource = new MatTableDataSource<Errand>(proposals);
        },
        error: (error) => {
          this.snackBar.open("Wystąpił błąd przy pobieraniu danych", "", {
            duration: 4000
          });

          console.log(error);
        }
      });
  }

  addProposal() {
    if(this.form.valid) {
      let errand = new Errand(this.form.value['title'], this.form.value['description'], stateEnum.ADDED_BY_COMPANY);

      errand.category = new Category(this.form.value['category']);
      errand.eventId = 0;
      errand.companyId = this.company.id;

      this.errandService.postErrand(errand).subscribe({
        complete: () => this.snackBar.open("Pomyślnie dodano propozycję zadania", "", {
          duration: 4000
        }),
        next: (errand) => this.dataSource.data.push(errand),
        error: (error) => {
          this.snackBar.open("Wystąpił błąd podczas dodawania propozycji", "", {
            duration: 4000
          })
        }
      });
    }
  }
  deleteProposal(index: number) {
    let errand = this.dataSource.data[index];

    this.errandService.deleteErrand(errand.id).subscribe({
      complete: () => {
        this.snackBar.open("Usunięto propozycję", "", {
          duration: 4000
        });

        this.dataSource.data.splice(index, 1);
        this.table.renderRows();
      },
      error: (error) => {
        console.log(error);

        this.snackBar.open("Wystąpił błąd", "", {
          duration: 4000
        });
      }
    });
  }
  triggerEditProposal(index: number) {
    const proposal = this.dataSource.data[index];

    this.form.setValue({
      title: proposal.title,
      description: proposal.description,
      category: proposal.category.name
    });

    this.isEditing = true;
    this.editIndex = index;
  }
  editProposal() {
    if(this.form.valid && this.editIndex !== -1) {
      let proposal = this.dataSource.data[this.editIndex];

      proposal.title = this.form.value['title'];
      proposal.description = this.form.value['description'];
      proposal.category = new Category(this.form.value['category']);

      this.errandService.putErrand(proposal).subscribe({
        complete: () => {
          this.snackBar.open("Zatwierdzono zmiany", "", {
            duration: 4000
          });

          this.table.renderRows();
          this.isEditing = false;
          this.editIndex = 0;

          this.form.reset();
      },
        error: (error) => {
          this.snackBar.open("Wystąpił błąd", "", {
            duration: 4000
          });
          console.log(error);
        }
      });
    }
    else {
      console.log(this.editIndex);
    }
  }
}
