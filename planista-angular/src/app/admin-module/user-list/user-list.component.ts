import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<User>;

  columns = ['id', 'userName', 'firstName', "lastName"];
  expandedElement: User | null;

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(x => {
      this.dataSource = new MatTableDataSource<User>(x);

      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: User, filterValue: string) => {
        return data.id.trim().toLocaleLowerCase().includes(filterValue) || data.firstName.concat(" " + data.lastName).trim().toLocaleLowerCase()
        .includes(filterValue) || data.userName.trim().toLocaleLowerCase().includes(filterValue);
      };
    });
  }

  blockUser(index: number) {
    let user = this.dataSource.data[index];
    user.userActive = false;

    this.userService.putUser(user).subscribe({
      complete: () => {
        this.snackBar.open("Zablokowano użytkownika " + user.userName, "", {
          duration: 4000
        });

        this.table.renderRows();
      }
    });
  }
  unblockUser(index: number) {
    let user = this.dataSource.data[index];
    user.userActive = true;

    this.userService.putUser(user).subscribe({
      complete: () => {
        this.snackBar.open("Odblokowano użytkownika " + user.userName, "", {
          duration: 4000
        });

        this.table.renderRows();
      }
    });
  }
  filter(value: string) {
    value = value.trim().toLocaleLowerCase();

    this.dataSource.filter = value;
  }
}
