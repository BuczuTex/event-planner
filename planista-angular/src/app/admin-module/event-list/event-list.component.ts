import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { categoryNames } from 'src/app/models/category';
import { Errand, stateEnum } from 'src/app/models/errand';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventListComponent implements OnInit {
  columns = ['id', 'name', 'user'];
  dataSource: MatTableDataSource<Event>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  categories = categoryNames;
  states = stateEnum;

  constructor(private eventService: EventService, private noteService: NoteService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(x => {
      this.dataSource = new MatTableDataSource<Event>(x);
      this.dataSource.data = this.dataSource.data.filter(x => x.id !== 0);

      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: Event, filterValue: string) => {
        return data.name.trim().toLocaleLowerCase().includes(filterValue) || data.user.firstName.concat(" " + data.user.lastName).trim().toLocaleLowerCase()
        .includes(filterValue);
      };
    });
  }

  deleteNote(index: number, note: Note) {
    let noteArray = this.dataSource.data[index].notes;
    const noteIndex = noteArray.indexOf(note);

    this.noteService.deleteNote(note.id).subscribe({
      complete: () => {
        this.snackBar.open("Usunięto notatkę", "", {
          duration: 4000
        });

        noteArray.splice(noteIndex, 1);
      },
      error: (error) => {
        console.log(error);

        this.snackBar.open("Wystąpił błąd", "", {
          duration: 4000
        });
      }
    });
  }
  filter(value: string) {
    value = value.trim().toLocaleLowerCase();

    this.dataSource.filter = value;
  }
}
