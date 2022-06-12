import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Errand, stateEnum } from 'src/app/models/errand';
import { ToDoListItem } from 'src/app/models/toDoListItem';
import { ErrandService } from 'src/app/services/errand.service';
import { ToDoListItemService } from 'src/app/services/to-do-list-item.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-confirm-list',
  templateUrl: './confirm-list.component.html',
  styleUrls: ['./confirm-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConfirmListComponent implements OnInit {
  errandDataSource: MatTableDataSource<Errand>;
  toDoListItemsDataSource: MatTableDataSource<ToDoListItem>;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild("paginator1") paginator1: MatPaginator;
  @ViewChild("paginator2") paginator2: MatPaginator;

  columnsErrand = ['id', 'title', 'accept', 'delete'];

  expandedElement: Errand | ToDoListItem | null;

  constructor(private errandService: ErrandService, private toDoListItemService: ToDoListItemService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.errandService.getErrands().subscribe(x => {
      x = x.filter(y => y.state === stateEnum.WAITING_FOR_ADMIN);

      this.errandDataSource = new MatTableDataSource<Errand>(x);
      this.errandDataSource.paginator = this.paginator1;
    });
    this.toDoListItemService.getToDoListItems().subscribe(x => {
      x = x.filter(y => y.state === stateEnum.WAITING_FOR_ADMIN);

      this.toDoListItemsDataSource = new MatTableDataSource<ToDoListItem>(x);
      this.toDoListItemsDataSource.paginator = this.paginator2;
    });
  }

  acceptErrand(index: number) {
    let errand = this.errandDataSource.data[index];

    errand.state = stateEnum.ACCEPTED;

    this.errandService.putErrand(errand).subscribe({
      complete: () => {
        this.snackBar.open("Zatwierdzono zmiany", "", {
          duration: 4000
        });

        this.errandDataSource.data.splice(index, 1);
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
  acceptToDoItem(index: number) {
    let toDoItem = this.toDoListItemsDataSource.data[index];

    toDoItem.state = stateEnum.ACCEPTED;

    this.toDoListItemService.putToDoItem(toDoItem).subscribe({
      complete: () => {
        this.snackBar.open("Zatwierdzono zmiany", "", {
          duration: 4000
        });

        this.toDoListItemsDataSource.data.splice(index, 1);
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
  deleteErrand(index: number) {
    let errand = this.errandDataSource.data[index];

    this.errandService.deleteErrand(errand.id).subscribe({
      complete: () => {
        this.snackBar.open("Zatwierdzono zmiany", "", {
          duration: 4000
        });

        this.errandDataSource.data.splice(index, 1);
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
  deleteToDoItem(index: number) {
    let toDoItem = this.toDoListItemsDataSource.data[index];

    this.toDoListItemService.deleteToDoItem(toDoItem.id).subscribe({
      complete: () => {
        this.snackBar.open("Zatwierdzono zmiany", "", {
          duration: 4000
        });

        this.toDoListItemsDataSource.data.splice(index, 1);
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
}