import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from 'src/app/models/event';
import { EventDeleteDialogComponent } from 'src/app/shared/event-delete-dialog/event-delete-dialog.component';
import { EventService } from '../../services/event.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'user-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  rowNames = ["id", "name", "date", "category","delete", "edit", "errands", "toDoList", "notes"];
  
  readonly userId = localStorage.getItem('id');
  address: any;
  index: number;


  constructor(private eventService: EventService, private snackBar: MatSnackBar, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data : Event[]) => {
      this.events = data;
      this.events = this.events.filter(event => new Date(event['date']) > new Date())
                    .filter(event => event['userId'] === this.userId); 
      this.dataSource = new MatTableDataSource<any>(this.events);

      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(index: number) {
    var dialog = this.matDialog.open(EventDeleteDialogComponent);

    dialog.afterClosed().subscribe(x => {
      if(x) {
        var eventToDelete = this.events[index];

        this.eventService.deleteEvent(eventToDelete.id).subscribe({
          complete: () => {
            this.snackBar.open("Pomyślnie usunięto wydarzenie", "", {
              duration: 4000
            });
    
            this.events.splice(index, 1);
          },
          error: (error) => {
            this.snackBar.open("Wystąpił błąd", "", {
              duration: 4000
            });
            console.log(error);
          }
        });
      }
    });
  }
  filterName(value: string) {
    value = value.toLocaleLowerCase();

    this.dataSource.filter = value;
  }
}
