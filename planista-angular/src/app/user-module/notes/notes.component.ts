// TODO: Forms validators!
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormVariables } from 'src/app/form-variables';
import { Note } from 'src/app/models/note';
import { EventService } from 'src/app/services/event.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  noteForm: FormGroup;
  eventId: number;
  notes: Array<Note>;

  constructor(private eventService: EventService, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder, 
              private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.noteForm = this.fb.group(FormVariables.noteForm);

    this.route.paramMap.subscribe(x => {
      this.eventId = +x.get('id');
    });
    this.eventService.getEvent(this.eventId).subscribe( {
      next: x => this.notes = x.notes,
      error: (error: HttpResponse<any>) => {
        this.snackBar.open("Brak dostępu do strony", "", {
          duration: 4000
        });

        this.router.navigate(["/"]);
      }
    });
  }

  addNote(form: FormGroup) {
    if(form.valid) {
      var note = new Note(form.value.title, form.value.contents, this.eventId);

      this.noteService.postNote(note).subscribe(x => this.notes.push(x));

      this.snackBar.open("Dodano notatkę", "", {
        duration: 4000
      });

      this.noteForm.setValue({
        title: "",
        contents: ""
      });
      this.noteForm.markAsUntouched();
      this.noteForm.markAsPristine();
    }
  }
}
