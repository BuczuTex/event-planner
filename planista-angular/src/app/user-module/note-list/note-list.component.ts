// TODO: Przemyśleć, czy nie lepiej dać Output
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @Input() notes: Array<Note>;

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  deleteNote(elementId: number) {
    var noteToDelete = this.notes[elementId];

    this.noteService.deleteNote(noteToDelete.id).subscribe({
      complete: () => {
        this.snackBar.open("Pomyślnie usunięto notatkę", "", {
          duration: 4000
        });
      },
      error: (error) => {
        this.snackBar.open("Nastąpiły problemy przy usuwaniu notatki", "", {
          duration: 4000
        });
        console.log(error);
      }
    });
    this.notes.splice(elementId, 1);
  }
}
