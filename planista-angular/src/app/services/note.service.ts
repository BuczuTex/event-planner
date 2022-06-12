import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  readonly noteUrl = "https://localhost:7290/api/Notes";
  readonly eventUrl = "https://localhost:7290/api/Events";
  readonly authHeader = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getNotes() {
    return this.http.get<Array<Note>>(this.noteUrl, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  postNote(note: Note) {
    const noteJson = JSON.stringify(note).replace(/[_]/g, "");
    return this.http.post<Note>(this.noteUrl, noteJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  deleteNote(noteId: number) {
    return this.http.delete(this.noteUrl + `/${noteId}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
}
