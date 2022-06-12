import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Opinion } from 'src/app/models/opinion';
import { OpinionService } from 'src/app/services/opinion.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';
import { switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-opinion-list',
  templateUrl: './opinion-list.component.html',
  styleUrls: ['./opinion-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OpinionListComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  opinionDataSource: MatTableDataSource<Opinion>;

  columns = ['id', 'userId', 'contents'];

  constructor(private opinionService: OpinionService, private snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
    this.opinionService.getOpinions().subscribe({
      error: (error) => {
        this.snackBar.open("Wystąpił błąd", "", {
          duration: 4000
        });

        console.log(error);
      },
      next: (opinions) => {
        this.opinionDataSource = new MatTableDataSource<Opinion>(opinions);
        this.opinionDataSource.paginator = this.paginator;
      }
    });
  }

  deleteOpinionAndBlockUser(index: number) {
    let user = this.opinionDataSource.data[index].user;
    const opinionId = this.opinionDataSource.data[index].id;

    user.lockoutEnabled = true;

    const userPut = this.userService.putUser(user);
    const opinionDelete = this.opinionService.deleteOpinion(opinionId);

    opinionDelete.pipe(switchMap(x => userPut)).subscribe({
      complete: () => {
        this.snackBar.open("Pomyślnie usunięto opinię oraz zablokowano użytkownika", "", {
          duration: 4000,
        });

        this.opinionDataSource.data.splice(index, 1);

        this.table.renderRows();
      },
      error: (error) => {
        this.snackBar.open("Wystąpił błąd", "", {
          duration: 4000
        });

        console.log(error);
      }
    });
  }
  deleteOpinion(index: number) {
    const opinionId = this.opinionDataSource.data[index].id;

    this.opinionService.deleteOpinion(opinionId).subscribe({
      complete: () => {
        this.snackBar.open("Pomyślnie usunięto opinię", "", {
          duration: 4000
        });

        this.opinionDataSource.data.splice(index, 1);

        this.table.renderRows();
      },
      error: (error) => {
        this.snackBar.open("Wystąpił błąd", "", {
          duration: 4000
        });
        
        console.log(error);
      }
    });
  }
  filter(value: string) {
    value = value.trim().toLocaleLowerCase();

    this.opinionDataSource.filter = value;
  }
}
